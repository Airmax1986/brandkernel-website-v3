"use client";
import { motion } from "framer-motion";
import GridContainer from "./GridContainer";
import CtaButton from "./CtaButton";
import OptimizedBrandChat from "./OptimizedBrandChat";

export default function Hero() {
  return (
    <section className="flex items-start lg:items-center justify-center min-h-fit lg:min-h-screen py-16 sm:py-24 lg:py-32">
      <GridContainer>
        {/* Mobile-First Layout */}
        <div className="col-span-full">
          
          {/* Mobile Layout: Chat First, then Content */}
          <div className="lg:hidden flex flex-col gap-12">
            {/* Chat Interface on Mobile - First */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <OptimizedBrandChat />
            </motion.div>

            {/* Text Content on Mobile - Second */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-regular leading-tight mb-6">
                The Conversation That Changes Everything.
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-3xl">
                While millions fight for attention with generic AI content, the winners go deeper. BrandKernel guides you through the strategic dialogue that uncovers your authentic positioning—the foundation successful creators, consultants, and founders build empires on.
              </p>

              <div className="w-full max-w-2xl">
                <p className="text-center text-lg sm:text-xl mb-6">Choose your path</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <CtaButton href="/creators">Creator</CtaButton>
                  <CtaButton href="/freelancers">Freelancer</CtaButton>
                  <CtaButton href="/founders">Founder</CtaButton>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout: 50/50 Split */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <motion.div
              className="flex flex-col items-start text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-regular leading-tight mb-8">
                The Conversation That Changes Everything.
              </h1>
              
              <p className="text-xl lg:text-2xl xl:text-3xl font-light mb-12 max-w-2xl">
                While millions fight for attention with generic AI content, the winners go deeper. BrandKernel guides you through the strategic dialogue that uncovers your authentic positioning—the foundation successful creators, consultants, and founders build empires on.
              </p>

              <div className="w-full">
                <p className="text-center text-xl mb-6">Choose your path</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CtaButton href="/creators">Creator</CtaButton>
                  <CtaButton href="/freelancers">Freelancer</CtaButton>
                  <CtaButton href="/founders">Founder</CtaButton>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Chat Interface */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OptimizedBrandChat />
            </motion.div>

          </div>
        </div>
      </GridContainer>
    </section>
  );
}