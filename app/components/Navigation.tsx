"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface NavigationProps {
  navItems: { label: string; href: string }[];
}

export const Navigation = ({ navItems }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const router = useRouter();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled for navbar styling
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine which section is in view
      const sections = navItems.map(item => item.href.replace("#", ""));
      
      // Start from bottom to ensure proper highlighting for stacked sections
      const reversedSections = [...sections].reverse();
      
      // If at the very top of the page, set "hero" as active
      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }
      
      for (const section of reversedSections) {
        if (!section) continue;
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        // Improved detection logic with better thresholds for sections
        const topThreshold = window.innerHeight * 0.3; // 30% from the top
        
        if (rect.top <= topThreshold) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, navItems]);

  // Helper function for smooth scrolling to sections
  const smoothScrollToSection = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Handle page navigation for links starting with '/'
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }
    
    // Handle hero section specially
    if (href === "#hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }
    
    // For other sections
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`fixed top-5 left-0 w-full z-50 transition-all duration-300 pointer-events-none`}
    >
      <div className="container-wide mx-auto px-6 flex justify-center">
        <motion.nav 
          className="hidden md:block pointer-events-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={`flex items-center relative px-3 py-2 rounded-full ${
            scrolled ? 'bg-black/40 backdrop-blur-md border border-white/10 shadow-lg' : 'bg-black/20 backdrop-blur-sm border border-white/5'
          } transition-all duration-300`}>
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              
              return (
                <motion.div 
                  key={index} 
                  className="relative px-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => smoothScrollToSection(item.href, e)}
                    className={`relative py-1.5 px-5 rounded-full flex items-center justify-center text-xs uppercase tracking-widest transition-colors ${
                      isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full"
                        layoutId="nav-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        </motion.nav>
        
        {/* Mobile menu button positioned at top right */}
        <div className="md:hidden absolute top-0 right-6 pointer-events-auto">
          <MobileMenu navItems={navItems} smoothScrollToSection={smoothScrollToSection} />
        </div>
      </div>
    </header>
  );
};

const MobileMenu = ({ 
  navItems, 
  smoothScrollToSection 
}: NavigationProps & { 
  smoothScrollToSection: (href: string, e: React.MouseEvent) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.button 
        onClick={toggleMenu} 
        className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex flex-col items-center justify-center w-12 h-12 z-50 relative shadow-lg"
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-0.5 bg-white mb-1"
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-0.5 bg-white mb-1"
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-0.5 bg-white"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ 
              opacity: 0,
              visibility: "hidden",
              transition: { delay: 0.3 }
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/95 to-[#0e0e10] backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="flex flex-col items-center justify-center h-full z-50 relative px-6"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="w-full max-w-sm">
                <motion.div 
                  className="mb-12 text-center"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-light mb-2 gradient-text">Jovan Udilovic</h3>
                  <p className="text-sm text-gray-400">Developer & QA Engineer</p>
                </motion.div>
                
                <div className="space-y-3 w-full">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          // Close menu
                          setIsOpen(false);
                          
                          // Use the smooth scroll function
                          smoothScrollToSection(item.href, e);
                        }}
                        className="text-md py-4 px-6 font-light tracking-wider flex items-center justify-between text-white w-full"
                      >
                        <span>{item.label}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#4BB4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-16 text-xs tracking-widest text-gray-500 text-center"
                  variants={itemVariants}
                >
                  <p>© 2024 Udilovic Technologies</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 