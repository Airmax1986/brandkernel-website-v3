# BrandKernel Website - Complete Design System & Component Structure Documentation

**Branch:** `claude/code-quality-analysis-report-011CV4PGND7jx26mvEXeLuW6`
**Last Updated:** November 2025

---

## TABLE OF CONTENTS
1. [Design System Overview](#design-system-overview)
2. [Color Scheme](#color-scheme)
3. [Typography System](#typography-system)
4. [Spacing & Layout System](#spacing--layout-system)
5. [Component Architecture](#component-architecture)
6. [Main Page Components](#main-page-components)
7. [Button Components](#button-components)
8. [Custom Hooks](#custom-hooks)
9. [Animation & Interaction Patterns](#animation--interaction-patterns)
10. [Responsive Breakpoints](#responsive-breakpoints)

---

## DESIGN SYSTEM OVERVIEW

### Brand Identity
- **Brand Name:** BrandKernel
- **Tagline:** "Your breakthrough starts with clarity"
- **Target Audience:** Founders, Freelancers, Creators
- **Key Message:** AI-guided brand strategy through dialogue

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** TailwindCSS with custom configuration
- **Animation:** Framer Motion
- **Font:** Inter (Google Fonts, 300/500/700 weights)
- **Analytics:** Google Analytics (Vercel Analytics, Speed Insights)

### File Structure
```
/components/          # UI Components
  ├── Header.tsx
  ├── Hero.tsx
  ├── SolutionsSection.tsx
  ├── CtaButton.tsx
  ├── SecondaryButton.tsx
  ├── SiteFooter.tsx
  ├── GridContainer.tsx
  ├── FullscreenSection.tsx
  └── [other components]
/app/                # Next.js App Router pages
  ├── layout.tsx     # Root layout with globals
  ├── page.tsx       # Homepage
  └── [other routes]
/lib/                # Utilities & helpers
  ├── utils.ts
  ├── types.ts
  └── [schemas, metadata, etc]
/hooks/              # Custom React hooks
  └── [custom hooks for common functionality]
/tailwind.config.ts  # Design tokens configuration
```

---

## COLOR SCHEME

### Primary Brand Colors (NEW - Vibrant Theme)
All colors are **SOLID** - no gradients used on solid color swatches.

```
brand-white:   #FFFFFF    // Pure white
brand-light:   #D4D4D6    // Light gray (used for backgrounds)
brand-green:   #D8FF96    // Vibrant lime green (primary CTA)
brand-purple:  #7D5FFF    // Rich purple (accents, hover states)
brand-orange:  #FF5A21    // Vibrant orange (alternative accent)
brand-black:   #000000    // Pure black
```

### Color Usage Patterns
- **CTAs & Primary Actions:** `brand-green` (#D8FF96) on dark backgrounds
- **Hover States:** `brand-purple` (#7D5FFF)
- **Accents & Highlights:** `brand-purple` or `brand-orange`
- **Background Fills:** `brand-white` or `brand-light`
- **Text:** `brand-black` (primary), `brand-purple` (links)
- **Borders:** `brand-light` (subtle), `brand-purple` (interactive)

### Semantic Colors
```
success:  #22c55e (green-500)
warning:  #f59e0b (amber-500)
error:    #ef4444 (red-500)
```

### Neutral Gray Scale
```
neutral-25:   #fafafa   // Lightest gray
neutral-50:   #D4D4D6   // Light (mapped to brand-light)
neutral-100:  #f3f4f6
neutral-200:  #e5e7eb
neutral-300:  #d1d5db
neutral-400:  #9ca3af
neutral-500:  #6b7280
neutral-600:  #4b5563
neutral-700:  #374151
neutral-800:  #1f2937
neutral-900:  #111827
neutral-950:  #000000   // Black (mapped to brand-black)
```

### Legacy Color Palette (for compatibility)
- **brand-blue-500:** #7D5FFF (now primary purple)
- Includes 50-900 scale for gradient support

---

## TYPOGRAPHY SYSTEM

### Font Family
- **Primary Font:** Inter (from Google Fonts)
- **Font Weights:** 300 (light), 500 (normal), 700 (bold)
- **Font Display:** swap (shows fallback immediately)

### Custom Font Sizes (defined in tailwind.config.ts)

| Size Class    | Actual Size  | Line Height | Font Weight | Usage |
|---------------|--------------|------------|------------|--------|
| `text-nav`    | 1.3rem (20.8px) | 1.5 | 400 | Navigation links |
| `text-header` | 1rem (16px) | 1.5 | 600 | Headers |
| `text-hero` | 2rem (32px) | 1.1 | 700 | H1 - Tighter for impact |
| `text-hero-lg` | 2.5rem (40px) | 1.1 | 700 | Large hero text |
| `text-hero-xl` | 3rem (48px) | 1.1 | 700 | Extra large hero (desktop) |
| `text-subheading` | 1.25rem (20px) | 1.4 | 600 | Section subheadings |
| `text-body-lg` | 1.125rem (18px) | 1.6 | 400 | Body text |
| `text-base` | 1rem (16px) | 1.5 | 400 | Default body |
| `text-sm` | 0.875rem (14px) | 1.4 | 400 | Small text |
| `text-caption` | 0.875rem (14px) | 1.4 | 400 | Captions |

### Typography Patterns

**Hero Heading (Desktop):**
```tsx
className="text-6xl lg:text-7xl xl:text-8xl font-regular leading-tight"
// Results in bold, tight line-height for visual impact
```

**Section Headers:**
```tsx
className="text-hero-lg text-brand-black h1-spacing"
// Uses custom spacing utility: margin-bottom 2rem
```

**Body Copy:**
```tsx
className="text-body-lg text-neutral-600"
// 18px with 1.6 line height, readable on all devices
```

### Custom Text Utilities
- `.text-gradient-brand` - Gradient text (green to purple)
- `.h1-spacing` - Line-height 1.1 + margin-bottom 2rem

---

## SPACING & LAYOUT SYSTEM

### Custom Spacing Scale (in rem units)

```
page-margin:      2.5rem (40px)   // Outside page margins
page-gutter:      1.5rem (24px)   // Gap between grid columns
section-padding:  3rem (48px)     // Section vertical padding
card-padding:     2rem (32px)     // Card internal spacing
```

### Max Width System
```
max-w-ultra:      1920px          // Ultra-wide layout
max-w-content:    calc(1920px - 3rem)  // Content width with margins
```

### Grid System
- **8-column grid** (GridContainer component)
- **Gap:** 24px (page-gutter)
- **Max Width:** 1920px (ultra-wide)
- **Padding:** 40px (page-margin) on sides

### Responsive Padding
- **Mobile:** Single column, 16px padding
- **Tablet:** 24px padding, multi-column
- **Desktop:** 40px padding, full 8-column grid

---

## COMPONENT ARCHITECTURE

### Component Hierarchy

```
RootLayout
├── Header (Client Component)
├── main#main-content
│   ├── Section: Hero Section
│   ├── Section: Body Content
│   ├── Section: Manifesto
│   ├── Section: Approach
│   ├── Section: How it Works
│   ├── Section: Features
│   ├── Section: Pricing
│   ├── Section: Blog (dynamic)
│   └── Section: Solutions (on dedicated pages)
├── Footer
├── CookieConsent (dynamic, client-only)
├── Analytics (Vercel)
└── SpeedInsights (Vercel)
```

### Component Classification

#### Layout Components
1. **GridContainer** (`/components/GridContainer.tsx`)
   - 8-column responsive grid
   - Handles max-width and side padding
   - Used by all major sections

2. **FullscreenSection** (`/components/FullscreenSection.tsx`)
   - Full viewport height sections
   - Centered content
   - Configurable background/text colors

3. **Header** (`/components/Header.tsx`) - Client Component
   - Fixed navigation bar
   - Responsive mobile menu
   - Scroll-aware styling
   - Brand logo + main nav

#### Hero/CTA Components
1. **Hero** (`/components/Hero.tsx`) - Client Component
   - 50/50 split on desktop (text left, chat right)
   - Mobile-first stacked layout
   - Framer Motion animations
   - Integrated chatbot

2. **CtaButton** (`/components/CtaButton.tsx`) - Client Component
   - Multiple variants: primary, secondary, outline, ghost, danger
   - Multiple sizes: sm, md, lg, xl
   - Renders as `<a>` or `<button>`
   - Hover/tap animations with scale transforms
   - Loading state with spinner

3. **SecondaryButton** (`/components/SecondaryButton.tsx`)
   - Link-based button
   - Uses border styling
   - Purple brand color

#### Content Components
1. **SolutionsSection** (`/components/SolutionsSection.tsx`) - Client Component
   - 3-card grid (responsive to 1-2 on mobile)
   - Intersection Observer for scroll animations
   - Hover effects with scale and shadow
   - Icon, title, description, feature list

2. **SiteFooter** (`/components/SiteFooter.tsx`)
   - Minimal design on brand-white background
   - Copyright + links
   - Semantic HTML with `<footer>` ref

3. **BlogPost** - Displays blog cards from Contentful CMS

---

## MAIN PAGE COMPONENTS

### 1. HEADER COMPONENT
**File:** `/components/Header.tsx`

**Key Features:**
- Fixed positioning (sticky top, z-index: 50)
- Transparent on scroll-up, opaque on scroll-down
- 50/50 split layout (logo + nav left | secondary nav + signup right)
- Mobile hamburger menu with animated icon
- Keyboard support (ESC to close menu)
- Smooth animations with Framer Motion

**Navigation Structure:**
```
Primary Nav (Left):
- Manifest
- Approach
- How it works
- Features
- Pricing

Secondary Nav (Right):
- About
- Blog
- Sign up (button)

Mobile Menu:
- All primary + secondary items
- Divider line
- Full-width "Join Waitlist" button
```

**Styling:**
```tsx
// Desktop nav links
fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "normal"
hover: text-brand-purple transition-colors

// Desktop signup button
bg-brand-white border-neutral-200 text-brand-black
hover: bg-neutral-50

// Mobile menu button
text-brand-black hover:text-brand-purple
```

**Interactive Elements:**
- Hamburger menu toggles mobile navigation
- Click outside menu closes it (useClickOutside hook)
- ESC key closes menu (useKeyPress hook)
- Body scroll locked when menu is open

---

### 2. HERO SECTION
**File:** `/components/Hero.tsx` (also homepage in `app/page.tsx`)

**Desktop Layout (1920px +):**
```
Left 50vw (White):                    Right 50vw (Purple #A364FF):
- Heading (72px)                      - DynamicBrandChatbot
- Subheading (18-24px)                - Chat interface preview
- 3 CTA Buttons (Creators/             
  Freelancers/Founders)
- Text centered, aligned left
```

**Mobile Layout (<1024px):**
```
Top:
- Chat (full width)
- Purple background

Bottom:
- White background
- Heading (36-48px)
- Subheading
- Waitlist form
- Signup link
```

**Hero Text:**
```
Primary: "Finally. The AI dialogue that builds your <Brand Kernel> and changes everything."
Secondary: "You're a brilliant entrepreneur lost in the noise, seeking traction, clients and growth..."
```

**Interactive Elements:**
- Framer Motion fade-in animations
- CTA buttons link to path pages: `/creators`, `/freelancers`, `/founders`
- Waitlist form variant support (mobile/desktop)
- Smooth scroll on wait for element

**Key Measurements:**
- Desktop: min-h-screen (100vh)
- Mobile: auto height with chat first
- Chat background: #A364FF (custom purple)
- Chat padding: 8px with 1.5rem border

---

### 3. SOLUTIONS SECTION
**File:** `/components/SolutionsSection.tsx`

**Structure:**
```
Header:
- "Our Solutions" (text-hero-lg)
- Description (text-body-lg)

Grid Layout:
- 3 columns (desktop)
- 2 columns (tablet)
- 1 column (mobile)
- Gap: 2rem

Cards:
1. Brand Strategy (🎯)
   - Features: Market Analysis, Brand Positioning, Competitive Research, Strategy Roadmap

2. Visual Identity (🎨)
   - Features: Logo Design, Color Palette, Typography, Brand Guidelines

3. Digital Presence (💻)
   - Features: Website Design, Social Media, Digital Marketing, Content Strategy

CTA Section:
- "Get Started Today" button (green)
- Scrolls to waitlist on click
```

**Card Design:**
```
bg-brand-white
border-1 border-brand-light
rounded-brand (10px)
p-card-padding (32px)
h-full (flex)

Hover States:
- y: -8px (lifted)
- scale: 1.02
- shadow: brand-lg
- border: brand-purple/20

Feature List:
- Checkmark icon (brand-green)
- text-sm text-neutral-700
```

**Animations (Intersection Observer):**
- Container stagger: 0.2s delay between items
- Item: fade-in-up with scale 0.95 → 1
- Feature list: sequential stagger by 0.1s

---

### 4. CTA & BUTTON COMPONENTS

#### CtaButton Component
**File:** `/components/CtaButton.tsx`

**Variants:**
```tsx
primary:   "bg-brand-green text-brand-black"
secondary: "bg-brand-white text-brand-black border-brand-light"
outline:   "bg-transparent text-brand-purple border-brand-purple"
ghost:     "bg-transparent text-brand-black"
danger:    "bg-error-500 text-white"

// All support hover:shadow and focus:ring-brand-purple
```

**Sizes:**
```tsx
sm:  "px-3 py-1.5 text-sm rounded-brand"
md:  "px-6 py-2.5 text-base rounded-brand"
lg:  "px-8 py-3 text-lg rounded-brand-lg"
xl:  "px-10 py-4 text-xl rounded-brand-lg"
```

**Features:**
- Renders as `<a>` tag if `href` provided
- External link detection (http/mailto/tel)
- Loading state with spinner animation
- Disabled state support
- Keyboard accessible (focus ring)
- Custom scale animations on hover (1.05) and tap (0.95)

**Interaction Pattern:**
```tsx
onMouseEnter: scale(1.05) translateY(-2px)
onMouseLeave: scale(1) translateY(0)
onMouseDown: scale(0.95) translateY(0)
onMouseUp: scale(1.05) translateY(-2px)
```

#### SecondaryButton Component
**File:** `/components/SecondaryButton.tsx`

- Link-based button
- Border-2 brand-blue
- text-brand-blue
- Hover: bg-brand-blue text-white
- Simple design for secondary actions

---

### 5. FOOTER COMPONENT
**File:** `/components/SiteFooter.tsx` and homepage footer

**Simple Footer (Component):**
```
Copyright: "© 2025 BrandKernel"
Links:
- Imprint
- Privacy Policy
- Contact

Hover states: text-brand-purple
```

**Homepage Footer (Custom HTML):**
```
Background: brand-black (#000000)
Text: brand-white

Left Section:
- Brand name
- Tagline: "Your breakthrough starts with clarity"

Center Section:
- Links: Sign Up, About, Blog, Imprint, Privacy, Contact

Right Section (Social):
- Twitter icon
- LinkedIn icon
- Instagram icon

Copyright bar:
- Border-top neutral-800
- "© 2025 BrandKernel. All rights reserved."
```

**Styling:**
```
All links: text-neutral-400 hover:text-brand-white
Social icons: w-5 h-5 fill-currentColor
```

---

## BUTTON COMPONENTS

### Button Variants Summary

| Variant | Background | Text | Border | Hover | Use Case |
|---------|-----------|------|--------|-------|----------|
| Primary | brand-green | brand-black | none | shadow-md | Main CTA |
| Secondary | brand-white | brand-black | brand-light | bg-light | Alternative action |
| Outline | transparent | brand-purple | brand-purple | bg-purple text-white | Link-style button |
| Ghost | transparent | brand-black | none | bg-light | Subtle action |
| Danger | error-500 | white | none | error-600 | Destructive action |

### Button Size Examples

**Size: MD (default)**
```tsx
<CtaButton variant="primary" size="md" href="/signup">
  Sign Up
</CtaButton>
// Result: px-6 py-2.5 text-base rounded-brand
```

**Size: LG**
```tsx
<CtaButton variant="primary" size="lg">
  Get Started Today
</CtaButton>
// Result: px-8 py-3 text-lg rounded-brand-lg
```

---

## CUSTOM HOOKS

Located in `/hooks/index.ts` - Comprehensive set of utility hooks:

### Storage Hooks (SSR-safe)
- **useLocalStorage** - Persist data across sessions
- **useSessionStorage** - Temp storage cleared on tab close

### UI/Interaction Hooks
- **useClickOutside** - Detect clicks outside element
- **useKeyPress** - Detect specific key presses (ESC, Enter, etc.)
- **useScrollPosition** - Track { x, y } scroll offset
- **useMediaQuery** - Respond to media query matches
- **useIntersectionObserver** - Trigger on scroll visibility

### Utility Hooks
- **useDebounce** - Debounce values for search/resize

### Example: useIntersectionObserver
```tsx
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

return (
  <motion.div ref={ref}>
    {isVisible && <Component />}
  </motion.div>
);
```

---

## ANIMATION & INTERACTION PATTERNS

### Framer Motion Animations

**1. Fade In (0.5s ease-in-out)**
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

**2. Fade In Up (0.6s ease-out)**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**3. Fade In Down (0.6s ease-out)**
```tsx
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**4. Scale In (0.3s ease-out)**
```tsx
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
```

**5. Slide In (0.5s ease-out)**
```tsx
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
```

### Container Stagger Animation (SolutionsSection)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,    // 0.2s between each child
      delayChildren: 0.1       // Start delay
    }
  }
};
```

### Hover Effects

**Scale + Lift Pattern (Solutions Cards):**
```tsx
whileHover={{ y: -8, scale: 1.02 }}
transition={{ duration: 0.3 }}
// Combined with shadow change on hover
```

**Button Scale Pattern:**
```tsx
whileHover={{ scale: 1.05, y: -2 }}
whileTap={{ scale: 0.95 }}
```

### Custom Tailwind Animations

**Pulse Brand (2s infinite):**
```css
animation: pulseBrand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
// Expands purple glow ring
```

**Gradient Brand Animate (25s):**
- Radial gradient that shifts position
- Uses 7 keyframe stops
- Creates flowing animated background

**Organic Gradient (15s):**
- Subtle flowing liquid effect
- 10% keyframe increments
- Multiple radial gradients blend

**Bounce Gentle (2s):**
```css
0%, 100%: translateY(0)
50%: translateY(-5px)
// Soft bobbing motion
```

### Glass Morphism
Custom utility `.glass`:
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Scroll-triggered Animation
Using `useIntersectionObserver`:
```tsx
{isVisible && (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    {/* Animates when element enters viewport */}
  </motion.div>
)}
```

---

## RESPONSIVE BREAKPOINTS

### Tailwind Custom Breakpoints
```
xs:   475px   // Extra small (custom)
sm:   640px   // Small
md:   768px   // Medium
lg:   1024px  // Large (main desktop breakpoint)
xl:   1280px  // Extra large
2xl:  1536px  // 2x extra large
3xl:  1920px  // Ultra wide (custom)
```

### Component Responsive Strategies

**Header:**
- `md:flex hidden` - Hide nav on mobile, show on md+
- `md:hidden` - Show hamburger only on mobile

**Hero Section:**
```tsx
<div className="lg:hidden">
  {/* Mobile layout: stacked, chat first */}
</div>

<div className="hidden lg:grid lg:grid-cols-2 gap-16">
  {/* Desktop: 50/50 split */}
</div>
```

**Solutions Section:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
// Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols
```

**Typography Scaling:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
  Heading
</h1>
// Scales from 30px on mobile to 84px on xl
```

### Mobile-First Layout Pattern
1. Default styles = mobile optimized
2. `sm:` = applies at 640px+
3. `md:` = applies at 768px+
4. `lg:` = applies at 1024px+
5. `xl:` = applies at 1280px+

---

## BORDER RADIUS SYSTEM

```
rounded-brand:     0.625rem (10px)   // Default card radius
rounded-brand-lg:  1rem (16px)       // Larger radius
rounded-brand-xl:  1.5rem (24px)     // Extra large (buttons)
```

## SHADOW SYSTEM

### Brand-specific Shadows
```
shadow-brand-sm:   0 2px 4px rgba(149, 127, 255, 0.1)
shadow-brand:      0 4px 6px / 0 2px 4px rgba(149, 127, 255, 0.1)
shadow-brand-md:   0 10px 15px / 0 4px 6px rgba(149, 127, 255, 0.1)
shadow-brand-lg:   0 20px 25px / 0 10px 10px rgba(149, 127, 255, 0.1)
shadow-brand-xl:   0 25px 50px rgba(149, 127, 255, 0.25)

// Color-specific
shadow-brand-green:   Green tint (216, 255, 150)
shadow-brand-orange:  Orange tint (255, 90, 33)
shadow-brand-purple:  Purple tint (149, 127, 255)

// Glow effects
shadow-glow-sm:   0 0 10px rgba(149, 127, 255, 0.3)
shadow-glow:      0 0 20px rgba(149, 127, 255, 0.4)
shadow-glow-lg:   0 0 30px rgba(149, 127, 255, 0.5)

// Soft shadows
shadow-soft:      0 2px 15px rgba(0, 0, 0, 0.08)
shadow-soft-lg:   0 10px 40px rgba(0, 0, 0, 0.12)
```

---

## SPECIAL STYLING UTILITIES

### Custom Tailwind Utilities (from plugins)

**Text Gradient:**
```tsx
className="text-gradient-brand"
// Background: linear-gradient(135deg, #B8FF4D 0%, #7D5FFF 100%)
// Effect: -webkit-background-clip: text
```

**Glass Effect:**
```tsx
className="glass"
// Semi-transparent white with blur
```

**Custom Scrollbar:**
```tsx
className="scrollbar-thin"
// Purple #7D5FFF colored thin scrollbar
```

**Ultra Container:**
```tsx
className="container-ultra"
// max-w: 1920px, px: 2.5rem, mx: auto
```

**H1 Spacing:**
```tsx
className="h1-spacing"
// line-height: 1.1, margin-bottom: 2rem
```

---

## KEY UI PATTERNS

### 1. Stacked Section Layout
```tsx
<section className="py-section-padding bg-brand-white">
  <div className="container-ultra">
    {/* Header with animation */}
    <motion.div className="text-center mb-16">
      <h2 className="text-hero-lg">Title</h2>
      <p className="text-body-lg">Description</p>
    </motion.div>

    {/* Grid content */}
    <motion.div className="grid grid-cols-3 gap-8">
      {/* Cards */}
    </motion.div>

    {/* CTA footer */}
    <motion.div className="text-center mt-16">
      <CtaButton>Action</CtaButton>
    </motion.div>
  </div>
</section>
```

### 2. Card with Hover State
```tsx
<motion.div
  className="bg-brand-white border-1 border-brand-light rounded-brand p-card-padding hover:shadow-brand-lg"
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### 3. Mobile/Desktop Split Layout
```tsx
{/* Mobile layout */}
<div className="lg:hidden flex flex-col gap-12">
  {/* Stacked content */}
</div>

{/* Desktop layout */}
<div className="hidden lg:grid lg:grid-cols-2 gap-16">
  {/* Side-by-side content */}
</div>
```

### 4. Scroll-triggered Animations
```tsx
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

<motion.div
  ref={ref}
  initial="hidden"
  animate={isVisible ? "visible" : "hidden"}
  variants={containerVariants}
>
  {/* Auto-animates when scrolled into view */}
</motion.div>
```

### 5. Interactive Header with Mobile Menu
```tsx
- Fixed positioning
- Scroll detection (opacity change)
- Mobile hamburger (animated icon)
- Click-outside detection
- ESC key handling
- Body scroll lock when open
```

---

## ACCESSIBILITY FEATURES

### Implemented Patterns
1. **Semantic HTML:** Proper use of `<header>`, `<main>`, `<footer>`, `<nav>`
2. **ARIA Labels:** 
   - `aria-label` on buttons
   - `aria-expanded` on menu triggers
   - `aria-controls` linking triggers to content
3. **Focus Management:**
   - Focus rings on interactive elements
   - `focus:ring-2 focus:ring-brand-purple focus:ring-offset-2`
   - Skip to main content link
4. **Keyboard Navigation:**
   - All buttons keyboard accessible
   - ESC key closes menus
   - Tab order follows DOM
5. **Text Alternatives:**
   - `aria-hidden="true"` on decorative SVGs
   - `sr-only` class for screen reader text

### Accessibility Defaults
```tsx
// All buttons have focus rings
focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2

// Skip navigation link (hidden until focused)
sr-only focus:not-sr-only focus:absolute focus:z-50
focus:bg-brand-purple focus:text-white
```

---

## PERFORMANCE OPTIMIZATIONS

### Implemented Strategies
1. **Font Optimization:**
   - `display: swap` - Shows fallback immediately
   - Preload: true
   - Adjust font fallback for CLS reduction

2. **Image Optimization:**
   - OptimizedImage component (custom)
   - Lazy loading support
   - Responsive srcset

3. **Component Lazy Loading:**
   - CookieConsent: dynamic import, ssr: false
   - Prevents layout shift during hydration

4. **Analytics Async:**
   - Vercel Analytics
   - Vercel Speed Insights
   - Google Analytics with consent mode

5. **Preconnects (in <head>):**
   - Google Fonts
   - Contentful CDN
   - Google Tag Manager

---

## DEVELOPMENT GUIDELINES

### Component Creation Checklist
- [ ] Use TypeScript interfaces for props
- [ ] Add 'use client' if using client-side hooks/state
- [ ] Use Framer Motion for animations
- [ ] Ensure Tailwind classes are used
- [ ] Add accessibility attributes (aria-*, role)
- [ ] Support mobile-first responsive design
- [ ] Use custom hooks for common logic
- [ ] Import types from @/types/index.ts
- [ ] Test focus states and keyboard nav

### Color Usage Checklist
- [ ] Primary CTA: brand-green (#D8FF96)
- [ ] Hover states: brand-purple (#7D5FFF)
- [ ] Borders: brand-light (#D4D4D6)
- [ ] Text: brand-black (#000000)
- [ ] Background: brand-white or brand-light
- [ ] Links: text-brand-purple

### Animation Guidelines
- [ ] Use Framer Motion for all animations
- [ ] Combine with Tailwind for quick transitions
- [ ] Respect `prefers-reduced-motion` when possible
- [ ] Keep animations under 0.6s for UI feedback
- [ ] Use stagger for lists (0.1-0.2s between items)
- [ ] Implement scroll triggers with useIntersectionObserver

---

## FUTURE ENHANCEMENT OPPORTUNITIES

1. **Dark Mode Support:** Add theme toggle with prefers-color-scheme
2. **Advanced Animations:** Implement more complex gesture-driven animations
3. **Component Library:** Extract more reusable components
4. **Design Tokens:** Consider using CSS variables for dynamic theming
5. **Internationalization:** Prepare for multi-language support
6. **Form Validation:** Enhanced validation components
7. **State Management:** Consider Redux/Zustand for complex state

---

