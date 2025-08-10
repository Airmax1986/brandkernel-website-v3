'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Inline critical CSS to prevent layout shift
const cookieConsentStyles = `
  .cookie-consent-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
  }
  .cookie-consent-wrapper.show {
    transform: translateY(0);
  }
  .cookie-consent-banner {
    background: #000000;
    color: #ffffff;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
  .cookie-consent-message {
    flex: 1;
    font-size: 14px;
    line-height: 1.5;
  }
  .cookie-consent-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .cookie-consent-button {
    background: #957FFF;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    min-height: 44px;
    touch-action: manipulation;
  }
  .cookie-consent-button:hover {
    background: #7a63ff;
  }
  .cookie-consent-link {
    color: #957FFF;
    text-decoration: underline;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    .cookie-consent-banner {
      flex-direction: column;
      text-align: center;
    }
    .cookie-consent-button {
      width: 100%;
    }
  }
`

export default function CookieConsentOptimized() {
  const [showBanner, setShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if consent was already given
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Delay showing banner to prevent initial CLS
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
    
    // Initialize analytics after consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  }

  if (!mounted || !showBanner) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cookieConsentStyles }} />
      <div className={`cookie-consent-wrapper ${showBanner ? 'show' : ''}`}>
        <div className="cookie-consent-banner" role="dialog" aria-label="Cookie consent">
          <div className="cookie-consent-message">
            This website uses cookies to ensure you get the best experience on our website.
          </div>
          <div className="cookie-consent-actions">
            <a href="/privacy-policy" className="cookie-consent-link">
              Learn more
            </a>
            <button 
              onClick={handleAccept}
              className="cookie-consent-button"
              aria-label="Accept cookies"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}