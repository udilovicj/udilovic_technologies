"use client";

import React, { useEffect, useRef, useState } from "react";

interface SparklesCoreProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
  particleSize?: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.0,
  speed = 0.15,
  particleColor = "#2980B9",
  className,
  particleDensity = 8,
  particleSize = 1.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);
  const [mounted, setMounted] = useState(false);
  const lastFrameTimeRef = useRef<number>(0);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      // Regenerate particles when resizing - with hard cap on total particles
      const initialParticles = [];
      const particleCount = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 40000) * particleDensity, 
        100 // Hard cap at 100 particles maximum
      );
      
      for (let i = 0; i < particleCount; i++) {
        initialParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * 0.2 * speed, // Reduced speed multiplier
          speedY: (Math.random() - 0.5) * 0.2 * speed, // Reduced speed multiplier
          opacity: Math.random() * 0.3 + 0.1, // Slightly lower opacity
        });
      }
      
      particlesRef.current = initialParticles;
    };

    // Use a debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener("resize", debouncedResize);
    resizeCanvas();

    // Animation loop with reduced frame rate for better performance
    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      // Limit to ~15 FPS for better performance
      if (timestamp - lastFrameTimeRef.current < 66) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTimeRef.current = timestamp;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw particles
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particleColor)}, ${p.opacity})`;
        ctx.fill();
        
        // Only draw connections very rarely and for a very limited subset of particles
        // This greatly improves performance while still showing some connections
        if (particleDensity > 10 && i % 5 === 0 && Math.random() > 0.7) {
          let connectionCount = 0;
          for (let j = i + 5; j < particles.length && connectionCount < 2; j += 5) {
            const p2 = particles[j];
            const dist = Math.sqrt(
              Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
            );
            if (dist < 60) { // Reduced connection distance
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${hexToRgb(particleColor)}, ${
                0.05 * (1 - dist / 60) // Lower opacity
              })`;
              ctx.lineWidth = 0.2;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              connectionCount++;
            }
          }
        }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(resizeTimer);
    };
  }, [mounted, particleColor, particleDensity, maxSize, minSize, speed, particleSize]);

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "");
    
    // Parse hex
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return `${r}, ${g}, ${b}`;
  };

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{ background }}
    />
  );
}; 