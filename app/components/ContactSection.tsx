"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Text } from "./Typography";
import { Button } from "./Button";

export const ContactSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Heavily throttle mouse move event for performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({
            x: e.clientX / window.innerWidth - 0.5,
            y: e.clientY / window.innerHeight - 0.5
          });
          timeoutId = null;
        }, 100); // Update less frequently
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First orb - blue gradient */}
        <motion.div
          className="absolute top-0 right-0 w-[55vw] h-[55vw] bg-gradient-to-br from-[#4BB4FF]/20 to-[#4BB4FF]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5, 
            x: mousePosition.x * 20,
            y: mousePosition.y * 20
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Second orb - subtle gradient */}
        <motion.div
          className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#2980B9]/15 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.4, 
            x: -mousePosition.x * 20,
            y: -mousePosition.y * 20
          }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wide">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/70 mx-auto"></div>
        </motion.div>
        
        <div className="relative">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/4 -right-12 w-16 h-16 border border-[#2980B9]/15 rounded-full hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 1 }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/4 -left-16 w-24 h-24 border border-[#2980B9]/10 rounded-full hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7, duration: 1 }}
          ></motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 h-full"
            >
              <div className="h-full backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
                {/* Subtle accent line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                
                <div className="flex items-center mb-8">
                  <div className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-6"></div>
                  <h3 className="text-xl font-light tracking-wide">Let's Connect</h3>
                </div>
                
                <Text className="mb-10 text-base leading-relaxed font-light text-gray-300">
                  Have a project in mind or want to chat about potential collaboration? 
                  Feel free to reach out and I'll get back to you as soon as possible.
                </Text>
                
                {/* Enhanced contact info items */}
                <div className="space-y-6">
                  <a href="mailto:udilovicj@yahoo.com" className="flex items-center space-x-5 group">
                    <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-[#2980B9]/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/50 group-hover:bg-[#2980B9]/20 transition-all duration-300 relative overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2980B9] relative z-10">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/0 to-[#2980B9]/0 group-hover:from-[#2980B9]/10 group-hover:to-[#2980B9]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-light">Email</p>
                      <p className="text-white/90 group-hover:text-[#2980B9] transition-colors font-light">udilovicj@yahoo.com</p>
                    </div>
                  </a>
                </div>
                
                <div className="pt-8 mt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-5 font-light">Connect with me on</p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/udilovicj" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <svg height="22" width="22" aria-hidden="true" viewBox="0 0 16 16" version="1.1" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10">
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
                      <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10">
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
                      <div className="w-12 h-12 rounded-xl backdrop-blur-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#2980B9]/70 group-hover:bg-[#2980B9]/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#2980B9] transition-colors relative z-10">
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
              <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
                {/* Subtle accent line */}
                <div className="absolute top-0 right-0 w-0 h-1 bg-gradient-to-l from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                
                <div className="flex items-center mb-8">
                  <div className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-6"></div>
                  <h3 className="text-xl font-light tracking-wide">Send me a message</h3>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-light text-gray-400">
                        Name
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300"
                          placeholder="Your name"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-light text-gray-400">
                        Email
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300"
                          placeholder="Your email"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-light text-gray-400">
                      Subject
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300"
                        placeholder="Subject"
                      />
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-light text-gray-400">
                      Message
                    </label>
                    <div className="relative group">
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-gray-800 text-[#f5f5f7] focus:border-[#2980B9]/50 focus:outline-none focus:ring-1 focus:ring-[#2980B9]/30 rounded-xl font-light transition-all duration-300 resize-none"
                        placeholder="Your message"
                      ></textarea>
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50 group-focus-within:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      className="w-full sm:w-auto relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="inline-block">Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transform group-hover:translate-x-1 transition-transform">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/20 to-[#4BB4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 