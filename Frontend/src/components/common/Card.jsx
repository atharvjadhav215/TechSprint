import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';

export const Card = ({ 
  children, 
  className, 
  onClick, 
  glass = true,
  hoverEffect = true
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!hoverEffect || !cardRef.current) return;
    
    // Optional GSAP hover effect for advanced interactions if needed
    // Currently relying on Framer Motion for simplicity and performance
  }, [hoverEffect]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : {}}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={twMerge(
        "rounded-2xl p-6 transition-all duration-300",
        glass ? "glass-panel bg-white/60 dark:bg-black/40" : "bg-white dark:bg-gray-800 shadow-md",
        onClick ? "cursor-pointer" : "",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
