"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageBackground } from "./PageBackground";

export const AboutWrapper = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  
  // Animation variants with optimized properties
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
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Skill details mapping with proficiency levels
  const skillDetails: Record<string, Array<{name: string, proficiency: string, level: number}>> = {
    "Frontend": [
      { name: "React", proficiency: "Expert", level: 90 },
      { name: "Next.js", proficiency: "Advanced", level: 85 },
      { name: "TypeScript", proficiency: "Advanced", level: 80 },
      { name: "HTML/CSS", proficiency: "Expert", level: 95 },
      { name: "Tailwind CSS", proficiency: "Expert", level: 90 }
    ],
    "Backend": [
      { name: "Node.js", proficiency: "Advanced", level: 85 },
      { name: "Express", proficiency: "Advanced", level: 80 },
      { name: "Python", proficiency: "Intermediate", level: 75 },
      { name: "Java", proficiency: "Intermediate", level: 70 },
      { name: "RESTful APIs", proficiency: "Advanced", level: 85 }
    ],
    "Mobile": [
      { name: "React Native", proficiency: "Advanced", level: 80 },
      { name: "Android", proficiency: "Intermediate", level: 65 },
      { name: "Responsive Design", proficiency: "Expert", level: 90 },
      { name: "Flutter", proficiency: "Beginner", level: 60 }
    ],
    "DevOps": [
      { name: "Docker", proficiency: "Intermediate", level: 75 },
      { name: "GitHub Actions", proficiency: "Advanced", level: 80 },
      { name: "CI/CD", proficiency: "Intermediate", level: 75 },
      { name: "AWS", proficiency: "Intermediate", level: 70 },
      { name: "Vercel", proficiency: "Advanced", level: 85 }
    ],
    "Testing": [
      { name: "Jest", proficiency: "Advanced", level: 85 },
      { name: "RTL", proficiency: "Advanced", level: 80 },
      { name: "Selenium", proficiency: "Expert", level: 90 },
      { name: "Cypress", proficiency: "Advanced", level: 85 },
      { name: "Manual Testing", proficiency: "Expert", level: 95 },
      { name: "Test Planning", proficiency: "Expert", level: 90 }
    ]
  };
  
  return (
    <section id="about">
      <motion.section
        className="min-h-screen relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <PageBackground mousePosition={mousePosition} />
        
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
              className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light sm:leading-relaxed mb-16 text-center sm:text-left max-w-3xl relative"
              variants={itemVariants}
            >
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -left-6 top-0 hidden md:block">"</span>
              A passionate developer with a love for creating beautiful, functional web experiences and delivering high-quality software.
              <span className="text-[#4BB4FF] opacity-40 text-2xl absolute -right-6 bottom-0 hidden md:block">"</span>
            </motion.p>

            {/* Main about content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 mb-20">
              {/* Left column - personal bio */}
              <motion.div 
                className="lg:col-span-2 order-2 lg:order-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                  
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="flex-shrink-0 w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 sm:mr-6"></div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide">QA Engineer & Developer</h3>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5 text-gray-300 font-light leading-relaxed">
                    <p>
                      I'm Jovan Udilović, a Senior QA Engineer at Testronic Labs and a Software Engineering student at Singidunum University, currently completing my bachelor's degree with plans to pursue a master's.
                    </p>
                    
                    <p>
                      My journey in technology began early—I've been coding since I was 11 years old. Throughout the years, I've worked with numerous programming languages and developed a diverse portfolio of projects, giving me a comprehensive understanding of software development from both technical and quality assurance perspectives.
                    </p>
                    
                    <p>
                      While I excel in ensuring software quality during the day, I'm also passionate about creating custom web applications. I'm currently open to freelance opportunities, where I can leverage my expertise to build dedicated web solutions tailored to your specific requirements and business needs.
                    </p>
                  </div>
                  
                  <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
                      <div className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse"></div>
                      <span className="text-xs font-light tracking-wider text-gray-300 group-hover:text-white/90 transition-colors">Available for freelance</span>
                    </div>
                    
                    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
                      <div className="w-2 h-2 bg-[#2980B9] rounded-full group-hover:animate-pulse"></div>
                      <span className="text-xs font-light tracking-wider text-gray-300 group-hover:text-white/90 transition-colors">Senior QA Engineer @ Testronic</span>
                    </div>
                    
                    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 hover:border-[#2980B9]/40 hover:bg-black/30 transition-all duration-300 group">
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
                <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group mb-8 lg:mb-0 lg:sticky lg:top-20">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 right-0 w-0 h-1 bg-gradient-to-l from-[#2980B9] to-[#1e6091] group-hover:w-full transition-all duration-700 rounded-t-2xl"></div>
                  
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="flex-shrink-0 w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 sm:mr-6"></div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide">Skills & Expertise</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {["Frontend", "Backend", "Mobile", "DevOps", "Testing"].map((category) => (
                      <div key={category} className="rounded-xl overflow-hidden backdrop-blur-sm bg-black/20 border border-white/10 hover:border-[#2980B9]/40 transition-all duration-300">
                        <button 
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between"
                          onClick={() => setExpandedSkill(expandedSkill === category ? null : category)}
                        >
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
                          <div className="text-[#4BB4FF]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`w-4 h-4 transition-transform duration-300 ${expandedSkill === category ? 'rotate-180' : ''}`} 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </button>
                        
                        <AnimatePresence mode="wait">
                          {expandedSkill === category && (
                            <motion.div 
                              className="px-5 py-3 border-t border-white/10 bg-black/30"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ul className="space-y-4">
                                {skillDetails[category].map((skill, index) => (
                                  <li key={index} className="text-sm text-gray-300 font-light">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#2980B9]/60"></span>
                                        {skill.name}
                                      </span>
                                      <span className={`text-xs ${
                                        skill.proficiency === "Expert" ? "text-green-400" :
                                        skill.proficiency === "Advanced" ? "text-[#4BB4FF]" :
                                        skill.proficiency === "Intermediate" ? "text-yellow-400" :
                                        "text-orange-400"
                                      }`}>
                                        {skill.proficiency}
                                      </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                                      <motion.div 
                                        className={`h-full rounded-full ${
                                          skill.proficiency === "Expert" ? "bg-gradient-to-r from-green-500/80 to-green-400" :
                                          skill.proficiency === "Advanced" ? "bg-gradient-to-r from-[#2980B9] to-[#4BB4FF]" :
                                          skill.proficiency === "Intermediate" ? "bg-gradient-to-r from-yellow-500/80 to-yellow-400" :
                                          "bg-gradient-to-r from-orange-500/80 to-orange-400"
                                        }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ 
                                          duration: 0.7,
                                          delay: 0.05 * index,
                                          ease: "easeOut"
                                        }}
                                      ></motion.div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
              className="mt-8 sm:mt-16 max-w-4xl mx-auto"
            >
              <div className="backdrop-filter backdrop-blur-md bg-gradient-to-br from-white/5 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(75,180,255,0.15)] transition-all duration-500 relative group">
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
                
                {/* Mobile decorative elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 border border-[#2980B9]/15 rounded-full lg:hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                ></motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-10 h-10 border border-[#2980B9]/10 rounded-full lg:hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 1 }}
                ></motion.div>
                  
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-[#4BB4FF] to-[#4BB4FF]/50 rounded-full mr-4 sm:mr-6"></div>
                  <h3 className="text-lg sm:text-xl font-light tracking-wide">Work Philosophy</h3>
                </div>
                
                <blockquote className="text-gray-300 font-light italic border-l-2 border-[#2980B9]/50 pl-4 max-w-2xl mx-auto">
                  "There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Everything exists. Seek nothing outside of yourself."
                  <footer className="text-right text-sm text-gray-400 mt-2">- Musashi Miyamoto</footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}; 