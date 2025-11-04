'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [consentGiven, setConsentGiven] = useState(false)

  // Don't render if no measurement ID is provided
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted') {
      setConsentGiven(true)
    }

    // Listen for consent updates
    const handleConsentUpdate = () => {
      const updatedConsent = localStorage.getItem('cookieConsent')
      if (updatedConsent === 'accepted') {
        setConsentGiven(true)
      }
    }

    window.addEventListener('cookieConsentAccepted', handleConsentUpdate)
    return () => window.removeEventListener('cookieConsentAccepted', handleConsentUpdate)
  }, [])

  return (
    <>
      {/* Initialize consent mode BEFORE GA loads */}
      <Script
        id="google-analytics-consent"
        strategy="beforeInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Set default consent to denied (GDPR compliant)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });

          // Check if consent was already given
          if (typeof window !== 'undefined' && localStorage.getItem('cookieConsent') === 'accepted') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          }
        `}
      </Script>

      {/* Load GA script only after consent */}
      {consentGiven && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-config"
            strategy="afterInteractive"
          >
            {`
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                'transport_type': 'beacon',
                'page_view': true,
                'anonymize_ip': true
              });
            `}
          </Script>
        </>
      )}
    </>
  )
}