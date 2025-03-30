"use client";

import { useEffect, useRef, useState } from 'react';

// Particle class for animation
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  
  constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = '#4BB4FF';
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  
  update(canvas: HTMLCanvasElement, mousePosition: {x: number, y: number}) {
    // Move the particle
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Mouse interaction
    if (mousePosition.x && mousePosition.y) {
      const dx = mousePosition.x - this.x;
      const dy = mousePosition.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = 0.5; // Repulsion strength
        this.speedX -= Math.cos(angle) * force;
        this.speedY -= Math.sin(angle) * force;
      }
    }
    
    // Borders check - wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
    
    // Slow down particles over time
    this.speedX *= 0.99;
    this.speedY *= 0.99;
    
    // Random movement
    if (Math.random() < 0.01) {
      this.speedX += (Math.random() - 0.5) * 0.5;
      this.speedY += (Math.random() - 0.5) * 0.5;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(75, 180, 255, ${this.opacity})`;
    ctx.fill();
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Create particles on mount
  useEffect(() => {
    setMounted(true);
    
    // Mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      // Add particles at mouse position when moving
      if (canvasRef.current && Math.random() < 0.2) {
        const newParticle = new Particle(
          e.clientX,
          e.clientY,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
        setParticles(prev => [...prev, newParticle]);
      }
    };
    
    // Click event to add burst of particles
    const handleClick = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        newParticles.push(
          new Particle(
            e.clientX,
            e.clientY,
            Math.random() * 4 + 2,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
          )
        );
      }
      
      setParticles(prev => [...prev, ...newParticles]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Initial particles
    const initialParticles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth, window.innerHeight) / 10;
    
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push(
        new Particle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 1
        )
      );
    }
    
    setParticles(initialParticles);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!mounted || !canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let animationFrameId: number;
    
    // Main animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Create a semi-transparent background to create trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particles.forEach(particle => {
        particle.update(canvas, mousePosition);
        particle.draw(ctx);
      });
      
      // Connect nearby particles with lines
      ctx.strokeStyle = 'rgba(75, 180, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Create a subtle glow/bloom effect around mouse
      if (mousePosition.x && mousePosition.y) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 10,
          mousePosition.x, mousePosition.y, 150
        );
        
        gradient.addColorStop(0, 'rgba(75, 180, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Keep animation going
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, particles, mousePosition]);
  
  if (!mounted) return null;
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: '#0a0a0a' }}
    />
  );
} 