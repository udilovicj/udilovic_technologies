"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const AnimatedCursor = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Springs for smoother movement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Throttling refs
  const lastMoveTime = useRef(0);
  const lastPointerCheckTime = useRef(0);
  
  useEffect(() => {
    // Ensure this only runs in browser
    if (typeof window === 'undefined') return;

    const moveCursor = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to 60fps (approximately 16ms)
      if (now - lastMoveTime.current > 16) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        lastMoveTime.current = now;
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handlePointerDetection = () => {
      if (typeof document === 'undefined') return;
      
      const now = Date.now();
      // Only check every 100ms to greatly reduce CPU usage
      if (now - lastPointerCheckTime.current < 100) return;
      lastPointerCheckTime.current = now;
      
      const hoveredElement = document.elementFromPoint(
        cursorX.get(),
        cursorY.get()
      );
      
      // Check if hovering over clickable elements
      if (hoveredElement) {
        const isClickable = 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'BUTTON' || 
          hoveredElement.tagName === 'INPUT' || 
          hoveredElement.closest('a, button, [role="button"], [tabindex]') !== null;
        
        setIsPointer(isClickable);
      }
    };
    
    // Hide default cursor when component is mounted
    document.body.style.cursor = "none";
    
    // Show custom cursor after a small delay (prevents flashing on initial load)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handlePointerDetection, { passive: true });
    
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handlePointerDetection);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);
  
  // Don't render on touch devices or small screens (mobile)
  if (typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || window.innerWidth < 768)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none mix-blend-difference z-[999]"
        style={{
          opacity: isVisible ? 1 : 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8, // Reduced from 10
          height: 8, // Reduced from 10
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          transform: 'translate(-50%, -50%)'
        }}
        transition={{ 
          scale: { duration: 0.15 }
        }}
      />
      
      {/* Subtle glow effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white/10 blur-sm pointer-events-none z-[997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isPointer || isClicking ? 0.5 : 0.2,
          scale: isClicking ? 1.2 : 1,
          width: 16, // Reduced from 20
          height: 16, // Reduced from 20
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
});

// Add display name
AnimatedCursor.displayName = 'AnimatedCursor'; 