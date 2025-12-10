"use client";

import { CtaButton } from "@/components/cta-button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Add these flag configurations
const FLAGS = [
  // Top row
  {
    code: "tr",
    country: "Turkey",
    position: "top-[10%] left-[5%] md:left-[15%]",
  },
  {
    code: "es",
    country: "Spain",
    position: "top-[15%] right-[5%] md:right-[20%]",
  },

  // Middle row
  {
    code: "kr",
    country: "South Korea",
    position: "top-[45%] right-[2%] md:right-[10%]",
  },
  {
    code: "br",
    country: "Brazil",
    position: "top-[45%] left-[2%] md:left-[10%]",
  },

  // Bottom row
  {
    code: "id",
    country: "Indonesia",
    position: "bottom-[15%] right-[5%] md:right-[25%]",
  },
  {
    code: "ae",
    country: "UAE",
    position: "bottom-[10%] left-[5%] md:left-[20%]",
  },
];

interface InternationalProps {
  title: string;
  subtitle: string;
  cta: {
    title: string;
    url: string;
  };
}

export default function International({
  title,
  subtitle,
  cta,
}: InternationalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Transform values for image (subtle movement)
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  // Transform values for flags (more pronounced movement)
  const flagsX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const flagsY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Update gradient position
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Update mouse position for parallax
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);

    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * 5;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * -5;

    containerRef.current.style.transform = isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
      : "none";
  };

  return (
    <div className="relative py-8 sm:py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left lg:col-span-3">
            <h3 className="text-h3 leading-tight md:leading-none font-medium">
              {title}
            </h3>
            <p className="text-body-lg max-w-2xl mx-auto lg:mx-0">{subtitle}</p>
            <CtaButton href={cta.url ?? ""}>{cta.title}</CtaButton>
          </div>

          {/* Right Content */}
          <div
            ref={containerRef}
            className="relative h-[350px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden transition-all duration-300 ease-out lg:col-span-2"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              if (containerRef.current) {
                containerRef.current.style.transform = "none";
              }
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            {/* Hover gradient overlay */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
              }}
            />

            {/* Main image with parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: imageX, y: imageY }}
            >
              <img
                src="/images/rdp/man-smiling.png"
                alt="Person using mobile app"
                className="object-contain w-auto h-full mx-auto scale-90 rounded-xl"
              />
            </motion.div>

            {/* Country Flag Bubbles with separate parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: flagsX, y: flagsY }}
            >
              {FLAGS.map((flag) => (
                <div
                  key={flag.code}
                  className={`absolute ${flag.position} flex items-center gap-2 bg-[#2C2C2E] px-3 py-1.5 rounded-full`}
                >
                  <img
                    src={`https://flagcdn.com/w20/${flag.code}.png`}
                    alt={`${flag.country} flag`}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-sm text-white whitespace-nowrap">
                    {flag.country}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
