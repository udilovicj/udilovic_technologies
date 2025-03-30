"use client";

import React, { useEffect, useState, useMemo } from "react";
import { BackgroundBeams } from "./BackgroundBeams";
import { SparklesCore } from "./SparklesCore";

export default function AceternityBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize the background orbs to prevent unnecessary recalculations
  const backgroundOrbs = useMemo(() => (
    <div className="absolute overflow-visible" style={{
      top: "-100px",
      bottom: "-100px",
      left: "-100px",
      right: "-100px"
    }}>
      {/* First orb - blue gradient - static position */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vw] bg-gradient-to-br from-[#2980B9]/20 to-[#2980B9]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-60"
      />
      
      {/* Second orb - blue gradient - static position */}
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#2980B9]/15 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-40"
      />
      
      {/* Additional subtle accent orb - static position */}
      <div
        className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] bg-[#2980B9]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none opacity-30"
      />
    </div>
  ), []);

  if (!mounted) return null;

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center overflow-visible -z-10 fixed inset-0">
      {/* Solid base background to ensure consistent darkness - extending beyond viewport */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-[-1]" style={{
        top: "-200px",
        bottom: "-200px",
        left: "-200px",
        right: "-200px"
      }}></div>
      
      {/* Background elements - following Hero section styling - extend beyond viewport */}
      {backgroundOrbs}

      {/* Subtle grid overlay - reduced opacity - extend beyond viewport */}
      <div className="absolute bg-grid-pattern opacity-[0.02] pointer-events-none" style={{
        top: "-100px",
        bottom: "-100px",
        left: "-100px",
        right: "-100px"
      }}></div>

      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.5}
          maxSize={1.0}
          particleDensity={2} // Further reduced from 5
          className="w-full h-full"
          particleColor="#4BB4FF"
          speed={0.05} // Further reduced speed
          particleSize={0.8} // Further reduced size
        />
      </div>
      <div className="absolute inset-0">
        <BackgroundBeams
          color="#4BB4FF"
          backgroundOpacity={0.02}
          animationSpeed={15} // Further slowed animation
          beams={2} // Further reduced beams
        />
      </div>
    </div>
  );
} 