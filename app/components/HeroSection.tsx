"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { SparklesCore } from "./SparklesCore";
import { BackgroundBeams } from "./BackgroundBeams";

// Smooth scroll function
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const refHeight = useMotionValue(0);
  
  // Transforms for parallax scrolling effect
  const y = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);
  
  // Mouse parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    if (heroRef.current) {
      refHeight.set(heroRef.current.offsetHeight);
    }
    
    setIsMounted(true);
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [refHeight]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };
  
  const floatingCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Enhanced keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        @keyframes borderPulse {
          0% { border-color: rgba(75, 180, 255, 0.3); }
          50% { border-color: rgba(75, 180, 255, 0.7); }
          100% { border-color: rgba(75, 180, 255, 0.3); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      
      <motion.section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ opacity, y }}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Sparkles Background */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="heroSparkles"
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
        
        {/* Content */}
        <div className="container-wide mx-auto px-6 relative z-10 py-10 md:pt-0 flex justify-center">
          <div className="max-w-4xl relative">
            {/* Enhanced accent lines */}
            <div 
              className="absolute -top-10 left-0 w-36 h-[2px] bg-gradient-to-r from-[#4BB4FF] to-transparent hidden lg:block"
            ></div>
            <div 
              className="absolute -top-10 -left-10 w-[3px] h-36 bg-gradient-to-b from-[#4BB4FF] to-transparent hidden lg:block"
            ></div>
            
            {/* New decorative element */}
            <div className="absolute -top-20 -right-20 w-40 h-40 opacity-20 hidden lg:block">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4BB4FF]/70"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4BB4FF]/70"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4BB4FF]/70"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4BB4FF]/70"></div>
              </div>
            </div>
            
            <div className="flex items-center mb-10 sm:text-left text-center sm:justify-start justify-center">
              <motion.div 
                className="flex-shrink-0 w-[3px] h-16 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 hidden sm:block"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 64, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.div>
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <span className="text-[#4BB4FF] mr-2">⟡</span>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-300 font-light mb-1">
                    Jovan Udilović
                  </p>
                  <span className="text-[#4BB4FF] ml-2">⟡</span>
                </div>
                <div className="h-[2px] w-0 bg-gradient-to-r from-[#4BB4FF] to-[#4BB4FF]/50 mt-1 sm:hidden absolute left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-0 sm:relative" 
                  style={{
                    animation: "expandWidth 1.5s forwards 1.2s"
                  }}
                ></div>
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 sm:mb-6 text-center sm:text-left relative"
              variants={itemVariants}
            >
              Creator of <span className="relative inline-block">
                <span className="gradient-text font-normal relative">
                  Udilović Technologies
                </span>
                <div 
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#4BB4FF] to-[#4BB4FF]/50 hidden sm:block"
                  style={{
                    animation: "pulse 3s infinite"
                  }}
                ></div>
              </span>
              
              {/* New decorative element */}
              <div className="absolute -right-10 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#4BB4FF]/30 to-transparent hidden lg:block"></div>
            </motion.h1>
            
            <motion.div 
              className="max-w-xl sm:max-w-3xl mt-6 mb-10 sm:pr-10 mx-auto text-center sm:text-left text-white/90 font-light"
            >
              <div className="relative">
                <p className="prose text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-300 mb-2">
                  <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -left-6 top-0 hidden md:block">"</span>
                  Senior QA Engineer & Developer with a passion for creating innovative solutions and delivering high-quality software.
                  <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -right-6 bottom-0 hidden md:block">"</span>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center sm:justify-start mb-16"
              variants={buttonContainerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('projects')}
                  variant="primary"
                  className="px-8 py-3.5 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="inline-block">View Projects</span>
                    <svg className="ml-2 inline-block relative z-10 group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="13 17 18 12 13 7"></polyline>
                      <polyline points="6 17 11 12 6 7"></polyline>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/20 to-[#4BB4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  variant="secondary"
                  className="px-8 py-3.5 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="inline-block">Contact Me</span>
                    <svg className="ml-2 inline-block relative z-10 group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/10 to-[#4BB4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Enhanced floating cards with tech skills */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto sm:mx-0"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group"
                variants={floatingCardVariants}
                whileHover="hover"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                {/* Card background decorative element */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#4BB4FF]/20 to-transparent blur-md"></div>
                <div className="absolute -top-2 -left-2 w-2 h-10 bg-gradient-to-b from-[#4BB4FF] to-transparent rounded-full opacity-40"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4BB4FF] to-[#2980B9]/70 flex items-center justify-center mr-4 shadow-lg shadow-[#4BB4FF]/10 group-hover:shadow-[#4BB4FF]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">Web Development</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">React, Next.js, TypeScript, Tailwind CSS</p>
                <div className="w-full h-[1px] bg-gradient-to-r from-[#4BB4FF]/30 via-[#4BB4FF]/10 to-transparent mt-1"></div>
              </motion.div>
              
              <motion.div 
                className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group"
                variants={floatingCardVariants}
                whileHover="hover"
                style={{ animation: "float 6s ease-in-out infinite 0.5s" }}
              >
                {/* Card background decorative element */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#8e44ad]/20 to-transparent blur-md"></div>
                <div className="absolute -top-2 -left-2 w-2 h-10 bg-gradient-to-b from-[#8e44ad] to-transparent rounded-full opacity-40"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8e44ad] to-[#8e44ad]/70 flex items-center justify-center mr-4 shadow-lg shadow-[#8e44ad]/10 group-hover:shadow-[#8e44ad]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">QA Engineering</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">Automated Testing, CI/CD, Quality Assurance</p>
                <div className="w-full h-[1px] bg-gradient-to-r from-[#8e44ad]/30 via-[#8e44ad]/10 to-transparent mt-1"></div>
              </motion.div>
              
              <motion.div 
                className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group"
                variants={floatingCardVariants}
                whileHover="hover"
                style={{ animation: "float 6s ease-in-out infinite 1s" }}
              >
                {/* Card background decorative element */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#00CED1]/20 to-transparent blur-md"></div>
                <div className="absolute -top-2 -left-2 w-2 h-10 bg-gradient-to-b from-[#00CED1] to-transparent rounded-full opacity-40"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00CED1] to-[#00CED1]/70 flex items-center justify-center mr-4 shadow-lg shadow-[#00CED1]/10 group-hover:shadow-[#00CED1]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">Analytics</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">Data Analysis, Performance Optimization, Insights</p>
                <div className="w-full h-[1px] bg-gradient-to-r from-[#00CED1]/30 via-[#00CED1]/10 to-transparent mt-1"></div>
              </motion.div>
            </motion.div>
            
            {/* Enhanced scroll indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-20 sm:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              <span className="text-xs text-gray-400 font-light mb-2 relative px-4">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-[1px] bg-[#4BB4FF]/50"></span>
                Scroll to explore
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-[1px] bg-[#4BB4FF]/50"></span>
              </span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-[#4BB4FF]/80 to-transparent" style={{ animation: "pulse 2s infinite" }}></div>
            </motion.div>
            
            {/* Desktop floating scroll indicator - new */}
            <motion.div 
              className="fixed right-10 bottom-1/2 transform translate-y-1/2 hidden lg:flex flex-col items-center z-30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-[#4BB4FF]/50 to-transparent mb-2"></div>
              <div className="rotate-90 origin-center transform translate-y-1/2 -translate-x-1/2">
                <span className="text-xs text-gray-400 font-light whitespace-nowrap">Scroll to explore</span>
              </div>
              <div className="h-20 w-[1px] bg-gradient-to-b from-[#4BB4FF]/50 via-transparent to-transparent mt-2"></div>
            </motion.div>
            
            {/* Social media links - new */}
            <motion.div 
              className="fixed left-10 bottom-10 z-30 hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <div className="flex flex-col space-y-4 items-center">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <div className="h-20 w-[1px] bg-gradient-to-b from-[#4BB4FF]/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}; 