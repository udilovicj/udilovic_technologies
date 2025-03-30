"use client";

import React, { useEffect, useState, useRef, memo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const ScrollProgressBar = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTime = useRef(0);
  const { scrollYProgress } = useScroll({
    layoutEffect: false // Prevent hydration error
  });
  
  // Use lighter spring settings
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80, // Reduced from 100
    damping: 20, // Reduced from 30
    restDelta: 0.01 // Increased threshold - less precise but more performant
  });

  // Hide progress bar when at top of page
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      // Throttle to once per 100ms - we don't need high frequency updates for this UI element
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;
      
      // Show progress bar only after scrolling 100px
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#4BB4FF]/60 origin-left z-50"
        style={{ scaleX, opacity }}
      />
      
      {/* Scroll to top button - render only when visible */}
      {isVisible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-gray-800/50 flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </>
  );
});

// Add displayName
ScrollProgressBar.displayName = 'ScrollProgressBar'; 