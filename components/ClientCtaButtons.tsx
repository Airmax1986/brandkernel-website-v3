'use client';

import CtaButton from './CtaButton';

export default function ClientCtaButtons() {
  const handleExploreSolutions = () => {
    const solutionsElement = document.getElementById('solutions');
    if (solutionsElement) {
      solutionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16">
      <CtaButton 
        variant="primary" 
        size="lg"
        onClick={handleExploreSolutions}
      >
        Explore Solutions
      </CtaButton>
      
      <CtaButton 
        variant="outline" 
        size="lg"
        onClick={handleJoinWaitlist}
      >
        Join Waitlist
      </CtaButton>
    </div>
  );
}