"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageBackground } from "./PageBackground";
import { Button } from "./Button";
import { Text } from "./Typography";

export const ContactWrapper = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Animation variants with optimized performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  // Mouse parallax effect for background elements - optimized
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only update position every other frame
      window.requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <section id="contact">
      <motion.section
        className="min-h-screen relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <PageBackground mousePosition={mousePosition} />
        
        {/* Subtle grid overlay with enhanced opacity */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none"></div>
        
        {/* Content */}
        <div className="container-wide mx-auto px-6 relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
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
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#4BB4FF] to-[#4BB4FF]/50 block"
                  style={{
                    animation: "pulse 3s infinite"
                  }}
                ></div>
              </span>
              
              {/* New decorative element */}
              <div className="absolute -right-10 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#4BB4FF]/30 to-transparent hidden lg:block"></div>
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light sm:leading-relaxed mb-10 sm:mb-16 text-center sm:text-left max-w-3xl relative"
              variants={itemVariants}
            >
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -left-6 top-0 hidden md:block">"</span>
              Have a question or want to work together? I'd love to hear from you and discuss how we can collaborate.
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -right-6 bottom-0 hidden md:block">"</span>
            </motion.p>

            {/* Contact form section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 h-full"
              >
                <div className="h-full backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                  
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="flex-shrink-0 w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 sm:mr-6"></div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide">Let's Connect</h3>
                  </div>
                  
                  <Text className="mb-8 sm:mb-10 text-base leading-relaxed font-light text-gray-300">
                    Have a project in mind or want to chat about potential collaboration? 
                    Feel free to reach out and I'll get back to you as soon as possible.
                  </Text>
                  
                  {/* Enhanced contact info items */}
                  <div className="space-y-6">
                    <a href="mailto:udilovicj@yahoo.com" className="flex items-center space-x-4 sm:space-x-5 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-sm bg-[#2980B9]/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/50 group-hover:bg-[#2980B9]/20 transition-all duration-300 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2980B9] relative z-10 sm:w-5 sm:h-5">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/0 to-[#2980B9]/0 group-hover:from-[#2980B9]/10 group-hover:to-[#2980B9]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-1 font-light">Email</p>
                        <p className="text-sm sm:text-base text-white/90 group-hover:text-[#2980B9] transition-colors font-light">udilovicj@yahoo.com</p>
                      </div>
                    </a>
                  </div>
                  
                  <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5 font-light">Connect with me on</p>
                    <div className="flex space-x-3 sm:space-x-4">
                      <a 
                        href="https://github.com/udilovicj" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                          <svg height="18" width="18" aria-hidden="true" viewBox="0 0 16 16" version="1.1" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10 sm:w-[22px] sm:h-[22px]">
                            <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                          </svg>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/0 to-[#2980B9]/0 group-hover:from-[#2980B9]/10 group-hover:to-[#2980B9]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/jovanudilovic/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10 sm:w-5 sm:h-5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/0 to-[#2980B9]/0 group-hover:from-[#2980B9]/10 group-hover:to-[#2980B9]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>
                      </a>
                      <a 
                        href="mailto:udilovicj@yahoo.com" 
                        className="group"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10 sm:w-5 sm:h-5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/0 to-[#2980B9]/0 group-hover:from-[#2980B9]/10 group-hover:to-[#2980B9]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7"
              >
                <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 right-0 w-0 h-1 bg-gradient-to-l from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                  
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="flex-shrink-0 w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 sm:mr-6"></div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide">Send me a message</h3>
                  </div>
                  
                  {/* Mobile decorative elements */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-8 h-8 border border-[#2980B9]/15 rounded-full lg:hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                  ></motion.div>
                  
                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="name" className="block text-xs sm:text-sm font-light text-gray-400">
                          Name
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            id="name"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300 text-sm sm:text-base"
                            placeholder="Your name"
                          />
                          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="email" className="block text-xs sm:text-sm font-light text-gray-400">
                          Email
                        </label>
                        <div className="relative group">
                          <input
                            type="email"
                            id="email"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300 text-sm sm:text-base"
                            placeholder="Your email"
                          />
                          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-light text-gray-400">
                        Subject
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300 text-sm sm:text-base"
                          placeholder="Subject"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="message" className="block text-xs sm:text-sm font-light text-gray-400">
                        Message
                      </label>
                      <div className="relative group">
                        <textarea
                          id="message"
                          rows={6}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light resize-none transition-all duration-300 text-sm sm:text-base"
                          placeholder="Your message"
                        ></textarea>
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full sm:w-auto px-6 py-3 mt-2 rounded-xl overflow-hidden inline-flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9] to-[#1e6091] opacity-90 rounded-xl group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-sm font-light tracking-wider">
                          Send Message
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}; 