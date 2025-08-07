'use client';

import { useState, useCallback } from 'react';
import { formatWaitlistCount } from '@/lib/waitlist-counter';

interface WaitlistApiResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    position?: number;
    totalSignups?: number;
    emailSent?: boolean;
  };
  error?: string;
}

interface HeroWaitlistFormProps {
  variant?: 'mobile' | 'desktop';
}

export default function HeroWaitlistForm({ variant = 'desktop' }: HeroWaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // Email validation
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Handle input change
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
    
    // Clear success state when user types
    if (isSuccess) {
      setIsSuccess(false);
      setMessage('');
    }
  }, [validationError, isSuccess]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email.trim()) {
      setValidationError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setValidationError('');

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email.trim(),
          source: `hero-${variant}`,
          timestamp: new Date().toISOString(),
          sendWelcomeEmail: true
        }),
      });

      const data: WaitlistApiResponse = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setMessage(`🎉 Welcome! You're on our waitlist.`);
        setEmail(''); // Clear email on success
        
        // Track success
        console.log('Waitlist signup successful:', data.data);
        
        // Optional: Send analytics event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            method: `hero_${variant}`,
            email_domain: email.split('@')[1]
          });
        }
        
      } else {
        const errorMessage = data.error || data.message || 'Failed to join waitlist';
        setMessage(errorMessage);
        console.error('Waitlist API error:', data);
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setMessage('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [email, validateEmail, variant]);

  // Mobile layout
  if (variant === 'mobile') {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center gap-4">
          <p className="text-brand-black text-base font-bold">Join our Waitlist</p>
          
          {isSuccess ? (
            <div className="text-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-2">
                {message}
              </div>
              <p className="text-brand-black/80 text-sm">{formatWaitlistCount()}</p>
            </div>
          ) : (
            <>
              <div className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAFF96] focus:border-transparent text-base shadow-sm ${
                      validationError ? 'border-red-400' : 'border-neutral-300'
                    }`}
                    disabled={isLoading}
                  />
                  {validationError && (
                    <p className="text-red-500 text-sm mt-1">{validationError}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !email.trim()}
                  className="bg-[#DAFF96] text-brand-black p-3 rounded-lg hover:bg-[#DAFF96]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <p className="text-brand-black/80 text-base">{formatWaitlistCount()}</p>
              </div>
              
              {message && !isSuccess && (
                <div className="text-center text-red-500 text-sm mt-2 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="w-full max-w-2xl px-8">
      {isSuccess ? (
        <div className="text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-2">
            {message}
          </div>
          <p className="text-brand-black/80 text-base">{formatWaitlistCount()}</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <p className="text-brand-black text-base font-bold whitespace-nowrap">Join our Waitlist</p>
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAFF96] focus:border-transparent text-base shadow-sm ${
                    validationError ? 'border-red-400' : 'border-neutral-300'
                  }`}
                  disabled={isLoading}
                />
                {validationError && (
                  <p className="absolute top-full left-0 text-red-500 text-sm mt-1">{validationError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="bg-[#DAFF96] text-brand-black p-3 rounded-lg hover:bg-[#DAFF96]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <p className="text-brand-black/80 text-base whitespace-nowrap">{formatWaitlistCount()}</p>
            </div>
          </form>
          
          {message && !isSuccess && (
            <div className="text-center text-red-500 text-sm mt-2 bg-red-50 border border-red-200 rounded px-3 py-2">
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
}