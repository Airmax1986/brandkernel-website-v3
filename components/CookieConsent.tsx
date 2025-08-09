'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    CookieConsent: any
  }
}

export default function CookieConsent() {
  useEffect(() => {
    // Load the cookie consent library
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js'
    script.onload = () => {
      // Load CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css'
      document.head.appendChild(link)

      // Initialize cookie consent
      window.CookieConsent.initialise({
        palette: {
          popup: {
            background: '#000000',
            text: '#ffffff'
          },
          button: {
            background: '#957FFF',
            text: '#ffffff'
          }
        },
        theme: 'classic',
        position: 'bottom',
        content: {
          message: 'This website uses cookies to ensure you get the best experience on our website.',
          dismiss: 'Got it!',
          link: 'Learn more',
          href: '/privacy-policy'
        },
        law: {
          regionalLaw: false,
        },
        location: true,
        type: 'info'
      })
    }
    
    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"]')
      const existingLink = document.querySelector('link[href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"]')
      if (existingScript) existingScript.remove()
      if (existingLink) existingLink.remove()
    }
  }, [])

  return null
}