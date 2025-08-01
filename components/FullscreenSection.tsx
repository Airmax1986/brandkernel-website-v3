import GridContainer from "./GridContainer";
import React from "react";

interface FullscreenSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  maxWidth?: string;
}

export default function FullscreenSection({
  id,
  title,
  children,
  bgColor = 'bg-white',
  textColor = 'text-brand-blue',
  maxWidth = 'max-w-4xl',
}: FullscreenSectionProps) {
  return (
    <section id={id} className={`min-h-screen flex items-center justify-center py-24 ${bgColor} ${textColor}`}>
      <GridContainer>
        <div className={`col-span-full text-center ${maxWidth} mx-auto`}>
          <h2 className="text-6xl font-bold">{title}</h2>
          <div className="mt-8 text-2xl font-light leading-relaxed">
            {children}
          </div>
        </div>
      </GridContainer>
    </section>
  );
}