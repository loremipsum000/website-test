"use client";

import { cn } from "@/lib/utils";
import type { Direction, PulsePath } from "@/types/grid";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  baseOpacity: number;
  currentOpacity: number;
  connections: Dot[];
  size: number;
  targetSize: number;
  audioOpacity: number;
  color: [number, number, number];
}

interface PulseWave {
  id: number;
  x: number;
  y: number;
  radius: number;
  intensity: number;
  maxRadius: number;
  speed: number;
}

interface Pulse {
  path: Dot[];
  progress: number;
  fadeOut: number | null;
  totalLength: number;
  intensity: number;
}

type Effect = "dim" | "snow";

export type EasterEggTrack = {
  title: string;
  artist: string;
  src: string;
  albumArtSrc: string;
  href: string;
  effects?: Effect[];
};

export type GridEasterEggRef = {
  volume: number;
  setVolume: (volume: number) => void;
  activatePlaylist: (
    tracks: EasterEggTrack[],
    startIndex?: number
  ) => Promise<void>;
  deactivatePlaylist: () => Promise<void>;
  nextTrack: () => Promise<void>;
  prevTrack: () => Promise<void>;
  currentTrack: EasterEggTrack | null;
  isPlaying: boolean;
};

export const useEasterEgg = () => {
  const easterEggRef = useRef<GridEasterEggRef | null>(null);
  return easterEggRef;
};

interface GridBackgroundProps {
  className?: string;
  predefinedPaths?: PulsePath[];
  pathProbability?: number;
  easterEggRef?: React.MutableRefObject<GridEasterEggRef | null>;
}

export function GridBackground({
  className,
  predefinedPaths = [],
  pathProbability = 0.3,
  easterEggRef,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<EasterEggTrack | null>(null);

  // Add refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const timeRef = useRef(0);
  const pulseWavesRef = useRef<PulseWave[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animationFrameRef = useRef<number>(0);
  const gainNodeRef = useRef<GainNode | null>(null);
  const volumeRef = useRef<number>(1);
  const playlistRef = useRef<EasterEggTrack[]>([]);
  const currentTrackIndexRef = useRef<number>(0);

  // Define cleanup function first
  const cleanup = useCallback(async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== "closed") {
          await audioContextRef.current.close();
        }
      } catch (e) {
        console.warn("Audio context cleanup warning:", e);
      }
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
  }, []);

  const activateTrack = useCallback(
    async (track: EasterEggTrack) => {
      try {
        await cleanup();
        setEasterEggActive(true);
        setCurrentTrack(track);

        const newAudioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        const gainNode = newAudioContext.createGain();
        gainNode.gain.value = volumeRef.current;
        gainNodeRef.current = gainNode;

        const audio = new Audio();
        audio.src = track.src;
        audio.crossOrigin = "anonymous";
        audio.loop = false;

        // Set up ended handler to automatically play next track
        audio.addEventListener("ended", () => {
          nextTrack();
        });

        await new Promise((resolve, reject) => {
          audio.addEventListener("canplaythrough", resolve, { once: true });
          audio.addEventListener("error", reject, { once: true });
          audio.load();
        });

        audioContextRef.current = newAudioContext;
        audioRef.current = audio;

        const source = newAudioContext.createMediaElementSource(audio);
        const analyser = newAudioContext.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.5;

        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(newAudioContext.destination);

        if (newAudioContext.state === "suspended") {
          await newAudioContext.resume();
        }
        await audio.play();
      } catch (error) {
        console.error("Error activating track:", error);
        await cleanup();
        setEasterEggActive(false);
        setCurrentTrack(null);
      }
    },
    [cleanup]
  );

  const nextTrack = useCallback(async () => {
    if (playlistRef.current.length === 0) return;

    currentTrackIndexRef.current =
      (currentTrackIndexRef.current + 1) % playlistRef.current.length;
    const nextTrack = playlistRef.current[currentTrackIndexRef.current];
    await activateTrack(nextTrack);
  }, [activateTrack]);

  const prevTrack = useCallback(async () => {
    if (playlistRef.current.length === 0) return;

    currentTrackIndexRef.current =
      (currentTrackIndexRef.current - 1 + playlistRef.current.length) %
      playlistRef.current.length;
    const prevTrack = playlistRef.current[currentTrackIndexRef.current];
    await activateTrack(prevTrack);
  }, [activateTrack]);

  const activatePlaylist = useCallback(
    async (tracks: EasterEggTrack[], startIndex = 0) => {
      playlistRef.current = tracks;
      currentTrackIndexRef.current = startIndex;
      await activateTrack(tracks[startIndex]);
    },
    [activateTrack]
  );

  const deactivatePlaylist = useCallback(async () => {
    await cleanup();
    setEasterEggActive(false);
    setCurrentTrack(null);
    playlistRef.current = [];
    currentTrackIndexRef.current = 0;
  }, [cleanup]);

  // Set up the easter egg ref
  useEffect(() => {
    if (easterEggRef) {
      easterEggRef.current = {
        volume: volumeRef.current,
        setVolume: (volume: number) => {
          volumeRef.current = Math.max(0, Math.min(1, volume));
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volumeRef.current;
          }
        },
        activatePlaylist,
        deactivatePlaylist,
        nextTrack,
        prevTrack,
        currentTrack,
        isPlaying: easterEggActive,
      };
    }
  }, [
    activatePlaylist,
    deactivatePlaylist,
    nextTrack,
    prevTrack,
    easterEggRef,
    easterEggActive,
    currentTrack,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pulseCanvas = pulseCanvasRef.current;
    if (!canvas || !pulseCanvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      desynchronized: true,
    });
    const ctx = pulseCanvas.getContext("2d");
    if (!gl || !ctx) return;

    // Initialize WebGL context and create program
    const program = createShaderProgram(gl);
    if (!program) return;

    // Get attribute and uniform locations after program creation
    const locations = {
      position: gl.getAttribLocation(program, "a_position"),
      size: gl.getAttribLocation(program, "a_size"),
      opacity: gl.getAttribLocation(program, "a_opacity"),
      color: gl.getAttribLocation(program, "a_color"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
    };

    // Create buffers
    const buffers = {
      position: gl.createBuffer(),
      size: gl.createBuffer(),
      opacity: gl.createBuffer(),
      color: gl.createBuffer(),
    };

    // Optimize animation frame rate based on device capability
    const fps = window.matchMedia("(max-width: 768px)").matches ? 30 : 60;
    const frameDelay = 1000 / fps;
    let lastFrameTime = 0;

    const GRID_SIZE = 25;
    const CONNECTION_RADIUS = GRID_SIZE * 1.5;
    const MAX_WAVE_RADIUS = Math.max(canvas.width, canvas.height) * 0.8;
    const WAVE_SPEED = 2.5;
    const BASE_FADE_OUT_DURATION = 30; // frames
    const GRAVITY_RADIUS = 100;
    const BASE_GRAVITY = 3;
    const ACTIVE_GRAVITY = 10;
    let dots: Dot[] = [];
    let pulses: Pulse[] = [];
    let pulseWaves: PulseWave[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    // Add jiggle parameters
    const JIGGLE_AMPLITUDE = 2;
    const JIGGLE_FREQUENCY = 0.2;
    let time = 0;

    // Define all functions first
    const initDots = () => {
      dots = [];
      const positions = new Float32Array(
        Math.ceil(canvas.width / GRID_SIZE) *
        Math.ceil(canvas.height / GRID_SIZE) *
        2
      );
      const sizes = new Float32Array(positions.length / 2);
      const opacities = new Float32Array(positions.length / 2);

      let i = 0;
      for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        for (let y = 0; y < canvas.height; y += GRID_SIZE) {
          positions[i * 2] = x;
          positions[i * 2 + 1] = y;
          sizes[i] = 2.5;
          opacities[i] = 0.3 + Math.random() * 0.2;

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            baseOpacity: opacities[i],
            currentOpacity: opacities[i],
            connections: [],
            size: 2.5,
            targetSize: 2.5,
            audioOpacity: 0,
            color: [1, 1, 1],
          });
          i++;
        }
      }

      // Upload data to GPU
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.size);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.opacity);
      gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.DYNAMIC_DRAW);

      // Set up connections
      dots.forEach((dot) => {
        dot.connections = dots.filter((otherDot) => {
          const distance = Math.hypot(
            dot.baseX - otherDot.baseX,
            dot.baseY - otherDot.baseY
          );
          return otherDot !== dot && distance <= CONNECTION_RADIUS;
        });
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      const currentWidth = canvas.width || window.innerWidth;
      const currentHeight = canvas.height || window.innerHeight;
      const maxRadius = Math.max(currentWidth, currentHeight) * 0.4;

      pulseWavesRef.current.push({
        id: Date.now(),
        x: mouseX,
        y: mouseY,
        radius: 0,
        intensity: 1,
        maxRadius,
        speed: WAVE_SPEED,
      });
    };

    const applyGravity = (dot: Dot) => {
      const dx = mouseX - dot.baseX;
      const dy = mouseY - dot.baseY;
      const distance = Math.hypot(dx, dy);

      const adjustedGravityRadius = GRAVITY_RADIUS * (isMouseDown ? 3 : 1);

      if (distance <= adjustedGravityRadius) {
        const force =
          (1 - distance / adjustedGravityRadius) *
          (isMouseDown ? ACTIVE_GRAVITY : BASE_GRAVITY);
        const targetX = dot.baseX + (dx / distance) * force;
        const targetY = dot.baseY + (dy / distance) * force;
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;

        dot.currentOpacity = dot.baseOpacity;
      } else {
        dot.x += (dot.baseX - dot.x) * 0.1;
        dot.y += (dot.baseY - dot.y) * 0.1;
        dot.currentOpacity += (dot.baseOpacity - dot.currentOpacity) * 0.1;
      }
    };

    const calculateDotSizeAndBrightness = (dot: Dot, waves: PulseWave[]) => {
      let maxSizeIncrease = 0;
      let maxBrightnessIncrease = 0;
      let gravityOffsetX = 0;
      let gravityOffsetY = 0;

      if (easterEggActive && analyserRef.current && dataArrayRef.current) {
        const binCount = dataArrayRef.current.length;
        const binIndex = Math.floor(
          ((canvas.height - dot.baseY) / canvas.height) * binCount
        );
        const frequencyValue = dataArrayRef.current[binIndex] / 255;

        // Enhanced color mapping with more vibrant colors
        const normalizedBin = binIndex / binCount;
        if (frequencyValue > 0.08) {
          // Slightly more sensitive
          if (normalizedBin < 0.25) {
            // Deep purple to hot pink (bottom)
            const t = normalizedBin * 4;
            dot.color = [
              0.5 + t * 0.5, // R: 0.5 -> 1.0
              0.0 + t * 0.2, // G: 0.0 -> 0.2
              0.8 + t * 0.2, // B: 0.8 -> 1.0
            ];
          } else if (normalizedBin < 0.5) {
            // Hot pink to electric orange
            const t = (normalizedBin - 0.25) * 4;
            dot.color = [
              1.0, // R: 1.0
              0.2 + t * 0.4, // G: 0.2 -> 0.6
              1.0 - t * 0.8, // B: 1.0 -> 0.2
            ];
          } else if (normalizedBin < 0.75) {
            // Electric orange to cyan
            const t = (normalizedBin - 0.5) * 4;
            dot.color = [
              1.0 - t * 0.9, // R: 1.0 -> 0.1
              0.6 + t * 0.4, // G: 0.6 -> 1.0
              0.2 + t * 0.8, // B: 0.2 -> 1.0
            ];
          } else {
            // Cyan to electric blue (top)
            const t = (normalizedBin - 0.75) * 4;
            dot.color = [
              0.1 - t * 0.1, // R: 0.1 -> 0.0
              1.0 - t * 0.3, // G: 1.0 -> 0.7
              1.0, // B: 1.0
            ];
          }

          // Add intensity based on frequency value
          const intensity = 0.3 + frequencyValue * 0.7;
          dot.color = dot.color.map((c) => c * intensity) as [
            number,
            number,
            number,
          ];
        } else {
          // Subtle ambient color when frequency is low
          const baseColor = [0.95, 0.95, 1.0]; // Slightly blue-tinted white
          dot.color = baseColor as [number, number, number];
        }
      } else {
        // Default color when no audio
        dot.color = [1, 1, 1];
      }

      waves.forEach((wave) => {
        const distance = Math.hypot(dot.x - wave.x, dot.y - wave.y);
        const distanceFromWaveFront = Math.abs(distance - wave.radius);
        const affectedRange = 150;

        if (distanceFromWaveFront <= affectedRange) {
          const factor =
            Math.cos((distanceFromWaveFront / affectedRange) * Math.PI) * 0.5 +
            0.5;
          const sizeIncrease = 6 * factor * wave.intensity;
          const brightnessIncrease = 5 * factor * wave.intensity;
          maxSizeIncrease = Math.max(maxSizeIncrease, sizeIncrease);
          maxBrightnessIncrease = Math.max(
            maxBrightnessIncrease,
            brightnessIncrease
          );

          // Add jiggling effect
          const jigglePhase = time * JIGGLE_FREQUENCY;
          const jiggleAmount = JIGGLE_AMPLITUDE * factor * wave.intensity;
          gravityOffsetX += Math.cos(jigglePhase) * jiggleAmount;
          gravityOffsetY += Math.sin(jigglePhase) * jiggleAmount;

          // Add original wave push effect
          const angle = Math.atan2(dot.y - wave.y, dot.x - wave.x);
          const pushForce = factor * wave.intensity * 5;
          gravityOffsetX += Math.cos(angle) * pushForce;
          gravityOffsetY += Math.sin(angle) * pushForce;
        }
      });

      // Apply gravity offsets to dot position
      dot.x += gravityOffsetX;
      dot.y += gravityOffsetY;

      // Smoothly ease towards target size
      dot.targetSize = 1.5 + maxSizeIncrease;
      dot.size += (dot.targetSize - dot.size) * 0.15;

      // Smoothly ease towards target opacity
      const targetOpacity = Math.min(
        1,
        dot.baseOpacity + maxBrightnessIncrease + (dot.audioOpacity || 0)
      );
      dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.15;
    };

    const calculatePulsePath = (startDot: Dot, maxLength: number): Dot[] => {
      const path: Dot[] = [startDot];
      const visited = new Set<Dot>([startDot]);
      let lastDirection = { x: 0, y: 0 };

      while (path.length < maxLength) {
        const lastDot = path[path.length - 1];
        const availableConnections = lastDot.connections.filter(
          (d) => !visited.has(d)
        );

        if (availableConnections.length === 0) break;

        const scoredConnections = availableConnections.map((d) => {
          const dx = d.baseX - lastDot.baseX;
          const dy = d.baseY - lastDot.baseY;
          const dotProduct = dx * lastDirection.x + dy * lastDirection.y;
          const score = dotProduct + Math.random();
          return { dot: d, score };
        });

        scoredConnections.sort((a, b) => b.score - a.score);
        const nextDot = scoredConnections[0].dot;

        path.push(nextDot);
        visited.add(nextDot);
        lastDirection = {
          x: nextDot.baseX - lastDot.baseX,
          y: nextDot.baseY - lastDot.baseY,
        };
      }

      return path;
    };

    const getNextDotInDirection = (
      currentDot: Dot,
      direction: Direction
    ): Dot | null => {
      const directionVectors = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
        "up-right": { x: 1, y: -1 },
        "up-left": { x: -1, y: -1 },
        "down-right": { x: 1, y: 1 },
        "down-left": { x: -1, y: 1 },
      };

      const vector = directionVectors[direction];
      const targetX = currentDot.baseX + GRID_SIZE * vector.x;
      const targetY = currentDot.baseY + GRID_SIZE * vector.y;

      return (
        dots.find(
          (dot) =>
            Math.abs(dot.baseX - targetX) < 1 &&
            Math.abs(dot.baseY - targetY) < 1
        ) || null
      );
    };

    const createNewPulse = () => {
      const usePresetPath =
        predefinedPaths.length > 0 && Math.random() < pathProbability;

      if (usePresetPath) {
        // Select random preset path
        const selectedPath =
          predefinedPaths[Math.floor(Math.random() * predefinedPaths.length)];

        // Try different starting positions until we find one that works
        const attempts = 20; // Limit the number of attempts to avoid infinite loops
        for (let attempt = 0; attempt < attempts; attempt++) {
          const startDot = dots[Math.floor(Math.random() * dots.length)];
          const path: Dot[] = [startDot];
          let currentDot = startDot;
          let pathValid = true;

          // Validate the entire path before creating it
          for (const direction of selectedPath) {
            const nextDot = getNextDotInDirection(currentDot, direction);
            if (!nextDot) {
              pathValid = false;
              break;
            }
            path.push(nextDot);
            currentDot = nextDot;
          }

          if (pathValid) {
            const totalLength = path.reduce((acc, dot, index) => {
              if (index === 0) return 0;
              const prevDot = path[index - 1];
              return (
                acc +
                Math.hypot(dot.baseX - prevDot.baseX, dot.baseY - prevDot.baseY)
              );
            }, 0);

            pulsesRef.current.push({
              path,
              progress: 0,
              fadeOut: null,
              totalLength,
              intensity: 1,
            });
            return;
          }
        }
      }

      // Fall back to original random path if preset path fails or wasn't chosen
      const startDot = dots[Math.floor(Math.random() * dots.length)];
      const path = calculatePulsePath(startDot, 4);
      const totalLength = path.reduce((acc, dot, index) => {
        if (index === 0) return 0;
        const prevDot = path[index - 1];
        return (
          acc + Math.hypot(dot.baseX - prevDot.baseX, dot.baseY - prevDot.baseY)
        );
      }, 0);

      pulsesRef.current.push({
        path,
        progress: 0,
        fadeOut: null,
        totalLength,
        intensity: 1,
      });
    };

    const render = () => {
      timeRef.current += 0.016;
      time += 0.016;

      gl.useProgram(program);

      // Clear both canvases
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      ctx.clearRect(0, 0, pulseCanvas.width, pulseCanvas.height);

      // If Easter Egg is active, analyze audio data
      if (easterEggActive && analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        // Focus on kick drum frequency range (40-100Hz)
        const kickEnergy =
          dataArrayRef.current
            .slice(0, 4)
            .reduce((sum, value) => sum + value, 0) / 4;

        // Focus on bass range (100-250Hz)
        const bassEnergy =
          dataArrayRef.current
            .slice(4, 10)
            .reduce((sum, value) => sum + value, 0) / 6;

        // Create pulse waves for strong kicks
        if (kickEnergy > 200 && Math.random() < 0.15) {
          const centerX =
            canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.8;
          const centerY =
            canvas.height / 2 + (Math.random() - 0.5) * canvas.height * 0.8;

          pulseWavesRef.current.push({
            id: Date.now(),
            x: centerX,
            y: centerY,
            radius: 0,
            intensity: (kickEnergy / 255) * 0.8,
            maxRadius: MAX_WAVE_RADIUS * 0.5,
            speed: WAVE_SPEED * (1 + kickEnergy / 255) * 0.5,
          });
        }

        // Create larger pulse waves for strong bass hits
        if (bassEnergy > 180 && Math.random() < 0.08) {
          const centerX =
            canvas.width / 2 + (Math.random() - 0.5) * canvas.width;
          const centerY =
            canvas.height / 2 + (Math.random() - 0.5) * canvas.height;

          pulseWavesRef.current.push({
            id: Date.now(),
            x: centerX,
            y: centerY,
            radius: 0,
            intensity: Math.min(0.9, (bassEnergy / 255) * 1.2),
            maxRadius: MAX_WAVE_RADIUS * (0.7 + bassEnergy / 255),
            speed: WAVE_SPEED * (1.2 + bassEnergy / 255),
          });
        }
      }

      // Update and draw pulse waves
      let newPulseWaves = [];
      for (const wave of pulseWavesRef.current) {
        wave.radius = Math.min(
          wave.radius + (wave.speed || WAVE_SPEED),
          wave.maxRadius
        );
        const progress = wave.radius / wave.maxRadius;
        wave.intensity = Math.pow(1 - progress, 1.5);

        if (wave.radius < wave.maxRadius && wave.intensity > 0.001) {
          newPulseWaves.push(wave);
        }
      }
      pulseWavesRef.current = newPulseWaves;

      // Update dots with wave influences
      const positions = new Float32Array(dots.length * 2);
      const sizes = new Float32Array(dots.length);
      const opacities = new Float32Array(dots.length);
      const colors = new Float32Array(dots.length * 3);

      dots.forEach((dot, i) => {
        applyGravity(dot);
        calculateDotSizeAndBrightness(dot, pulseWavesRef.current);

        positions[i * 2] = dot.x;
        positions[i * 2 + 1] = dot.y;
        sizes[i] = dot.size;
        opacities[i] = dot.currentOpacity;
        colors[i * 3] = dot.color[0];
        colors[i * 3 + 1] = dot.color[1];
        colors[i * 3 + 2] = dot.color[2];
      });

      // Upload updated data using stored locations
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(locations.position);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.size);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(locations.size);
      gl.vertexAttribPointer(locations.size, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.opacity);
      gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(locations.opacity);
      gl.vertexAttribPointer(locations.opacity, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(locations.color);
      gl.vertexAttribPointer(locations.color, 3, gl.FLOAT, false, 0, 0);

      // Set resolution
      if (locations.resolution) {
        gl.uniform2f(locations.resolution, canvas.width, canvas.height);
      }

      // Draw points
      gl.drawArrays(gl.POINTS, 0, dots.length);

      // Draw pulses on the 2D canvas
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        if (pulse.fadeOut !== null) {
          const fadeOutDuration =
            BASE_FADE_OUT_DURATION * (pulse.totalLength / (GRID_SIZE * 3));
          pulse.fadeOut++;
          if (pulse.fadeOut >= fadeOutDuration) return false;
        }

        const currentProgress = pulse.progress * pulse.totalLength;
        let accumulatedLength = 0;

        ctx.beginPath();

        for (let i = 1; i < pulse.path.length; i++) {
          const prevDot = pulse.path[i - 1];
          const currentDot = pulse.path[i];
          const segmentLength = Math.hypot(
            currentDot.x - prevDot.x,
            currentDot.y - prevDot.y
          );

          if (accumulatedLength + segmentLength > currentProgress) {
            const remainingLength = currentProgress - accumulatedLength;
            const ratio = remainingLength / segmentLength;
            const endX = prevDot.x + (currentDot.x - prevDot.x) * ratio;
            const endY = prevDot.y + (currentDot.y - prevDot.y) * ratio;
            ctx.moveTo(prevDot.x, prevDot.y);
            ctx.lineTo(endX, endY);
            break;
          } else {
            ctx.moveTo(prevDot.x, prevDot.y);
            ctx.lineTo(currentDot.x, currentDot.y);
          }

          accumulatedLength += segmentLength;
        }

        let opacity = 0.5;
        if (pulse.fadeOut !== null) {
          const fadeOutDuration =
            BASE_FADE_OUT_DURATION * (pulse.totalLength / (GRID_SIZE * 3));
          opacity = 0.5 * (1 - pulse.fadeOut / fadeOutDuration);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (pulse.fadeOut === null) {
          pulse.progress += 0.005;
          if (pulse.progress >= 1) {
            pulse.fadeOut = 0;
          }
        }

        return true;
      });

      // Create new pulses
      if (Math.random() < 0.01 && pulsesRef.current.length < 5) {
        createNewPulse();
      }

      // Set ready state after first frame
      if (!isReady) {
        setIsReady(true);
      }

      // Continue render loop
      animationFrameRef.current = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pulseCanvas.width = window.innerWidth;
      pulseCanvas.height = window.innerHeight;
      initDots();
    };

    // Initialize everything
    resizeCanvas();

    // Add event listeners
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Handle click events
    const handleCanvasClick = () => {
      const currentWidth = canvas.width || window.innerWidth;
      const currentHeight = canvas.height || window.innerHeight;
      const maxRadius = Math.max(currentWidth, currentHeight) * 0.4;

      pulseWavesRef.current.push({
        id: Date.now(),
        x: mouseX,
        y: mouseY,
        radius: 0,
        intensity: 1,
        maxRadius,
        speed: WAVE_SPEED,
      });
    };

    // Add click listener
    canvas.addEventListener("click", handleCanvasClick);

    // Start the render loop
    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameRef.current);

      // Clean up audio
      const cleanupAudio = async () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current = null;
        }
        if (audioContextRef.current) {
          try {
            await audioContextRef.current.close();
          } catch (e) {
            console.error("Error closing audio context:", e);
          }
          audioContextRef.current = null;
        }
        analyserRef.current = null;
        dataArrayRef.current = null;
      };

      cleanupAudio();
    };
  }, [
    activateTrack,
    easterEggActive,
    isReady,
    pathProbability,
    predefinedPaths,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 pointer-events-auto opacity-40",
          className
        )}
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
        aria-label="Interactive background grid"
      />
      <canvas
        ref={pulseCanvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
        aria-label="Pulse effects layer"
      />
    </motion.div>
  );
}

// Helper function to create and compile shader program
function createShaderProgram(gl: WebGL2RenderingContext) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

  gl.shaderSource(
    vertexShader,
    `#version 300 es
    in vec2 a_position;
    in float a_size;
    in float a_opacity;
    in vec3 a_color;
    uniform vec2 u_resolution;
    out float v_opacity;
    out vec3 v_color;
    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      gl_PointSize = a_size;
      v_opacity = a_opacity;
      v_color = a_color;
    }
  `
  );

  gl.shaderSource(
    fragmentShader,
    `#version 300 es
    precision highp float;
    in float v_opacity;
    in vec3 v_color;
    out vec4 fragColor;
    void main() {
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      if (r > 1.0) {
        discard;
      }
      float alpha = 1.0 - smoothstep(0.95, 1.0, r);
      fragColor = vec4(v_color, v_opacity * alpha);
    }
  `
  );

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program:",
      gl.getProgramInfoLog(program)
    );
    return null;
  }

  return program;
}
