// Global type declarations

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'consent' | 'event',
      targetId: string,
      config?: any
    ) => void;
  }
}

export {};