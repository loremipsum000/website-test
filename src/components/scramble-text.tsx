import React, { useState, useEffect } from "react";

export const ScrambleText: React.FC<{ children: string; size?: number }> = ({
  children,
  size = 5,
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < children.length) {
        const finishedText = children.slice(0, currentIndex);
        const remainingLength = children.length - currentIndex;
        const scrambleSize = Math.min(size, remainingLength);
        const scrambled = scrambleText(
          children.slice(currentIndex, currentIndex + scrambleSize)
        );
        setDisplayText(
          finishedText + scrambled + children.slice(currentIndex + scrambleSize)
        );
        currentIndex++;
      } else {
        setDisplayText(children);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [children, size]);

  return <span>{displayText}</span>;
};

const scrambleText = (text: string): string => {
  const chars = text.split("");
  const scrambledChars = chars.map((char) => {
    // Don't scramble whitespace
    if (/^\s$/.test(char)) {
      return char;
    }
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    return alphanumericChars[randomIndex];
  });
  return scrambledChars.join("");
};

const alphanumericChars =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-./:<=>?[]{}()".split(
    ""
  );
