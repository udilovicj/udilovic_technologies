"use client";

import React, { useEffect, useState, memo } from "react";

interface BackgroundBeamsProps {
  beams?: number;
  animationSpeed?: number;
  backgroundOpacity?: number;
  color?: string;
}

export const BackgroundBeams = memo(({
  beams = 4,
  animationSpeed = 8,
  backgroundOpacity = 0.03,
  color = "#4BB4FF",
}: BackgroundBeamsProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div className="h-full w-full absolute overflow-hidden" style={{
      top: "-100px",
      bottom: "-100px",
      left: "-100px",
      right: "-100px",
    }}>
      <div 
        className="absolute inset-0 bg-[#0a0a0a]"
        style={{ opacity: backgroundOpacity }}
      />
      {Array.from({ length: beams }).map((_, i) => {
        return (
          <div
            key={i}
            className="absolute inset-0 opacity-10"
            style={{
              transform: `rotate(${(i * 360) / beams}deg)`,
              transformOrigin: "center center",
            }}
          >
            <div
              className="h-[200%] w-[0.5px] blur-[3px]"
              style={{
                marginLeft: "50%",
                animation: `beam ${animationSpeed + i * 0.8}s ${i * 0.2}s linear infinite`,
                background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              }}
            />
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes beam {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
});

BackgroundBeams.displayName = 'BackgroundBeams'; 