"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { PageBackground } from "../components/PageBackground";
import { AnimationKeyframes } from "../components/AnimationKeyframes";

export default function About() {
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <AnimationKeyframes />
      
      <ScrollProgressBar />
      <Navigation navItems={navItems} />
      
      <motion.section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ opacity, y }}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <PageBackground mousePosition={mousePosition} />
        
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
                    About Me
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
              My <span className="relative inline-block">
                <span className="gradient-text font-normal relative">
                  Journey
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
            
            <motion.p 
              className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light sm:leading-relaxed mb-10 text-center sm:text-left max-w-3xl relative"
              variants={itemVariants}
            >
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -left-6 top-0 hidden md:block">"</span>
              A passionate developer with a love for creating beautiful, functional web experiences and delivering high-quality software.
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -right-6 bottom-0 hidden md:block">"</span>
            </motion.p>
          </div>
        </div>
      </motion.section>
      
      {/* About content */}
      <section className="py-20 relative z-10 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              {/* Background gradients */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-[#4BB4FF]/30 to-transparent rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-[#8e44ad]/30 to-transparent rounded-full blur-3xl opacity-20"></div>
              
              <div className="prose prose-lg prose-invert max-w-none relative z-10">
                <p>
                  I'm a passionate developer with a love for creating beautiful, functional web experiences. 
                  My journey in tech began several years ago when I discovered the power of coding to bring creative ideas to life.
                </p>
                <p>
                  With expertise in modern frontend frameworks and a keen eye for design, I build applications 
                  that not only work flawlessly but also provide compelling user experiences.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or seeking inspiration in art, music, and nature.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"].map((skill) => (
                <div 
                  key={skill}
                  className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors relative overflow-hidden group"
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#4BB4FF]/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 