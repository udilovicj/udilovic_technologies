"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  navItems: { label: string; href: string }[];
}

export const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <button 
        onClick={toggleMenu} 
        className="md:hidden flex flex-col space-y-1.5 z-50 relative"
        aria-label="Toggle menu"
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white"
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white"
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0e0e10]/95 backdrop-blur-sm z-40 md:hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  variants={itemVariants}
                  onClick={toggleMenu}
                  className="text-2xl uppercase font-extralight tracking-widest py-4 border-b border-gray-800/30 w-1/2 text-center"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 