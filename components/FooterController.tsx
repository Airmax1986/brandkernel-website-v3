"use client";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import WaitlistForm from "./WaitlistForm";
import SiteFooter from "./SiteFooter";

export default function FooterController() {
  const footerRef = useRef<HTMLElement>(null);
  const isFooterVisible = useIntersectionObserver(footerRef, {
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <>
      <WaitlistForm isHidden={isFooterVisible} />
      <SiteFooter ref={footerRef} />
    </>
  );
}