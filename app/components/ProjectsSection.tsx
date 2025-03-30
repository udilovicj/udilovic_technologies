"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "./Typography";
import { SparklesCore } from "./SparklesCore";

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: "UI" | "E-commerce" | "Frontend" | "Backend" | "Application" | "Tested";
  image: string;
  technologies: Technology[];
  demoUrl?: string;
  codeUrl?: string;
}

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Project categories for filter
  const categories = ["All", "UI", "E-commerce", "Frontend", "Backend", "Application", "Tested"];
  
  // Project data
  const projects: Project[] = [
    {
      id: "tiny-hoopers",
      title: "Tiny Hoopers",
      description: "QA Lead associated at Tiny Hoopers, where I created testing environments and plans from scratch.",
      category: "Tested",
      image: "/tiny hoopers.png",
      technologies: [
        { name: "QA Lead", color: "bg-purple-500" },
        { name: "Test Planning", color: "bg-green-500" },
        { name: "Envrinoment Setup", color: "bg-blue-500" }
      ],
      demoUrl: "https://www.tinyhoopers.com/"
    },
    {
      id: "tcc",
      title: "The Colorful Creature",
      description: "QA Tester for a indie developer Infiland, where I was responsible for testing the game and providing feedback to the developer.",
      category: "Tested",
      image: "/tcc.jpg",
      technologies: [
        { name: "Manual Testing", color: "bg-purple-500" },
        { name: "Linux compactibility", color: "bg-green-500" },
        { name: "Unit testing", color: "bg-blue-500" }
      ],
      demoUrl: "https://store.steampowered.com/app/1651680/The_Colorful_Creature/"
    },
    {
      id: "app",
      title: "Asteroids ++",
      description: "QA Tester for Infiland once again, for his latest Steam game Asteroids ++",
      category: "Tested",
      image: "/asteroids.jpg",
      technologies: [
        { name: "Manual Testing", color: "bg-purple-500" },
        { name: "Linux compactibility", color: "bg-green-500" },
        { name: "Unit testing", color: "bg-blue-500" }
      ],
      demoUrl: "http://store.steampowered.com/app/2407300/Asteroids/"
    }
  ];

  // Use Intersection Observer to detect when the section is visible
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to keep observing
          observer.disconnect();
        }
      },
      {
        // Start loading when the section is 10% visible
        threshold: 0.1,
        rootMargin: "0px",
      }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Preload all images to prevent flicker
  useEffect(() => {
    if (isVisible) {
      projects.forEach(project => {
        if (project.image) {
          const img = new Image();
          img.src = project.image;
        }
      });
    }
  }, [isVisible, projects]);
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-visible">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full absolute">
          <SparklesCore
            id="projects-sparkles"
            background="transparent"
            minSize={0.5}
            maxSize={1.0}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#4BB4FF"
            speed={0.15}
            particleSize={1.2}
          />
        </div>

        {/* First orb - blue gradient */}
        <motion.div
          className="absolute top-1/4 right-0 w-[45vw] h-[45vw] bg-gradient-to-br from-[#2980B9]/20 to-[#2980B9]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        />
        
        {/* Second orb - blue gradient */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#2980B9]/15 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />

        {/* Accent lines - using the same color as in Hero section */}
        <div className="absolute left-0 top-1/4 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/20 to-transparent" />
        <div className="absolute right-0 bottom-1/3 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/20 to-transparent" />
      </div>

      {/* Subtle grid overlay - with same opacity as global background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      {/* Consistent background overlay - very light to match global background */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-block relative mb-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              Featured <span className="gradient-text font-normal">Projects</span>
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50"></div>
          </div>
          <Text className="mt-6 text-center mx-auto max-w-2xl text-gray-400/80">
            A showcase of my professional work, personal projects, and testing expertise
          </Text>
        </motion.div>
        
        {/* Category filter - Desktop version */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="hidden sm:flex justify-center mb-16 relative"
        >
          <div className="backdrop-blur-md bg-black/30 rounded-full px-1.5 py-1.5 border border-white/10 shadow-lg relative">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                  activeCategory === category 
                    ? "text-white z-10" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="category-background"
                    className="absolute inset-0 bg-gradient-to-r from-[#2980B9]/80 to-[#2980B9]/40 rounded-full shadow-lg border border-[#2980B9]/40"
                    initial={false}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Mobile dropdown selector */}
        <div className="sm:hidden mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-xs mx-auto backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-1 h-8 bg-gradient-to-b from-[#2980B9] to-[#2980B9]/30 rounded-full mr-4"></div>
              <label className="text-sm text-gray-300 font-light mr-3 whitespace-nowrap">Filter projects:</label>
              <div className="relative flex-1">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg py-2.5 px-4 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2980B9]/50 focus:border-transparent font-light"
                  style={{ backgroundImage: 'none' }}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category} className="bg-[#18181b]">{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-4 text-[#2980B9]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-center text-gray-400 font-light">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            </div>
          </motion.div>
        </div>
        
        {/* Projects grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative auto-rows-fr">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
                }}
                className="group h-full flex"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative flex flex-col h-full backdrop-blur-md bg-black/25 rounded-2xl overflow-hidden border border-white/5 shadow-xl group-hover:shadow-[0_0_35px_rgba(41,128,185,0.2)] transition-all duration-500">
                  {/* Project image */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0 w-full">
                    {/* Top gradient */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
                    
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    
                    {/* Image background */}
                    <div className="absolute inset-0 bg-black/30 z-0"></div>
                    
                    {project.id === "tiny-hoopers" ? (
                      <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-auto h-auto max-w-[85%] max-h-[85%] object-contain transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 z-5"
                      />
                    )}
                    
                    {/* Project category badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 text-xs font-light rounded-full backdrop-blur-md bg-black/40 border border-[#2980B9]/30 text-white/90">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 pt-5 flex flex-col flex-grow">
                    {/* Accent line */}
                    <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#2980B9]/30 to-transparent"></div>
                    
                    {/* Project title */}
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#2980B9] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Project description */}
                    <p className="text-sm text-gray-300 font-light mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2.5 py-1 text-xs font-light rounded-full backdrop-blur-md bg-black/40 border border-[#2980B9]/20 text-white/90"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project links */}
                    <div className="flex gap-3 mt-auto">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative px-4 py-2.5 w-full rounded-lg overflow-hidden inline-flex items-center justify-center"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9] to-[#1e6091] opacity-90 rounded-lg group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                          <span className="relative z-10 flex items-center justify-center text-xs uppercase tracking-wider font-light">
                            View Live
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </span>
                        </a>
                      )}
                      
                      {project.codeUrl && (
                        <a 
                          href={project.codeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative px-4 py-2.5 w-full rounded-lg text-center text-white inline-flex items-center justify-center"
                        >
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg group-hover:bg-black/50 group-hover:border-[#2980B9]/30 transition-all duration-300"></div>
                          <span className="relative z-10 flex items-center justify-center text-xs uppercase tracking-wider font-light">
                            View Code
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 20l4-16"></path>
                              <path d="M15 4l5 4-5 4"></path>
                              <path d="M4 12l5 4-5 4"></path>
                            </svg>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover effects */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none border-2 border-[#2980B9]/0 rounded-2xl"
                    animate={{ 
                      borderColor: hoveredProject === project.id ? 'rgba(41, 128, 185, 0.3)' : 'rgba(41, 128, 185, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        
        {/* Message when no projects match filter */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-8 max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[#2980B9]/10 flex items-center justify-center border border-[#2980B9]/20 mx-auto mb-4">
              <svg className="w-8 h-8 text-[#2980B9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-2">No projects found</h3>
            <p className="text-gray-400 font-light mb-6">
              No projects match the selected category.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-[#2980B9] font-light text-sm hover:underline focus:outline-none group flex items-center justify-center mx-auto"
            >
              <span>View all projects instead</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </motion.div>
        )}
        
        {/* View more projects button - Only shown if there are more than 6 projects */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <button className="group relative px-8 py-3.5 rounded-xl text-white font-light tracking-wider transition-all duration-300 inline-flex items-center justify-center overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#2980B9] to-[#1e6091] opacity-90 rounded-xl group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              <span className="flex items-center justify-center gap-2 uppercase text-sm relative z-10">
                View More Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}; 