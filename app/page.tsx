"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom components
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProjectsWrapper } from "./components/ProjectsWrapper";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import AceternityBackground from "./components/AceternityBackground";
import { Logo } from "./components/Logo";
import { Text } from "./components/Typography";
import { BackgroundBeams } from "./components/BackgroundBeams";
import { AboutWrapper } from "./components/AboutWrapper";
import { ContactWrapper } from "./components/ContactWrapper";

export default function Home() {
  const [splashScreenDone, setSplashScreenDone] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set isLoaded immediately
    setIsLoaded(true);
    
    // The splash screen now handles its own timing and will call setSplashScreenDone
    // when it's finished with the animations
    
    // Always scroll to top when page loads if no hash
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }
    
    // Prevent URL hash-based scrolling only on initial load
    const preventInitialScroll = () => {
      // Only prevent initial scroll if we're at the hero section
      if (window.location.hash === '#hero') {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "auto"
          });
        }, 0);
      }
    };
    
    window.addEventListener('load', preventInitialScroll);
    
    // Handle hash change for section navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash === '#hero') {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else if (hash) {
        // For other sections, find the element and scroll to it smoothly
        const element = document.querySelector(hash);
        if (element) {
          // Add a small delay to ensure UI updates first
          setTimeout(() => {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }, 50);
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Execute hash navigation on initial load if there's a hash
    if (window.location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(handleHashChange, 100);
    }
    
    return () => {
      window.removeEventListener('load', preventInitialScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Navigation items
  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  // Splash screen component
  const SplashScreen = () => {
    const [stage, setStage] = useState("welcome");
    const [typedText, setTypedText] = useState<Array<{text: string, color: string}>>([]);
    const [typingComplete, setTypingComplete] = useState(false);
    const [showLaunchPrompt, setShowLaunchPrompt] = useState(false);
    const [launching, setLaunching] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    
    // Updated welcome messages with more technical and modern feel
    const welcome = [
      "Initializing Interface...",
      "Configuring Environment Variables...",
      "Establishing Secure Connection..."
    ];
    
    // More technical and modern terminal output
    const terminalOutput = [
      { text: "> ", delay: 300, color: "text-[#4BB4FF]" },
      { text: "portfolio.init()", delay: 300, color: "text-[#f5f5f7]" },
      { text: "\n", delay: 200, color: "text-gray-400" },
      { text: "[ ", delay: 200, color: "text-gray-400" },
      { text: "info", delay: 200, color: "text-[#4BB4FF]" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Loading core modules and dependencies", delay: 400, color: "text-gray-300" },
      { text: "\n[ ", delay: 200, color: "text-gray-400" },
      { text: "info", delay: 200, color: "text-[#4BB4FF]" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Scanning component registry", delay: 400, color: "text-gray-300" },
      { text: "\n[ ", delay: 200, color: "text-gray-400" },
      { text: "info", delay: 200, color: "text-[#4BB4FF]" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Creating virtual DOM tree", delay: 400, color: "text-gray-300" },
      { text: "\n\n", delay: 300, color: "text-gray-400" },
      { text: "[ ", delay: 200, color: "text-gray-400" },
      { text: "success", delay: 200, color: "text-green-400" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Components loaded: ", delay: 400, color: "text-gray-300" },
      { text: "Navigator, Hero, Projects, About, Contact", delay: 300, color: "text-[#9D70FF]" },
      { text: "\n[ ", delay: 200, color: "text-gray-400" },
      { text: "success", delay: 200, color: "text-green-400" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Effects system initialized", delay: 400, color: "text-gray-300" },
      { text: "\n[ ", delay: 200, color: "text-gray-400" },
      { text: "success", delay: 200, color: "text-green-400" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Client-side rendering enabled", delay: 400, color: "text-gray-300" },
      { text: "\n\n", delay: 300, color: "text-gray-400" },
      { text: "[ ", delay: 200, color: "text-gray-400" },
      { text: "system", delay: 200, color: "text-[#4BB4FF]" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Optimizing visual pipeline", delay: 300, color: "text-gray-300" },
      { text: "\n[ ", delay: 200, color: "text-gray-400" },
      { text: "system", delay: 200, color: "text-[#4BB4FF]" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Finalizing state management", delay: 300, color: "text-gray-300" },
      { text: "\n\n", delay: 300, color: "text-gray-400" },
      { text: "[ ", delay: 200, color: "text-gray-400" },
      { text: "complete", delay: 200, color: "text-green-400" },
      { text: " ] ", delay: 200, color: "text-gray-400" },
      { text: "Portfolio ready", delay: 300, color: "text-white" },
      { text: "\n\n> ", delay: 300, color: "text-[#4BB4FF]" },
    ];
    
    // Auto-scroll the terminal when new content is added
    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [typedText]);
    
    useEffect(() => {
      if (stage === "welcome") {
        let index = 0;
        let welcomeText = "";
        const timer = setInterval(() => {
          if (index < welcome.length) {
            welcomeText += welcome[index] + "\n";
            setTypedText([{text: welcomeText, color: "text-gray-300"}]);
            index++;
          } else {
            clearInterval(timer);
          }
        }, 700); 
        
        return () => clearInterval(timer);
      }
      
      if (stage === "terminal") {
        let currentLine = 0;
        let timeoutId: NodeJS.Timeout;
        setTypedText([]);
        
        const typeNextLine = () => {
          if (currentLine >= terminalOutput.length) {
            setTypingComplete(true);
            setTimeout(() => {
              setShowLaunchPrompt(true);
            }, 500);
            return;
          }
          
          const { text, delay, color } = terminalOutput[currentLine];
          setTypedText(prev => [...prev, {text, color}]);
          currentLine++;
          
          timeoutId = setTimeout(typeNextLine, delay);
        };
        
        timeoutId = setTimeout(typeNextLine, 300);
        
        return () => {
          if (timeoutId) clearTimeout(timeoutId);
        };
      }
    }, [stage]);
    
    const handleLaunch = () => {
      setLaunching(true);
      
      // Delay before ending splash screen to allow logo animation
      setTimeout(() => {
        setSplashScreenDone(true);
        
        // Small additional delay for main content animation
        setTimeout(() => {
          setAnimationComplete(true);
          
          // Ensure we're at the top when the site launches
          window.scrollTo({
            top: 0,
            behavior: "auto"
          });
        }, 300);
      }, 2500);
    };
    
    return (
      <motion.div
        className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: splashScreenDone ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      >
        {/* Background elements with depth effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Static orbs with better lighting */}
          <div
            className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-to-br from-[#2980B9]/10 to-[#2980B9]/3 rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-40"
          />
          <div
            className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-gradient-to-tr from-[#2980B9]/8 to-transparent rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-30"
          />
          
          {/* Grid pattern with more visible but subtle design */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          
          {/* Thin decorative lines */}
          <div className="absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/10 to-transparent"></div>
          <div className="absolute bottom-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/10 to-transparent"></div>
        </div>
        
        {launching ? (
          // Ultra modern redesigned logo experience
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* High-tech frame */}
              <div className="absolute -inset-20 flex items-center justify-center">
                <motion.div 
                  className="w-[400px] h-[400px] rounded-full border border-[#4BB4FF]/10 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              
              {/* Animated accent rings */}
              <motion.div
                className="absolute -inset-16 border border-[#4BB4FF]/20 rounded-full"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div
                className="absolute -inset-20 border border-[#4BB4FF]/5 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* Interactive particle field */}
              <motion.div 
                className="absolute -inset-24 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#4BB4FF]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                      x: [0, Math.random() * 10 - 5, 0],
                      y: [0, Math.random() * 10 - 5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute -inset-10 bg-gradient-radial from-[#4BB4FF]/10 to-transparent rounded-full blur-xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.9, 1.05, 0.9],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              
              {/* Radial scanner effect */}
              <motion.div
                className="absolute -inset-14 border-2 border-[#4BB4FF]/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#4BB4FF]/30 to-transparent"
                  style={{ height: '200%', top: '-100%' }}
                  animate={{ top: '100%' }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                />
              </motion.div>
              
              {/* Dark backdrop */}
              <motion.div 
                className="absolute -inset-12 rounded-full bg-black/40 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              {/* The actual logo with enhanced visibility */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Logo size="splash" enhancedAnimation={true} />
              </motion.div>
            </div>
            
            {/* Advanced status display */}
            <motion.div
              className="mt-20 w-[500px] max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-black/50 backdrop-blur-md border border-[#4BB4FF]/20 rounded-xl p-5 relative overflow-hidden">
                {/* Digital scan lines */}
                <div className="absolute inset-0 bg-scan-lines opacity-5 pointer-events-none" />
                
                {/* Animated accent border */}
                <motion.div
                  className="absolute inset-0 border border-[#4BB4FF]/0 rounded-xl"
                  animate={{
                    borderColor: ['rgba(75,180,255,0.1)', 'rgba(75,180,255,0.3)', 'rgba(75,180,255,0.1)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <motion.div
                      className="w-3 h-3 bg-[#4BB4FF] rounded-full mr-3"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <p className="text-[#f5f5f7] font-light text-sm tracking-wider">SYSTEM INITIALIZATION</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-xs text-[#4BB4FF] font-light tracking-widest">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        COMPLETE
                      </motion.span>
                    </p>
                  </div>
                </div>
                
                {/* Multi-section progress display */}
                <div className="space-y-3 mb-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-light">Core Systems</span>
                      <span className="text-[#4BB4FF]">100%</span>
                    </div>
                    <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#4BB4FF] to-[#2980B9]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-light">Visual Components</span>
                      <span className="text-[#4BB4FF]">100%</span>
                    </div>
                    <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#4BB4FF] to-[#2980B9]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.9, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-light">Interface Assembly</span>
                      <span className="text-[#4BB4FF]">100%</span>
                    </div>
                    <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#4BB4FF] to-[#2980B9]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Status messages */}
                <div className="text-xs text-gray-400 font-light border-t border-white/5 pt-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Initializing user interface... Ready to launch
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl px-4">
            {stage === "welcome" ? (
              <motion.div 
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center shadow-2xl relative overflow-hidden max-w-2xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Modernized decorative elements */}
                <motion.div
                  className="absolute -inset-1 border border-white/5 rounded-xl z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#4BB4FF]/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4BB4FF]/20 to-transparent"></div>
                
                <h2 className="text-3xl md:text-4xl font-light text-[#f5f5f7] mb-6 tracking-wide">
                  <span className="bg-gradient-to-r from-[#4BB4FF] to-[#2980B9] bg-clip-text text-transparent">Jovan Udilović</span>
                </h2>
                
                {/* Modern terminal window with status bar */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden mb-6 max-w-md mx-auto">
                  {/* Terminal header */}
                  <div className="border-b border-white/10 px-4 py-2 flex items-center bg-black/70">
                    <div className="flex items-center gap-1.5 mr-4">
                      <div className="w-2.5 h-2.5 bg-red-500/90 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-yellow-500/90 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-green-500/90 rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-xs font-light flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#4BB4FF] rounded-full mr-2"></span>
                      system.initialize
                    </p>
                  </div>
                  
                  {/* Terminal content */}
                  <div className="p-4">
                    <pre className="font-mono text-gray-300 text-left whitespace-pre-line font-light text-sm">
                      {typedText.map(({text, color}, index) => (
                        <span key={index} className={color}>
                          {text}
                        </span>
                      ))}
                      <span className="inline-block w-2 h-4 bg-[#4BB4FF] ml-1 animate-pulse"></span>
                    </pre>
                  </div>
                </div>
                
                {/* Only show the button after the welcome text is fully typed */}
                {typedText.length > 0 && typedText[0].text.includes("Secure Connection") && (
                  <motion.button
                    onClick={() => setStage("terminal")}
                    className="group relative px-8 py-3 bg-transparent border border-[#4BB4FF]/30 backdrop-blur-sm rounded-md transition-all overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-[#f5f5f7] text-sm font-light">
                      Initialize System
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/20 to-[#2980B9]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <>
                <motion.div 
                  className="w-full max-w-3xl bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: showLaunchPrompt ? 0 : 1, 
                    height: showLaunchPrompt ? 0 : "auto",
                    marginBottom: showLaunchPrompt ? 0 : 20
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    height: { duration: 0.5, delay: 0.3 }
                  }}
                >
                  {/* Modernized decorative elements */}
                  <motion.div
                    className="absolute -inset-1 border border-white/5 rounded-xl z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#4BB4FF]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4BB4FF]/20 to-transparent"></div>
                
                  {/* Terminal header */}
                  <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between bg-black/60 backdrop-blur-md relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500/90 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500/90 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500/90 rounded-full"></div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-gray-400 text-xs font-light">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 mr-1.5 text-[#4BB4FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                      portfolio.startup
                    </div>
                  </div>
                  
                  {/* Terminal content */}
                  <div 
                    ref={terminalRef}
                    className="p-6 font-mono text-sm text-[#f5f5f7] min-h-[320px] max-h-[400px] overflow-y-auto scrollbar-none relative z-10"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <pre className="whitespace-pre-wrap font-light break-words">
                      {typedText.map(({text, color}, index) => (
                        <span key={index} className={color}>
                          {text}
                        </span>
                      ))}
                      {!typingComplete && <span className="inline-block w-2 h-4 bg-[#4BB4FF] ml-1 animate-pulse"></span>}
                    </pre>
                  </div>
                </motion.div>
                
                {/* Launch prompt appears after terminal is done - modernized */}
                {showLaunchPrompt && (
                  <motion.div
                    className="mt-0 bg-black/50 backdrop-blur-md border border-[#4BB4FF]/20 rounded-xl p-8 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {/* Enhanced decorative elements */}
                    <motion.div
                      className="absolute inset-0 border border-[#4BB4FF]/5 rounded-xl z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Advanced accent light effects */}
                    <motion.div
                      className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/40 to-transparent"
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    
                    <motion.div
                      className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#4BB4FF]/30 to-transparent"
                      animate={{ 
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5
                      }}
                    />
                    
                    <motion.div
                      className="absolute left-0 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-[#4BB4FF]/20 to-transparent"
                      animate={{ 
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    <motion.div
                      className="absolute right-0 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-[#4BB4FF]/20 to-transparent"
                      animate={{ 
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                      }}
                    />
                    
                    <motion.div 
                      className="relative z-10"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: 0.3
                      }}
                    >
                      {/* Sophisticated logo container */}
                      <div className="relative mx-auto mb-7 w-36 h-36">
                        {/* Dynamic radial glow */}
                        <motion.div
                          className="absolute inset-0 -m-6 rounded-full bg-gradient-radial from-[#4BB4FF]/10 to-transparent blur-md" 
                          animate={{ 
                            opacity: [0.4, 0.8, 0.4],
                            scale: [0.9, 1.05, 0.9]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                        
                        {/* Orbital rings */}
                        <motion.div 
                          className="absolute inset-0 -m-3 border border-[#4BB4FF]/20 rounded-full"
                          animate={{ 
                            rotate: 360,
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            rotate: {
                              duration: 20, 
                              repeat: Infinity,
                              ease: "linear"
                            },
                            opacity: {
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        />
                        
                        <motion.div 
                          className="absolute inset-0 -m-6 border border-[#4BB4FF]/10 rounded-full"
                          animate={{ 
                            rotate: -360,
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{ 
                            rotate: {
                              duration: 30, 
                              repeat: Infinity,
                              ease: "linear"
                            },
                            opacity: {
                              duration: 4,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        />
                        
                        {/* Particle accents */}
                        <motion.div className="absolute inset-0 -m-8">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div 
                              key={i}
                              className="absolute w-1 h-1 rounded-full bg-[#4BB4FF]"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 2 + 0.5}px`,
                                height: `${Math.random() * 2 + 0.5}px`,
                              }}
                              animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: Math.random() * 1
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        {/* Logo with darkened background for visibility */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-full"></div>
                          <Logo size="medium" animated={true} />
                        </div>
                      </div>
                      
                      {/* Modernized status text */}
                      <h3 className="text-2xl font-light mb-2 text-[#f5f5f7]">
                        <motion.span
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="bg-gradient-to-r from-[#4BB4FF] to-[#2980B9] bg-clip-text text-transparent"
                        >
                          System Ready
                        </motion.span>
                      </h3>
                      
                      {/* Advanced status indicator */}
                      <div className="flex items-center justify-center mb-8">
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full mr-2"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                        <p className="text-gray-400 text-sm font-light tracking-wide">
                          Portfolio interface optimized and ready
                        </p>
                      </div>
                      
                      {/* Completely redesigned premium launch button */}
                      <div className="relative mx-auto max-w-xs w-full">
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-[#4BB4FF]/30 via-[#4BB4FF]/10 to-[#2980B9]/30 rounded-xl blur-md opacity-70"
                          animate={{ 
                            opacity: [0.5, 0.8, 0.5],
                            scale: [0.99, 1.01, 0.99],
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        
                        <motion.button
                          onClick={handleLaunch}
                          className="group relative w-full py-4 bg-gradient-to-br from-black/80 to-black/70 border border-white/10 text-[#f5f5f7] rounded-xl transition-all overflow-hidden backdrop-blur-sm shadow-[0_0_15px_rgba(75,180,255,0.15)]"
                          whileHover={{ 
                            boxShadow: "0 0 25px rgba(75,180,255,0.3)",
                            borderColor: "rgba(75,180,255,0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Edge highlights */}
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4BB4FF]/50 to-transparent"></div>
                          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4BB4FF]/30 to-transparent"></div>
                          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#4BB4FF]/30 to-transparent"></div>
                          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#4BB4FF]/30 to-transparent"></div>
                          
                          {/* Interior glowing effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#4BB4FF]/0 to-[#2980B9]/0 group-hover:from-[#4BB4FF]/5 group-hover:to-[#2980B9]/5"
                            transition={{ duration: 0.5 }}
                          />
                          
                          {/* Animated scanner line effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4BB4FF]/30 to-transparent opacity-0 group-hover:opacity-100"
                            style={{ width: '150%', left: '-25%' }}
                            animate={{
                              left: ['0%', '100%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              left: {
                                repeat: Infinity, 
                                duration: 2,
                                ease: "easeInOut",
                                repeatDelay: 1
                              },
                              opacity: {
                                repeat: Infinity,
                                duration: 2,
                                times: [0, 0.5, 1],
                                repeatDelay: 1
                              }
                            }}
                          />
                          
                          {/* Button content with hover effect */}
                          <div className="relative z-10 flex flex-col items-center justify-center">
                            <motion.div
                              className="w-[22px] h-[22px] mb-2 rounded-full bg-[#4BB4FF]/80 flex items-center justify-center shadow-[0_0_10px_rgba(75,180,255,0.5)]"
                              animate={{ 
                                boxShadow: ["0 0 10px rgba(75,180,255,0.3)", "0 0 20px rgba(75,180,255,0.6)", "0 0 10px rgba(75,180,255,0.3)"]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse" 
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 10 4 15 9 20"></polyline>
                                <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                              </svg>
                            </motion.div>
                            
                            <div className="flex flex-col items-center">
                              <motion.p 
                                className="text-sm font-light tracking-widest text-[#f5f5f7] group-hover:text-[#4BB4FF] transition-colors duration-300"
                                animate={{ 
                                  opacity: [0.9, 1, 0.9] 
                                }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity,
                                  repeatType: "reverse" 
                                }}
                              >
                                INITIALIZE
                              </motion.p>
                              <p className="text-xs text-gray-400 mt-1 font-light tracking-wider">PORTFOLIO INTERFACE</p>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    );
  };
  
  // Footer component
  const Footer = () => (
    <footer className="py-8 px-6 backdrop-filter backdrop-blur-sm bg-black/20 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 font-light"
        >
          © 2024. All rights reserved.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex space-x-6 mt-4 md:mt-0"
        >
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-light">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-light">Terms</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-light">Sitemap</a>
        </motion.div>
      </div>
    </footer>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashScreenDone && <SplashScreen />}
      </AnimatePresence>
      
      <div className="relative overflow-hidden">
        {/* Global background */}
        <AceternityBackground />
        
        {/* Global consistent overlay to ensure uniform darkness */}
        <div className="fixed inset-0 bg-black/20 pointer-events-none z-[-5]"></div>
        
        {/* Scroll progress indicator */}
        <ScrollProgressBar />
        
        {/* Navigation - only show after animation is complete */}
        {animationComplete && <Navigation navItems={navItems} />}
        
        <main className="flex min-h-screen flex-col overflow-hidden">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Projects Section */}
          <ProjectsWrapper />
          
          {/* About Section */}
          <AboutWrapper />
          
          {/* Contact Section */}
          <ContactWrapper />
          
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}
