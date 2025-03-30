"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { Button } from "../components/Button";
import { PageBackground } from "../components/PageBackground";
import { AnimationKeyframes } from "../components/AnimationKeyframes";

export default function Contact() {
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
      
      <PageBackground mousePosition={mousePosition} />
      
      <motion.section
        id="contact"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ opacity, y }}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
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
                    Get In Touch
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
              Let's <span className="relative inline-block">
                <span className="gradient-text font-normal relative">
                  Connect
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
              Have a question or want to work together? I'd love to hear from you and discuss how we can collaborate.
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -right-6 bottom-0 hidden md:block">"</span>
            </motion.p>
          </div>
        </div>
      </motion.section>
      
      {/* Contact form section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              {/* Form background gradients */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-[#4BB4FF]/30 to-transparent rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-[#8e44ad]/30 to-transparent rounded-full blur-3xl opacity-20"></div>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-[#4BB4FF] focus:ring-[#4BB4FF]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-[#4BB4FF] focus:ring-[#4BB4FF]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-[#4BB4FF] focus:ring-[#4BB4FF]"
                    placeholder="How can I help you?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="block w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-[#4BB4FF] focus:ring-[#4BB4FF]"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <div>
                  <Button 
                    variant="primary" 
                    className="w-full relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="inline-block">Send Message</span>
                      <svg className="ml-2 inline-block relative z-10 group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/20 to-[#4BB4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact details */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#4BB4FF]/20 to-transparent blur-md"></div>
                <div className="absolute -top-2 -left-2 w-2 h-10 bg-gradient-to-b from-[#4BB4FF] to-transparent rounded-full opacity-40"></div>
                
                <h3 className="text-xl font-medium text-white mb-4">Email</h3>
                <a href="mailto:contact@example.com" className="text-[#4BB4FF] hover:underline">udilovic@yahoo.com</a>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#8e44ad]/20 to-transparent blur-md"></div>
                <div className="absolute -top-2 -left-2 w-2 h-10 bg-gradient-to-b from-[#8e44ad] to-transparent rounded-full opacity-40"></div>
                
                <h3 className="text-xl font-medium text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4BB4FF] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 