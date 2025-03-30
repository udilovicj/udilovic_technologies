"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "small" | "medium" | "large" | "xlarge" | "hero" | "splash";
  animated?: boolean;
  className?: string;
  enhancedAnimation?: boolean;
}

export const Logo = ({ size = "medium", animated = true, className = "", enhancedAnimation = false }: LogoProps) => {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizes = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-48 h-48",
    xlarge: "w-64 h-64",
    hero: "w-96 h-96",
    splash: "w-[32rem] h-[32rem]" // 512x512px
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8 
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8 
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  // Enhanced animation for splash screen
  const splashAnimationVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      rotate: -10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        duration: 1.2
      }
    }
  };

  // SVG fallback logo
  const SVGLogo = () => (
    <div className={`relative ${sizes[size]} flex items-center justify-center`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="4" y="16" width="24" height="32" rx="4" fill="#0062FF" />
        <rect x="36" y="16" width="24" height="32" rx="4" fill="#4BB4FF" />
        <path d="M12 32L19 26V38L12 32Z" fill="white" />
        <path d="M52 32L45 26V38L52 32Z" fill="white" />
      </svg>
    </div>
  );

  // Normal logo display without animation
  if (!animated) {
    if (!mounted) return null;
    
    return (
      <div className={`relative ${sizes[size]} ${className}`}>
        {imageError ? (
          <SVGLogo />
        ) : (
          <Image 
            src="/logo.png" 
            alt="Company Logo"
            fill 
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain p-1"
            onError={() => setImageError(true)}
            priority
          />
        )}
      </div>
    );
  }

  // Animated logo with enhanced animation option
  if (!mounted) return null;
  
  // Enhanced animation for splash screen
  if (enhancedAnimation) {
    return (
      <div className={`relative ${sizes[size]} ${className}`}>
        {/* Background pulses */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#4BB4FF]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full bg-[#4BB4FF]/5 blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
        
        {/* Logo with spring animation */}
        <motion.div
          className="relative h-full w-full"
          variants={splashAnimationVariants}
          initial="hidden"
          animate="visible"
        >
          {imageError ? (
            <SVGLogo />
          ) : (
            <Image 
              src="/logo.png" 
              alt="Company Logo"
              fill 
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain"
              onError={() => setImageError(true)}
              priority
            />
          )}
          
          {/* Animated halo effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#4BB4FF]/30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.6, 1, 0.6],
              borderWidth: ["2px", "1px", "2px"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          {/* Animated rotating accent */}
          <motion.div
            className="absolute inset-0 border-t-2 border-[#4BB4FF]/50 rounded-full"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    );
  }
  
  // Standard animation
  return (
    <motion.div
      className={`relative ${sizes[size]} ${className} flex items-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={itemVariants}
      >
        {imageError ? (
          <SVGLogo />
        ) : (
          <Image 
            src="/logo.png" 
            alt="Company Logo"
            fill 
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain p-1"
            onError={() => setImageError(true)}
            priority
          />
        )}
      </motion.div>
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 bg-[#4BB4FF]/20 blur-xl rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}; 