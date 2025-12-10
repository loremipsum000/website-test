"use client";
import { motion } from "framer-motion";
import Image from "next/image";
export const CardStack = () => {
  const cards = ["card-1.svg", "card-2.svg", "card-3.svg"];
  // Card dimensions
  const cardWidth = 360;
  const cardHeight = 240;
  // Animation values
  const gap = 60;
  const hoverGap = 10;

  // Calculate container height based on perspective and total spread
  const rotationX = 60; // degrees
  const rotationZ = 45; // degrees
  const projectedHeight = Math.cos((rotationX * Math.PI) / 180) * cardHeight;
  const totalSpread = gap * cards.length + hoverGap;
  const containerHeight = projectedHeight + totalSpread;

  // Calculate offset for each card (0 = top, 1 = middle, 2 = bottom)
  const getOffset = (index: number) => {
    if (index === 0) return -hoverGap; // Top card moves up
    if (index === 1) return 0; // Middle card stays
    return hoverGap; // Bottom card moves down
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      whileHover="hover"
      initial="initial"
      style={{
        perspective: "2000px",
        height: containerHeight,
        width: cardWidth,
        margin: "0 auto",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card}
            variants={{
              initial: {
                y: index * gap,
                transition: { type: "spring", stiffness: 300 },
              },
              hover: {
                y: index * gap + getOffset(index),
                transition: { type: "spring", stiffness: 300, damping: 15 },
              },
            }}
            style={{
              position: "absolute",
              top: `-${gap + getOffset(index)}px`,
              height: cardHeight,
              width: cardWidth,
              zIndex: cards.length - index,
            }}
          >
            <Card
              card={card}
              style={{
                height: "100%",
                width: "100%",
                transform: `perspective(2000px) rotateX(${rotationX}deg) rotateZ(${rotationZ}deg)`,
                transformOrigin: "center center",
                filter: "drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.2))",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Card = ({
  card,
  style,
}: {
  card: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className="relative">
      <Image
        src={`/images/rdp/${card}`}
        alt="card"
        style={style}
        fill
        className="object-contain"
      />
    </div>
  );
};
