import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: "bg-[var(--color-agro-green)] text-white hover:bg-[var(--color-agro-green-dark)] shadow-lg shadow-green-500/30",
  secondary: "bg-[var(--color-agro-yellow)] text-[var(--color-agro-dark)] hover:bg-yellow-400 shadow-lg shadow-yellow-500/30",
  outline: "border-2 border-[var(--color-agro-green)] text-[var(--color-agro-green)] hover:bg-green-50",
  ghost: "bg-transparent text-[var(--color-agro-dark)] hover:bg-black/5",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg"
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  className, 
  onClick,
  type = 'button',
  icon: Icon
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={twMerge(
        "relative rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center"
          >
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span>Processing...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
