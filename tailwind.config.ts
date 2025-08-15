import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ==========================================================================
      // SPACING SYSTEM
      // ==========================================================================
      spacing: {
        // Brand-specific spacing for consistent layouts
        'page-margin': '2.5rem',      // 40px - Seitenrand
        'page-gutter': '1.5rem',      // 24px - Gutter zwischen Elementen
        'section-padding': '3rem',    // 48px - Section Padding
        'card-padding': '2rem',       // 32px - Card interne Abstände
      },

      // ==========================================================================
      // TYPOGRAPHY SYSTEM
      // ==========================================================================
      fontSize: {
        // Brand-specific text sizes
        'nav': ['1.3rem', { lineHeight: '1.5', fontWeight: '400' }],          // 20.8px - Navigation
        'header': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],         // 16px
        'hero': ['2rem', { lineHeight: '1.1', fontWeight: '700' }],           // 32px - Tighter line-height for h1
        'hero-lg': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],      // 40px
        'hero-xl': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],        // 48px
        'subheading': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],  // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],                       // 18px
        'caption': ['0.875rem', { lineHeight: '1.4' }],                       // 14px
      },

      // ==========================================================================
      // COLOR SYSTEM - NEW BRAND COLORS
      // ==========================================================================
      colors: {
        // Primary Brand Colors (NEW)
        'brand': {
          'white': '#FFFFFF',      // Pure white
          'light': '#D4D4D6',      // Light gray
          'green': '#D8FF96',      // Brand green (was gradient, now solid)  
          'purple': '#7D5FFF',     // Brand purple
          'orange': '#FF5A21',     // Brand orange (replaces old green)
          'black': '#000000',      // Pure black
        },
        
        // Solid Colors for CTAs (NO GRADIENTS)
        'gradient': {
          'from': '#D8FF96',       // Solid green (no gradient)
          'to': '#D8FF96',         // Solid green (no gradient)
        },

        // Legacy colors for compatibility
        'brand-blue': {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a3a3ff',
          400: '#7a7aff',
          500: '#7D5FFF',  // Updated to new purple
          600: '#8a73f5',
          700: '#7d66e8',
          800: '#7059d4',
          900: '#5a47aa',
        },

        // Semantic Colors
        'success': {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        'warning': {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        'error': {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },

        // Neutral Grays (enhanced)
        'neutral': {
          25: '#fafafa',
          50: '#D4D4D6',           // Updated to brand light
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#000000',          // Updated to brand black
        }
      },

      // ==========================================================================
      // BACKGROUND PATTERNS - UPDATED GRADIENTS
      // ==========================================================================
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #D8FF96 0%, #D8FF96 100%)',  // Solid green
        'gradient-brand-subtle': 'linear-gradient(135deg, #D8FF96 0%, #D8FF96 100%)',  // Solid green
        'gradient-radial': 'radial-gradient(#D8FF96, #D8FF96)',  // Solid green
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, #D8FF96, #D8FF96)',  // Solid green
      },

      // ==========================================================================
      // SHADOWS SYSTEM
      // ==========================================================================
      boxShadow: {
        // Custom shadows for brand consistency - Updated for green/purple theme
        'brand-sm': '0 2px 4px 0 rgba(149, 127, 255, 0.1)',
        'brand': '0 4px 6px -1px rgba(149, 127, 255, 0.1), 0 2px 4px -1px rgba(149, 127, 255, 0.06)',
        'brand-md': '0 10px 15px -3px rgba(149, 127, 255, 0.1), 0 4px 6px -2px rgba(149, 127, 255, 0.05)',
        'brand-lg': '0 20px 25px -5px rgba(149, 127, 255, 0.1), 0 10px 10px -5px rgba(149, 127, 255, 0.04)',
        'brand-xl': '0 25px 50px -12px rgba(149, 127, 255, 0.25)',
        
        // Brand-specific shadows
        'brand-green': '0 4px 6px -1px rgba(216, 255, 150, 0.2), 0 2px 4px -1px rgba(216, 255, 150, 0.1)',
        'brand-orange': '0 4px 6px -1px rgba(255, 90, 33, 0.2), 0 2px 4px -1px rgba(255, 90, 33, 0.1)',
        'brand-purple': '0 4px 6px -1px rgba(149, 127, 255, 0.2), 0 2px 4px -1px rgba(149, 127, 255, 0.1)',
        
        // Glow effects
        'glow-sm': '0 0 10px rgba(149, 127, 255, 0.3)',
        'glow': '0 0 20px rgba(149, 127, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(149, 127, 255, 0.5)',
        
        // Soft shadows
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },

      // ==========================================================================
      // ANIMATION SYSTEM
      // ==========================================================================
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-brand': 'pulseBrand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'gradient-brand-animate': 'gradientBrandAnimate 25s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'organic-gradient': 'fluidGradient 15s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseBrand: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(149, 127, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(149, 127, 255, 0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientBrandAnimate: {
          '0%': { 
            background: 'radial-gradient(ellipse at 30% 40%, #B8FF4D 0%, #7D5FFF 25%, #D4D4D6 50%, #B8FF4D 75%, #7D5FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
          },
          '14.3%': { 
            background: 'radial-gradient(ellipse at 50% 30%, #7D5FFF 0%, #D4D4D6 25%, #B8FF4D 50%, #7D5FFF 75%, #D4D4D6 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '20% 10%'
          },
          '28.6%': { 
            background: 'radial-gradient(ellipse at 70% 40%, #D4D4D6 0%, #B8FF4D 25%, #7D5FFF 50%, #D4D4D6 75%, #B8FF4D 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '40% 20%'
          },
          '42.9%': { 
            background: 'radial-gradient(ellipse at 80% 60%, #B8FF4D 0%, #7D5FFF 25%, #D4D4D6 50%, #B8FF4D 75%, #7D5FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '60% 40%'
          },
          '57.1%': { 
            background: 'radial-gradient(ellipse at 70% 80%, #7D5FFF 0%, #D4D4D6 25%, #B8FF4D 50%, #7D5FFF 75%, #D4D4D6 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '80% 60%'
          },
          '71.4%': { 
            background: 'radial-gradient(ellipse at 50% 90%, #D4D4D6 0%, #B8FF4D 25%, #7D5FFF 50%, #D4D4D6 75%, #B8FF4D 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '60% 80%'
          },
          '85.7%': { 
            background: 'radial-gradient(ellipse at 30% 80%, #B8FF4D 0%, #7D5FFF 25%, #D4D4D6 50%, #B8FF4D 75%, #7D5FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '40% 90%'
          },
          '100%': { 
            background: 'radial-gradient(ellipse at 30% 40%, #B8FF4D 0%, #7D5FFF 25%, #D4D4D6 50%, #B8FF4D 75%, #7D5FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
          },
        },
        fluidGradient: {
          '0%, 100%': { 
            background: 'linear-gradient(-45deg, #B8FF4D, #7D5FFF, #D4D4D6, #B8FF4D)',
            backgroundSize: '400% 400%',
            backgroundPosition: '0% 50%'
          },
          '50%': { 
            background: 'linear-gradient(-45deg, #B8FF4D, #7D5FFF, #D4D4D6, #B8FF4D)',
            backgroundSize: '400% 400%',
            backgroundPosition: '100% 50%'
          }
        },
        organicGradient: {
          '0%': { 
            background: `
              radial-gradient(ellipse 100% 70% at 20% 30%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 80% 80% at 30% 50%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 120% 80% at 40% 70%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '10%': { 
            background: `
              radial-gradient(ellipse 105% 85% at 25% 35%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 105% 105% at 35% 55%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 125% 95% at 45% 75%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '20%': { 
            background: `
              radial-gradient(ellipse 110% 90% at 30% 40%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 110% 110% at 40% 60%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 130% 100% at 50% 80%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '30%': { 
            background: `
              radial-gradient(ellipse 115% 95% at 40% 50%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 115% 115% at 50% 70%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 155% 105% at 60% 85%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '40%': { 
            background: `
              radial-gradient(ellipse 120% 100% at 50% 60%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 120% 120% at 60% 80%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 160% 110% at 70% 90%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '50%': { 
            background: `
              radial-gradient(ellipse 125% 105% at 60% 70%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 105% 125% at 70% 85%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 165% 115% at 80% 95%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '60%': { 
            background: `
              radial-gradient(ellipse 120% 100% at 70% 75%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 120% 120% at 80% 90%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 160% 110% at 85% 85%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '70%': { 
            background: `
              radial-gradient(ellipse 115% 95% at 75% 70%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 115% 115% at 85% 80%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 155% 105% at 80% 75%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '80%': { 
            background: `
              radial-gradient(ellipse 110% 90% at 70% 60%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 110% 110% at 75% 65%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 130% 100% at 70% 60%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '90%': { 
            background: `
              radial-gradient(ellipse 105% 85% at 50% 45%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 105% 105% at 55% 50%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 125% 95% at 60% 55%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
          '100%': { 
            background: `
              radial-gradient(ellipse 120% 80% at 20% 30%, #B8FF4D 0%, transparent 30%),
              radial-gradient(ellipse 100% 100% at 30% 50%, #7D5FFF 0%, transparent 30%),
              radial-gradient(ellipse 120% 90% at 40% 70%, #D4D4D6 0%, transparent 30%),
              #FFFFFF
            `,
            backgroundSize: '100% 100%'
          },
        },
      },

      // ==========================================================================
      // RESPONSIVE BREAKPOINTS
      // ==========================================================================
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',    // For ultra-wide layouts
      },

      // ==========================================================================
      // BORDER RADIUS SYSTEM
      // ==========================================================================
      borderRadius: {
        'brand': '0.625rem',      // 10px - Updated for solution boxes
        'brand-lg': '1rem',       // 16px  
        'brand-xl': '1.5rem',     // 24px
      },

      // ==========================================================================
      // BORDER WIDTH SYSTEM
      // ==========================================================================
      borderWidth: {
        '1': '0.0625rem',         // 1px in rem
      },

      // ==========================================================================
      // BACKDROP FILTERS
      // ==========================================================================
      backdropBlur: {
        'brand': '12px',
      },

      // ==========================================================================
      // ASPECT RATIOS
      // ==========================================================================
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },

      // ==========================================================================
      // Z-INDEX SYSTEM
      // ==========================================================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ==========================================================================
      // TRANSFORM SYSTEM
      // ==========================================================================
      scale: {
        '102': '1.02',
        '103': '1.03',
      },

      // ==========================================================================
      // TRANSITION SYSTEM
      // ==========================================================================
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ==========================================================================
      // LAYOUT SYSTEM - 1920px with 1.5rem margins
      // ==========================================================================
      maxWidth: {
        'ultra': '1920px',        // Max width for ultra-wide
        'content': 'calc(1920px - 3rem)', // 1920px - 2 * 1.5rem margins
        '2xl': '48rem',           // Increased from 42rem (672px) to 48rem (768px)
      },

      // ==========================================================================
      // SPACING FOR TYPOGRAPHY
      // ==========================================================================
      margin: {
        'h1-bottom': '2rem',      // More space after h1
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add custom utilities
    function({ addUtilities }: any) {
      addUtilities({
        // Custom text gradients with new brand colors
        '.text-gradient-brand': {
          background: 'linear-gradient(135deg, #B8FF4D 0%, #7D5FFF 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // Custom glass morphism
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        // Custom scrollbar
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#7D5FFF transparent',
        },
        
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
        },
        
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          'background-color': '#7D5FFF',
          'border-radius': '3px',
        },

        // Ultra-wide layout utilities
        '.container-ultra': {
          'max-width': '1920px',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-left': '2.5rem',
          'padding-right': '2.5rem',
        },

        // Typography spacing utilities
        '.h1-spacing': {
          'line-height': '1.1',
          'margin-bottom': '2rem',
        },
      });
    },
  ],
};

export default config;
