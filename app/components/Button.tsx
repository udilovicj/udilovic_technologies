"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  animate?: boolean;
  external?: boolean;
  delay?: number;
}

export const Button = ({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  animate = false,
  external = false,
  delay = 0,
}: ButtonProps) => {
  const baseClasses = "inline-block px-6 py-3 font-light text-sm tracking-wider uppercase transition-all duration-300 ease-in-out";
  
  const variantClasses = {
    primary: "bg-transparent border border-[#4BB4FF] text-[#f5f5f7] hover:tracking-widest",
    secondary: "bg-transparent border border-gray-700 text-[#f5f5f7] hover:tracking-widest hover:border-[#f5f5f7]",
    outline: "bg-transparent border border-gray-800 text-gray-400 hover:border-[#4BB4FF] hover:text-[#4BB4FF] hover:tracking-widest",
    text: "bg-transparent text-gray-400 hover:text-[#f5f5f7] px-0 py-1 hover:tracking-widest",
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  const content = (
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  );
  
  if (animate) {
    const button = (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="inline-block"
      >
        {href ? (
          external ? (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={buttonClasses}
            >
              {content}
            </a>
          ) : (
            <Link href={href} className={buttonClasses}>
              {content}
            </Link>
          )
        ) : (
          <button type={type} onClick={onClick} className={buttonClasses}>
            {content}
          </button>
        )}
      </motion.div>
    );
    
    return button;
  }
  
  if (href) {
    if (external) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={buttonClasses}
        >
          {content}
        </a>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}; 