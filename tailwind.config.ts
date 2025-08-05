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
        'page-margin': '1.5rem',      // 24px - Seitenrand
        'page-gutter': '1.5rem',      // 24px - Gutter zwischen Elementen
        'section-padding': '3rem',    // 48px - Section Padding
        'card-padding': '2rem',       // 32px - Card interne Abstände
      },

      // ==========================================================================
      // TYPOGRAPHY SYSTEM
      // ==========================================================================
      fontSize: {
        // Brand-specific text sizes
        'nav': ['1.3rem', { lineHeight: '1.5', fontWeight: '500' }],          // 20.8px - Navigation
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
          'light': '#EEEEF0',      // Light gray
          'green': '#DAFF96',      // Brand green  
          'purple': '#957FFF',     // Brand purple
          'black': '#000000',      // Pure black
        },
        
        // Gradient Colors for CTAs (NEW)
        'gradient': {
          'from': '#DAFF96',       // Green start
          'to': '#957FFF',         // Purple end
        },

        // Legacy colors for compatibility
        'brand-blue': {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a3a3ff',
          400: '#7a7aff',
          500: '#957FFF',  // Updated to new purple
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
          50: '#EEEEF0',           // Updated to brand light
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
        'gradient-brand': 'linear-gradient(135deg, #DAFF96 0%, #957FFF 100%)',
        'gradient-brand-subtle': 'linear-gradient(135deg, #DAFF96 0%, #EEEEF0 50%, #957FFF 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
        'brand-green': '0 4px 6px -1px rgba(218, 255, 150, 0.2), 0 2px 4px -1px rgba(218, 255, 150, 0.1)',
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
        'organic-gradient': 'organicGradient 30s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
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
            background: 'radial-gradient(ellipse at 30% 40%, #DAFF96 0%, #957FFF 25%, #EEEEF0 50%, #DAFF96 75%, #957FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
          },
          '14.3%': { 
            background: 'radial-gradient(ellipse at 50% 30%, #957FFF 0%, #EEEEF0 25%, #DAFF96 50%, #957FFF 75%, #EEEEF0 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '20% 10%'
          },
          '28.6%': { 
            background: 'radial-gradient(ellipse at 70% 40%, #EEEEF0 0%, #DAFF96 25%, #957FFF 50%, #EEEEF0 75%, #DAFF96 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '40% 20%'
          },
          '42.9%': { 
            background: 'radial-gradient(ellipse at 80% 60%, #DAFF96 0%, #957FFF 25%, #EEEEF0 50%, #DAFF96 75%, #957FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '60% 40%'
          },
          '57.1%': { 
            background: 'radial-gradient(ellipse at 70% 80%, #957FFF 0%, #EEEEF0 25%, #DAFF96 50%, #957FFF 75%, #EEEEF0 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '80% 60%'
          },
          '71.4%': { 
            background: 'radial-gradient(ellipse at 50% 90%, #EEEEF0 0%, #DAFF96 25%, #957FFF 50%, #EEEEF0 75%, #DAFF96 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '60% 80%'
          },
          '85.7%': { 
            background: 'radial-gradient(ellipse at 30% 80%, #DAFF96 0%, #957FFF 25%, #EEEEF0 50%, #DAFF96 75%, #957FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '40% 90%'
          },
          '100%': { 
            background: 'radial-gradient(ellipse at 30% 40%, #DAFF96 0%, #957FFF 25%, #EEEEF0 50%, #DAFF96 75%, #957FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
          },
        },
        organicGradient: {
          '0%': { 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #DAFF96 20%, #957FFF 45%, #EEEEF0 70%, #000000 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
          },
          '16.7%': { 
            background: 'linear-gradient(180deg, #DAFF96 0%, #957FFF 25%, #EEEEF0 50%, #000000 75%, #FFFFFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '25% 25%'
          },
          '33.3%': { 
            background: 'linear-gradient(225deg, #957FFF 0%, #EEEEF0 20%, #000000 40%, #FFFFFF 65%, #DAFF96 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '50% 50%'
          },
          '50%': { 
            background: 'linear-gradient(270deg, #EEEEF0 0%, #000000 25%, #FFFFFF 45%, #DAFF96 70%, #957FFF 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '75% 75%'
          },
          '66.7%': { 
            background: 'linear-gradient(315deg, #000000 0%, #FFFFFF 20%, #DAFF96 45%, #957FFF 70%, #EEEEF0 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '100% 100%'
          },
          '83.3%': { 
            background: 'linear-gradient(360deg, #FFFFFF 0%, #DAFF96 25%, #957FFF 50%, #EEEEF0 75%, #000000 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '75% 50%'
          },
          '100%': { 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #DAFF96 20%, #957FFF 45%, #EEEEF0 70%, #000000 100%)',
            backgroundSize: '300% 300%',
            backgroundPosition: '0% 0%'
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
          background: 'linear-gradient(135deg, #DAFF96 0%, #957FFF 100%)',
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
          'scrollbar-color': '#957FFF transparent',
        },
        
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
        },
        
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          'background-color': '#957FFF',
          'border-radius': '3px',
        },

        // Ultra-wide layout utilities
        '.container-ultra': {
          'max-width': '1920px',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-left': '1.5rem',
          'padding-right': '1.5rem',
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
