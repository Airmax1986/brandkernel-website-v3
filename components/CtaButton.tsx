'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { CtaButtonProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Enhanced CTA Button Component with new brand colors
 * Features: Multiple variants, sizes, states, accessibility, animations
 */
const CtaButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, CtaButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    href,
    disabled = false,
    loading = false,
    className,
    onClick,
    ...props 
  }, ref) => {
    
    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";
    
    // Variant styles with new brand colors
    const variantStyles = {
      primary: "bg-gradient-brand text-brand-black hover:shadow-brand-md focus:ring-brand-purple disabled:opacity-50",
      secondary: "bg-brand-white text-brand-black border-1 border-brand-light hover:bg-brand-light hover:shadow-brand focus:ring-brand-purple disabled:opacity-50",
      outline: "bg-transparent text-brand-purple border-1 border-brand-purple hover:bg-brand-purple hover:text-brand-white focus:ring-brand-purple disabled:opacity-50",
      ghost: "bg-transparent text-brand-black hover:bg-brand-light focus:ring-brand-purple disabled:opacity-50",
      danger: "bg-error-500 text-brand-white hover:bg-error-600 focus:ring-error-500 disabled:opacity-50"
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm rounded-brand",
      md: "px-6 py-2.5 text-base rounded-brand",
      lg: "px-8 py-3 text-lg rounded-brand-lg",
      xl: "px-10 py-4 text-xl rounded-brand-lg"
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg 
        className="animate-spin -ml-1 mr-3 h-5 w-5" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Combined classes
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // Button content
    const buttonContent = (
      <>
        {loading && <LoadingSpinner />}
        {children}
      </>
    );

    // Render as link if href is provided
    if (href && !disabled) {
      const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
      
      return (
        <a
          href={href}
          className={buttonClasses}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-disabled={loading}
          style={{
            transform: 'scale(1)',
            transition: 'all 0.2s ease-out'
          }}
          onMouseEnter={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.transform = 'scale(1) translateY(0px)';
            }
          }}
          onMouseDown={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.transform = 'scale(0.95) translateY(0px)';
            }
          }}
          onMouseUp={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            }
          }}
        >
          {buttonContent}
        </a>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled || loading}
        className={buttonClasses}
        onClick={onClick}
        aria-disabled={disabled || loading}
        style={{
          transform: 'scale(1)',
          transition: 'all 0.2s ease-out'
        }}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.transform = 'scale(1) translateY(0px)';
          }
        }}
        onMouseDown={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.transform = 'scale(0.95) translateY(0px)';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
          }
        }}
      >
        {buttonContent}
      </button>
    );
  }
);

CtaButton.displayName = 'CtaButton';

export default CtaButton;
