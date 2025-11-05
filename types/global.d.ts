// Global type declarations

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'consent' | 'event' | 'js' | 'set',
      targetIdOrDate?: string | Date | Record<string, any>,
      config?: any
    ) => void;
    dataLayer: any[];
  }
}

export {};