"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeadingProps {
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  withDivider?: boolean;
  delay?: number;
}

interface TextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const Heading = ({ 
  children, 
  gradient = false, 
  className = "", 
  as = "h2",
  withDivider = true,
  delay = 0,
}: HeadingProps) => {
  const Component = as;
  
  const content = gradient ? (
    <>
      <Component className={`${className}`}>
        <span className="gradient-text">{children}</span>
      </Component>
      {withDivider && <div className="divider"></div>}
    </>
  ) : (
    <>
      <Component className={`${className}`}>{children}</Component>
      {withDivider && <div className="divider"></div>}
    </>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {content}
    </motion.div>
  );
};

export const Text = ({ 
  children, 
  className = "", 
  animate = true,
  delay = 0.1,
}: TextProps) => {
  // Check if animate is explicitly false
  if (animate === false) {
    return (
      <p className={`text-gray-400 font-light leading-relaxed ${className}`}>
        {children}
      </p>
    );
  }
  
  // Default case: animate is true or truthy
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`text-gray-400 font-light leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
};

export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#f5f5f7]">{children}</span>
);

export const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="gradient-text">{children}</span>
); 