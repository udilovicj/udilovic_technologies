"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AboutSection = () => {
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
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First orb - blue gradient */}
        <motion.div
          className="absolute top-0 left-0 w-[55vw] h-[55vw] bg-gradient-to-br from-[#4BB4FF]/20 to-[#4BB4FF]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5, 
            x: mousePosition.x * 20,
            y: mousePosition.y * 20
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Second orb - purple gradient */}
        <motion.div
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#9747FF]/15 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.4, 
            x: -mousePosition.x * 20,
            y: -mousePosition.y * 20
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Additional subtle accent orb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#4BB4FF]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
        />
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wide">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#4BB4FF] to-[#9747FF] mx-auto"></div>
        </motion.div>
        
        {/* Main about content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Left column - personal bio */}
          <motion.div 
            className="lg:col-span-2 order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
              
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-6"></div>
                <h3 className="text-xl font-light tracking-wide">QA Engineer & Developer</h3>
              </div>
              
              <div className="space-y-5 text-gray-300 font-light leading-relaxed">
                <p>
                  I'm Jovan Udilović, a Senior QA Engineer KOJI VOLI JELENU BOGOSAVLJEV at Testronic Labs and a Software Engineering student at Singidunum University, currently completing my bachelor's degree with plans to pursue a master's.
                </p>
                
                <p>
                  My journey in technology began early—I've been coding since I was 11 years old. Throughout the years, I've worked with numerous programming languages and developed a diverse portfolio of projects, giving me a comprehensive understanding of software development from both technical and quality assurance perspectives.
                </p>
                
                <p>
                  While I excel in ensuring software quality during the day, I'm also passionate about creating custom web applications. I'm currently open to freelance opportunities, where I can leverage my expertise to build dedicated web solutions tailored to your specific requirements and business needs.
                </p>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-3">
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse"></div>
                  <span className="text-xs font-light tracking-wider text-gray-300 group-hover:text-white/90 transition-colors">Available for freelance</span>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2980B9] rounded-full group-hover:animate-pulse"></div>
                  <span className="text-xs font-light tracking-wider text-gray-300 group-hover:text-white/90 transition-colors">Senior QA Engineer @ Testronic</span>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:animate-pulse"></div>
                  <span className="text-xs font-light tracking-wider text-gray-300 group-hover:text-white/90 transition-colors">Software Engineering Student</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - skills */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 sticky top-20 relative group">
              {/* Subtle accent line */}
              <div className="absolute top-0 right-0 w-0 h-1 bg-gradient-to-l from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
              
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-6"></div>
                <h3 className="text-xl font-light tracking-wide">Skills & Expertise</h3>
              </div>
              
              <div className="space-y-4">
                {["Frontend", "Backend", "Mobile", "DevOps", "Testing"].map((category) => (
                  <div key={category} className="rounded-xl overflow-hidden backdrop-blur-sm bg-black/20 border border-white/10 hover:border-[#2980B9]/40 transition-all duration-300">
                    <div className="px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#4BB4FF]">
                          {category === "Frontend" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="16 18 22 12 16 6"></polyline>
                              <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                          )}
                          {category === "Backend" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                              <line x1="6" y1="6" x2="6.01" y2="6"></line>
                              <line x1="6" y1="18" x2="6.01" y2="18"></line>
                            </svg>
                          )}
                          {category === "Testing" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 3.23A9.97 9.97 0 0 0 8 6v7h5"></path>
                              <path d="M18 20a9.97 9.97 0 0 0 5-8.92"></path>
                              <path d="M5 19a9.97 9.97 0 0 0 8.5 5"></path>
                              <circle cx="10" cy="8" r="2"></circle>
                            </svg>
                          )}
                          {category === "DevOps" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3a9 9 0 1 0 9 9"></path>
                              <path d="M12 3v9l9 3"></path>
                            </svg>
                          )}
                          {category === "Mobile" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                          )}
                        </span>
                        <h4 className="font-light">{category}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Work philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-5 -right-5 w-12 h-12 border border-[#2980B9]/15 rounded-full hidden lg:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            ></motion.div>
            
            <motion.div 
              className="absolute -bottom-8 -left-8 w-20 h-20 border border-[#2980B9]/10 rounded-full hidden lg:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1 }}
            ></motion.div>
              
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-6"></div>
              <h3 className="text-xl font-light tracking-wide">Work Philosophy</h3>
            </div>
            
            <blockquote className="text-gray-300 font-light italic border-l-2 border-[#2980B9]/50 pl-4 max-w-2xl mx-auto">
              "There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Everything exists. Seek nothing outside of yourself."
              <footer className="text-right text-sm text-gray-400 mt-2">- Musashi Miyamoto</footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 