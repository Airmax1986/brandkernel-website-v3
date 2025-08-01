# BrandKernel Website V2 🚀

Eine moderne, performante Website für BrandKernel - gebaut mit Next.js 14, TypeScript und Tailwind CSS.

## ✨ **Features**

### **🎯 Core**
- **Next.js 14** App Router mit Server/Client Components
- **TypeScript** für type-safe development
- **Tailwind CSS** mit custom Design System
- **Framer Motion** für smooth animations
- **Contentful CMS** für Content Management
- **Redis** für Caching und Session Management

### **🔧 Enhanced V2**
- **Comprehensive TypeScript Types** - Vollständige Type Coverage
- **Advanced Component Architecture** - Wiederverwendbare, accessible Components
- **Mobile-First Responsive Design** - Optimiert für alle Devices
- **Custom Hook Library** - Powerful React Hooks für enhanced UX
- **Utility Functions** - Comprehensive helper functions
- **Design System** - Consistent spacing, colors, typography
- **Accessibility** - WCAG compliant components
- **Performance Optimized** - Advanced caching und lazy loading

## 🏗️ **Projekt Struktur**

```
brandkernel-website/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route Groups
│   ├── api/               # API Routes
│   ├── globals.css        # Global Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Homepage
├── components/            # React Components
│   ├── CtaButton.tsx      # Enhanced CTA Button
│   ├── Header.tsx         # Responsive Header
│   ├── WaitlistForm.tsx   # Enhanced Form
│   └── ...
├── hooks/                 # Custom React Hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useClickOutside.ts
│   └── ...
├── lib/                   # Utilities & Configs
│   └── utils.ts           # Comprehensive utilities
├── types/                 # TypeScript Definitions
│   └── index.ts           # Centralized types
├── public/               # Static Assets
└── tailwind.config.ts    # Enhanced Tailwind Config
```

## 🎨 **Design System**

### **Colors**
```css
/* Primary Brand Colors */
brand-blue-500: #4A4AFF    /* Main brand color */
brand-blue-50: #f0f0ff     /* Light variant */
brand-blue-900: #1f1faa    /* Dark variant */

/* Gradient Colors */
gradient-brand: linear-gradient(135deg, #f97316 0%, #d946ef 50%, #9333ea 100%)
```

### **Typography**
```css
text-hero:      32px (2rem) - Hero headings
text-hero-lg:   40px (2.5rem) - Large hero
text-hero-xl:   48px (3rem) - XL hero
text-header:    16px (1rem) - Header navigation
text-subheading: 20px (1.25rem) - Subheadings
text-body-lg:   18px (1.125rem) - Large body text
```

### **Spacing**
```css
page-margin:     24px (1.5rem) - Consistent page margins
page-gutter:     24px (1.5rem) - Element spacing
section-padding: 48px (3rem) - Section padding
card-padding:    32px (2rem) - Card internal padding
```

## 🚀 **Getting Started**

### **Installation**
```bash
# Clone repository
git clone https://github.com/Airmax1986/brandkernel-website.git
cd brandkernel-website

# Checkout V2 branch
git checkout v2

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Variables**
```env
# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### **Development Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
```

## 🧩 **Components Overview**

### **Enhanced Components (V2)**

#### **CtaButton**
```tsx
<CtaButton 
  href="/waitlist" 
  variant="primary" 
  size="lg"
  className="custom-class"
>
  Join Waitlist
</CtaButton>
```

#### **Header**
```tsx
<Header 
  variant="transparent" 
  fixed={true} 
/>
```

#### **WaitlistForm**
```tsx
<WaitlistForm 
  isHidden={false}
  variant="floating"
  showCounter={true}
/>
```

## 🔧 **Custom Hooks**

### **Storage Hooks**
```tsx
const [value, setValue, removeValue] = useLocalStorage('key', 'defaultValue');
const [sessionData, setSessionData] = useSessionStorage('session', {});
```

### **UI Hooks**
```tsx
const debouncedValue = useDebounce(searchTerm, 300);
const outsideRef = useClickOutside(() => setIsOpen(false));
const { x, y } = useScrollPosition();
const isMobile = useMediaQuery('(max-width: 768px)');
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
```

## 🛠️ **Utility Functions**

### **Common Utilities**
```tsx
import { cn, validateEmail, formatDate, slugify, copyToClipboard } from '@/lib/utils';

// Class merging
const className = cn('base-class', condition && 'conditional-class');

// Email validation
const isValid = validateEmail('user@example.com');

// Date formatting
const formatted = formatDate(new Date(), 'de-DE');

// URL-friendly slugs
const slug = slugify('Hello World!'); // 'hello-world'

// Clipboard operations
await copyToClipboard('Text to copy');
```

## 📱 **Responsive Design**

### **Breakpoints**
```css
xs:  475px   /* Extra small devices */
sm:  640px   /* Small devices */
md:  768px   /* Medium devices */
lg:  1024px  /* Large devices */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X large devices */
3xl: 1920px  /* Ultra wide */
```

### **Mobile-First Approach**
```tsx
<div className="
  px-4 py-2           /* Mobile default */
  sm:px-6 sm:py-3     /* Small screens */
  lg:px-page-margin   /* Large screens */
">
```

## ♿ **Accessibility Features**

- **ARIA Labels** für Screen Reader Support
- **Keyboard Navigation** für alle interaktive Elemente
- **Focus Management** mit visible focus indicators
- **Semantic HTML** für bessere Struktur
- **Color Contrast** WCAG AA compliant
- **Reduced Motion** Support für Animationen

## 🎯 **Performance Optimizations**

- **Next.js App Router** für optimized loading
- **Image Optimization** mit Next.js Image
- **Font Optimization** mit next/font
- **Code Splitting** automatic durch Next.js
- **Caching Strategies** mit Redis
- **Lazy Loading** für Components und Images

## 🔍 **TypeScript Integration**

### **Strict Type Safety**
```tsx
// Centralized type definitions
import { CtaButtonProps, WaitlistFormProps } from '@/types';

// API response types
interface WaitlistApiResponse extends ApiResponse {
  data?: {
    email: string;
    position?: number;
    totalSignups?: number;
  };
}
```

## 🎨 **Animation System**

### **Framer Motion Integration**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="animate-fade-in-up"
>
  Content
</motion.div>
```

### **CSS Animations**
```css
/* Custom animations in Tailwind config */
animate-fade-in
animate-fade-in-up
animate-slide-in-left
animate-bounce-gentle
animate-pulse-brand
```

## 🔐 **Security Best Practices**

- **Input Validation** client und server-side
- **CSRF Protection** für Forms
- **Rate Limiting** für API endpoints
- **Sanitized Outputs** XSS prevention
- **Environment Variables** für sensitive data

## 📊 **Monitoring & Analytics**

- **Error Boundary** Components für graceful error handling
- **Performance Monitoring** mit Next.js Analytics
- **User Interaction Tracking** Events
- **Conversion Funnel** für Waitlist

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
# Automatic deployment via GitHub integration
git push origin v2
```

### **Manual Deployment**
```bash
npm run build
npm run start
```

## 🤝 **Contributing**

1. **Branch erstellen**: `git checkout -b feature/new-feature`
2. **Changes committen**: `git commit -m 'feat: add new feature'`
3. **Push to branch**: `git push origin feature/new-feature`
4. **Pull Request erstellen**

## 📝 **Commit Convention**

```
feat: neue Features
fix: Bug fixes
docs: Dokumentation
style: Code formatting
refactor: Code refactoring
test: Tests hinzufügen
chore: Build/config changes
```

## 📄 **License**

Private - BrandKernel Website

---

## 📞 **Support & Contact**

Bei Fragen oder Problemen:
- **GitHub Issues** für Bug Reports
- **Discussions** für Feature Requests
- **Email** für direkte Kommunikation

**Built with ❤️ for BrandKernel**

---

## 🔧 **Build Status**

- **✅ TypeScript**: All types resolved
- **✅ Hooks**: Import conflicts fixed
- **✅ Dependencies**: Clean package.json
- **✅ Utils**: Lightweight utility functions
- **✅ Ready for Production**: All build errors resolved
