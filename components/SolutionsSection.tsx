'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';

/**
 * Solutions Section Component
 * Features: 3 solution boxes side by side with animations
 */
export default function SolutionsSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const solutions = [
    {
      id: 1,
      title: "Brand Strategy",
      description: "Develop a comprehensive brand strategy that resonates with your target audience and drives business growth.",
      icon: "🎯",
      features: [
        "Market Analysis",
        "Brand Positioning",
        "Competitive Research",
        "Strategy Roadmap"
      ]
    },
    {
      id: 2,
      title: "Visual Identity",
      description: "Create stunning visual identities that make your brand memorable and instantly recognizable.",
      icon: "🎨",
      features: [
        "Logo Design",
        "Color Palette",
        "Typography",
        "Brand Guidelines"
      ]
    },
    {
      id: 3,
      title: "Digital Presence",
      description: "Build a strong digital presence that engages your audience across all digital touchpoints.",
      icon: "💻",
      features: [
        "Website Design",
        "Social Media",
        "Digital Marketing",
        "Content Strategy"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="solutions" className="py-section-padding bg-brand-light">
      <div className="container-ultra">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-hero-lg text-brand-black h1-spacing">
            Our Solutions
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            We provide comprehensive branding solutions that help your business stand out in today's competitive marketplace.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-brand-white border-1 border-brand-light rounded-brand p-card-padding h-full hover:shadow-brand-lg transition-all duration-300 hover:border-brand-purple/20">
                
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {solution.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-subheading text-brand-black mb-4 group-hover:text-brand-purple transition-colors duration-200">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {solution.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-sm text-neutral-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ 
                        delay: solution.id * 0.2 + index * 0.1,
                        duration: 0.4 
                      }}
                    >
                      <svg 
                        className="w-4 h-4 text-brand-green mr-3 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-brand border-1 border-transparent group-hover:border-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-body-lg text-neutral-600 mb-8">
            Ready to transform your brand? Let's discuss your project.
          </p>
          <motion.button
            className="bg-gradient-brand text-brand-black font-semibold px-8 py-3 rounded-brand-lg hover:shadow-brand-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const waitlistElement = document.getElementById('waitlist');
              if (waitlistElement) {
                waitlistElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}