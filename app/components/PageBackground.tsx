"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";
import { BackgroundBeams } from "./BackgroundBeams";
import { SparklesCore } from "./SparklesCore";

interface PageBackgroundProps {
  mousePosition: { x: number; y: number };
}

export const PageBackground: React.FC<PageBackgroundProps> = ({ mousePosition }) => {
  return (
    <>
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="pageSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#4BB4FF"
          speed={0.2}
          particleSize={1.5}
        />
      </div>
      
      {/* Background elements with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Animated beam effects */}
        <BackgroundBeams 
          beams={10} 
          backgroundOpacity={0.03} 
          color="#4BB4FF" 
        />
        
        {/* First orb - blue gradient with mouse parallax */}
        <motion.div
          className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-gradient-to-br from-[#2980B9]/40 to-[#2980B9]/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-80"
          style={{ 
            x: useTransform(() => mousePosition.x * -40),
            y: useTransform(() => mousePosition.y * -40),
          }}
        />
        
        {/* Second orb - purple gradient with mouse parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-[65vw] h-[65vw] bg-gradient-to-tr from-[#8e44ad]/30 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-60"
          style={{ 
            x: useTransform(() => mousePosition.x * 30),
            y: useTransform(() => mousePosition.y * 30),
          }}
        />
        
        {/* Additional subtle accent orb */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-[50vw] h-[50vw] bg-[#2980B9]/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none opacity-50"
          style={{ 
            x: useTransform(() => mousePosition.x * 20),
            y: useTransform(() => mousePosition.y * 20),
          }}
        />

        {/* New accent orb - teal gradient for color variety */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-gradient-to-bl from-[#00CED1]/20 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-40"
          style={{ 
            x: useTransform(() => mousePosition.x * -15),
            y: useTransform(() => mousePosition.y * -15),
          }}
        />
        
        {/* Rotating glow effect - improved */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] opacity-[0.09] pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 30%, #4BB4FF 70%, transparent 100%)",
            animation: "rotateGlow 25s linear infinite"
          }}
        ></div>

        {/* New geometric accent shape */}
        <div 
          className="absolute top-[15%] right-[10%] w-[15vw] h-[15vw] opacity-[0.05] pointer-events-none border-2 border-[#4BB4FF]/30 rounded-lg"
          style={{
            animation: "float 15s ease-in-out infinite"
          }}
        ></div>

        {/* New geometric accent shape */}
        <div 
          className="absolute bottom-[20%] left-[10%] w-[10vw] h-[10vw] opacity-[0.05] pointer-events-none border-2 border-[#8e44ad]/30 rotate-45"
          style={{
            animation: "float 12s ease-in-out infinite 2s"
          }}
        ></div>
      </div>
      
      {/* Subtle grid overlay with enhanced opacity */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none"></div>
    </>
  );
}; 