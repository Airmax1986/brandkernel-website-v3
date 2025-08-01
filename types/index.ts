// types/index.ts
// Zentrale Type Definitions für BrandKernel Website

import { ReactNode } from 'react';

// =============================================================================
// COMPONENT PROPS INTERFACES
// =============================================================================

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface LinkButtonProps extends ButtonProps {
  href: string;
  external?: boolean;
}

export interface CtaButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface HeaderProps {
  variant?: 'default' | 'transparent';
  fixed?: boolean;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface FullscreenSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export interface WaitlistFormProps {
  isHidden?: boolean;
  variant?: 'floating' | 'inline';
  showCounter?: boolean;
}

export interface GridContainerProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// =============================================================================
// API INTERFACES
// =============================================================================

export interface WaitlistSubmission {
  email: string;
  timestamp?: Date;
  source?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WaitlistApiResponse extends ApiResponse {
  data?: {
    email: string;
    position?: number;
    totalSignups?: number;
    emailSent?: boolean;
  };
}

// =============================================================================
// CONTENTFUL CMS INTERFACES
// =============================================================================

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface BlogPostEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Rich text or markdown
    publishDate: string;
    featuredImage?: ContentfulAsset;
    author: string;
    tags?: string[];
  };
}

export interface PageEntry {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    metaDescription?: string;
    content: string;
  };
}

// =============================================================================
// NAVIGATION & ROUTING
// =============================================================================

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface FooterLink {
  href: string;
  label: string;
  category: 'product' | 'company' | 'legal' | 'social';
}

// =============================================================================
// FORM INTERFACES
// =============================================================================

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type Theme = 'light' | 'dark';
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;

// Brand-specific types
export type BrandColor = 'brand-white' | 'brand-light' | 'brand-green' | 'brand-purple' | 'brand-black' | 'neutral-50' | 'neutral-100' | 'neutral-200' | 'neutral-300' | 'neutral-400' | 'neutral-500' | 'neutral-600' | 'neutral-700' | 'neutral-800' | 'neutral-900';

// Animation types für Framer Motion
export interface AnimationProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}
