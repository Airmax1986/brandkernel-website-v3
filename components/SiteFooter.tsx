// components/SiteFooter.tsx
import Link from "next/link";
import GridContainer from "./GridContainer";
import React from "react";

const SiteFooter = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="bg-brand-white text-brand-black py-8 border-t border-brand-light">
      <GridContainer>
        <div className="col-span-full flex justify-between items-center text-sm">
          <span>© {new Date().getFullYear()} BrandKernel</span>
          <div className="flex gap-x-6">
            <Link href="/imprint" className="hover:text-brand-purple transition-colors duration-200">Imprint</Link>
            <Link href="/privacy-policy" className="hover:text-brand-purple transition-colors duration-200">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-brand-purple transition-colors duration-200">Contact</Link>
          </div>
        </div>
      </GridContainer>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";
export default SiteFooter;