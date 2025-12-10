"use client";

import Image from "next/image";
import { ElasticSlider } from "@/components/elastic-slider";
import { Body, H3 } from "@/components/ui/typography";
import { useAspectRatio } from "@/lib/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import { PulsePath } from "@/types/grid";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Snowfall from "react-snowfall";
import {
  EasterEggTrack,
  GridBackground,
  GridEasterEggRef,
  useEasterEgg,
} from "./grid-background";
import { ash } from "./grid-presets/ash";
import { claire } from "./grid-presets/claire";
import docsLottie from "./lotties/docs.json";
import gatewayLottie from "./lotties/gateway.json";
import stakeLottie from "./lotties/stake.json";
import upgradeLottie from "./lotties/upgrade.json";
import { MainnetMeshBackground } from "./mainnet-mesh-background";

interface HeroCardProps {
  icon?: React.ReactElement<LottieIconProps>;
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
  comingSoonText?: string;
  easterEggRef?: React.MutableRefObject<GridEasterEggRef | null>;
}

interface LottieIconProps {
  data: any;
  ref?: React.Ref<LottieIconHandle>;
  onMouseEnter?: () => void;
  className?: string;
  easterEggRef?: React.MutableRefObject<GridEasterEggRef | null>;
}

const easterEggTracks: EasterEggTrack[] = [
  {
    title: "Sonic Barrier",
    artist: "Sonic Labs",
    src: "/audio/sonic-barrier.mp3",
    albumArtSrc: "/images/sonic-icon.svg",
    href: "https://suno.com/",
  },
  {
    title: "Bridge Bells Ring",
    artist: "Sonic Labs",
    src: "/audio/bridge-bells-ring.mp3",
    albumArtSrc: "/images/sonic-icon.svg",
    href: "https://suno.com/",
    effects: ["dim", "snow"],
  },
  {
    title: "Hypersonic",
    artist: "Sonic Labs",
    src: "/audio/hypersonic.mp3",
    albumArtSrc: "/images/sonic-icon.svg",
    href: "https://suno.com/",
  },
  {
    title: "Steel Tiger",
    artist: "Ruzer",
    src: "/audio/steel-tiger.mp3",
    albumArtSrc:
      "https://cdn.epidemicsound.com/curation-assets/commercial-release-cover-images/10985/3000x3000.jpg?height=300&width=300",
    href: "https://www.epidemicsound.com/track/YLJRN2APZ0/",
  },
  {
    title: "Start",
    artist: "Rambutan",
    src: "/audio/start.mp3",
    albumArtSrc:
      "https://cdn.epidemicsound.com/curation-assets/commercial-release-cover-images/5933/3000x3000.jpg?height=300&width=300",
    href: "https://www.epidemicsound.com/track/1L87FSa9wD/",
  },
];

const LiveIndicator = ({
  easterEggRef,
}: {
  easterEggRef: React.RefObject<GridEasterEggRef>;
}) => {
  const [volume, setVolume] = useState(50);
  const [isClosing, setIsClosing] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<EasterEggTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward" | null>(
    null
  );
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setCurrentTrack(easterEggRef.current?.currentTrack || null);

    const interval = setInterval(() => {
      const newTrack = easterEggRef.current?.currentTrack;
      if (newTrack?.title !== currentTrack?.title) {
        setCurrentTrack(newTrack || null);
      }
      setIsPlaying(!!easterEggRef.current?.isPlaying);
    }, 100);

    return () => clearInterval(interval);
  }, [easterEggRef, currentTrack]);

  const handleClick = () => {
    if (!isPlaying) {
      easterEggRef.current?.activatePlaylist(easterEggTracks, 0);
      setIsPlaying(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      easterEggRef.current?.deactivatePlaylist();
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const handlePrevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    setDirection("backward");
    easterEggRef.current?.prevTrack();
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    setDirection("forward");
    easterEggRef.current?.nextTrack();
  };

  useEffect(() => {
    if (currentTrack) {
      easterEggRef.current?.setVolume(volume / 100);
    }
  }, [volume, currentTrack, easterEggRef]);

  return (
    <>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className="relative p-[2px] bg-gradient-sonic-mirrored rounded-lg animate-gradient cursor-pointer z-20"
        animate={
          !isPlaying && !isHovering
            ? {
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 5, 0],
              scale: [1, 1.02, 1.03, 1.03, 1.03, 1.02, 1.02, 1.02, 1.02, 1],
              filter: [
                "brightness(1)",
                "brightness(1.2)",
                "brightness(1)",
                "brightness(1.2)",
                "brightness(1)",
                "brightness(1.1)",
                "brightness(1)",
                "brightness(1.1)",
                "brightness(1)",
                "brightness(1)",
              ],
              transition: {
                repeat: Infinity,
                repeatDelay: 3,
                duration: 0.9,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
                ease: "easeInOut",
              },
            }
            : {
              rotate: 0,
              scale: 1,
              filter: "brightness(1)",
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }
        }
      >
        <motion.div
          layoutId="indicator-container"
          className="relative z-10 bg-black/75 rounded-md flex items-center overflow-hidden"
          transition={{
            layout: {
              duration: 0.2,
              ease: [0.32, 0.72, 0, 1],
            },
          }}
        >
          <AnimatePresence
            key={isClosing ? "closing" : "open"}
            mode="popLayout"
          >
            {currentTrack ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="flex items-center px-1 gap-x-1"
              >
                <button
                  onClick={handlePrevTrack}
                  className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="overflow-hidden">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={currentTrack.title}
                      custom={direction}
                      initial={
                        direction === "forward"
                          ? { x: 100, opacity: 0 }
                          : { x: -100, opacity: 0 }
                      }
                      animate={{ x: 0, opacity: 1 }}
                      exit={
                        direction === "forward"
                          ? { x: -100, opacity: 0 }
                          : { x: 100, opacity: 0 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className="flex items-center gap-x-2.5 px-2 py-1.5"
                    >
                      <Link
                        href={currentTrack.href}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:brightness-110 transition-all relative group"
                      >
                        <Image
                          src={currentTrack.albumArtSrc}
                          alt={`${currentTrack.title} album art`}
                          className="h-12 w-12 rounded-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                      </Link>
                      <div className="flex flex-col transition-all duration-300 hover:text-glow">
                        <span className="text-body-base font-bold transition-colors duration-300 hover:text-white">
                          {currentTrack.title}
                        </span>
                        <span className="text-m-caption font-medium text-muted-foreground transition-colors duration-300 hover:text-white/80">
                          by {currentTrack.artist}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleNextTrack}
                  className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="px-3 py-1.5 flex items-center gap-x-2.5"
              >
                <div className="relative">
                  <div className="absolute h-4 w-4 bg-red-500 rounded-full animate-ping" />
                  <div className="relative h-4 w-4 bg-red-500 rounded-full" />
                </div>
                <span className="italic text-body-base font-bold">Live</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <AnimatePresence
        mode="popLayout"
        key={isClosing ? "closing-live" : "live"}
      >
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: isClosing ? -100 : -20,
              transition: {
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1],
              },
            }}
            transition={{
              duration: 0.2,
              delay: currentTrack && !isClosing ? 0.2 : 0,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="z-10"
          >
            <ElasticSlider value={volume} onChange={setVolume} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroCard = ({
  icon,
  title,
  description,
  href,
  comingSoon,
  comingSoonText,
  easterEggRef,
}: HeroCardProps) => {
  const iconRef = useRef<LottieIconHandle>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      iconRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      iconRef.current.reverse();
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: {
          duration: 0.2,
          ease: [0.33, 1, 0.68, 1], // custom easing curve
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: "easeOut",
        },
      }}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <Link
        href={href ?? "#"}
        target={href?.startsWith("http") ? "_blank" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col items-center p-4 rounded-xl border bg-card/60 backdrop-blur text-card-foreground pointer-events-auto transition-all duration-200 hover:shadow-lg group"
      >
        <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100" />
        <div className="flex">
          {icon &&
            isValidElement(icon) &&
            cloneElement<LottieIconProps>(icon, {
              ref: iconRef,
              className: "h-24 w-auto",
              easterEggRef,
            })}
        </div>
        <div className="flex flex-col text-center gap-2">
          <Body bold size="large">
            {title}
          </Body>
          <Body medium size="small" variant="muted">
            {description}
          </Body>
        </div>
      </Link>
    </motion.div>
  );
};

export interface LottieIconHandle {
  play: () => void;
  stop: () => void;
  reverse: () => void;
}

const LottieIcon = forwardRef<
  LottieIconHandle,
  {
    data: any;
    className?: string;
    easterEggRef?: React.MutableRefObject<GridEasterEggRef | null>;
  }
>(({ data, className, easterEggRef }, ref) => {
  const [direction, setDirection] = useState<1 | -1>(1);
  const lottieRef = useRef<any>(null);
  const [isLooping, setIsLooping] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (!isLooping && lottieRef.current) {
        setDirection(1);
        lottieRef.current.setDirection(1);
        lottieRef.current.play();
      }
    },
    stop: () => {
      if (lottieRef.current) {
        lottieRef.current.stop();
      }
    },
    reverse: () => {
      if (!isLooping && lottieRef.current) {
        setDirection(-1);
        lottieRef.current.setDirection(-1);
        lottieRef.current.play();
      }
    },
  }));

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(direction);
    }
  }, [direction]);

  // Check if easter egg is playing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLooping(!!easterEggRef?.current?.isPlaying);
    }, 100);
    return () => clearInterval(interval);
  }, [easterEggRef]);

  // Handle looping animation
  useEffect(() => {
    if (isLooping && lottieRef.current) {
      // Start animation immediately
      setDirection((prev) => (prev * -1) as 1 | -1);
      lottieRef.current.play();

      const duration = lottieRef.current.getDuration() * 1000;
      const interval = setInterval(() => {
        setDirection((prev) => (prev * -1) as 1 | -1);
        lottieRef.current.play();
      }, duration);

      return () => {
        clearInterval(interval);
        if (lottieRef.current) {
          lottieRef.current.stop();
        }
      };
    }
  }, [isLooping]);

  return (
    <Lottie
      className={cn("", className)}
      lottieRef={lottieRef}
      animationData={data}
      loop={false}
      autoplay={false}
      onComplete={() => {
        if (isLooping && lottieRef.current) {
          setDirection((prev) => (prev * -1) as 1 | -1);
          lottieRef.current.play();
        }
      }}
    />
  );
});

LottieIcon.displayName = "LottieIcon";

const HERO_CARDS = [
  {
    icon: <LottieIcon data={upgradeLottie} />,
    title: "Upgrade",
    description:
      "Upgrade your FTM to S on a 1:1 basis through our upgrade portal.",
    href: "https://my.soniclabs.com/upgrade",
  },
  {
    icon: <LottieIcon data={gatewayLottie} />,
    title: "Bridge",
    description:
      "Bridge to Sonic with any asset, from any chain, using our bridge tool.",
    href: "https://howtobridge.soniclabs.com",
  },
  {
    icon: <LottieIcon data={stakeLottie} />,
    title: "Stake",
    description: "Stake S tokens to secure the Sonic network and earn rewards.",
    href: "https://my.soniclabs.com/stake",
  },
  {
    icon: <LottieIcon data={docsLottie} />,
    title: "Docs",
    description: "Check out Sonic's official documentation and start building.",
    href: "https://docs.soniclabs.com",
  },
];

const predefinedPaths: PulsePath[] = [ash, claire];

export const MainnetHero = () => {
  const easterEggRef = useEasterEgg();
  const [isSnowing, setIsSnowing] = useState<boolean | undefined>(undefined);
  const [isDimming, setIsDimming] = useState<boolean | undefined>(undefined);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSnowing(!!easterEggRef.current?.isPlaying && easterEggRef.current?.currentTrack?.effects?.includes("snow"));
      setIsDimming(!!easterEggRef.current?.isPlaying && easterEggRef.current?.currentTrack?.effects?.includes("dim"));
    }, 100);

    return () => clearInterval(interval);
  }, [easterEggRef]);

  const aspectRatio = useAspectRatio();

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full theme-dark bg-background text-foreground overflow-hidden",
        typeof window !== 'undefined' && aspectRatio < 1.9 ? "lg:-mt-16" : "lg:-mt-8",
      )}
    >
      <AnimatePresence>
        {isSnowing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            <Snowfall
              snowflakeCount={300}
              radius={[0.2, 1.2]}
              speed={[1, 3]}
              wind={[-0.5, 2]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isDimming ? 0.4 : 0.8,
        }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "transform", contain: "paint" }}
      >
        <MainnetMeshBackground className="opacity-80" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isDimming ? 0.4 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "transform", contain: "paint" }}
      >
        <GridBackground
          predefinedPaths={predefinedPaths}
          pathProbability={0.0005}
          easterEggRef={easterEggRef}
        />
      </motion.div>

      <div className="container relative mx-auto flex flex-col items-center justify-center min-h-screen pointer-events-none py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="pointer-events-auto">
            <LiveIndicator easterEggRef={easterEggRef} />
          </div>
          <h1 className="sr-only">Sonic</h1>
          <H3 as="h2" medium className="max-w-2xl text-center leading-none pointer-events-auto">
            DeFi Redefined
          </H3>
          <Body size="large" className="max-lg:max-w-lg max-w-2xl text-center pointer-events-auto">
            Sonic is the highest-performing EVM L1, combining speed, incentives, and world-class infrastructure. Powered by <a
              href="token"
              className="text-hero-2 font-bold hover:underline"
            >
              S
            </a>
            .
          </Body>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4 lg:gap-6 mt-8"
          >
            {HERO_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                custom={index}
              >
                <HeroCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  easterEggRef={easterEggRef}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
