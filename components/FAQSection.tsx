/**
 * FAQ Section Component with Schema.org FAQPage markup
 * Displays frequently asked questions with structured data for SEO
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  className = ''
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Generate Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className={`bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg p-8 border border-purple-100 ${className}`}>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 text-[#957FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {title}
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-lg border border-purple-200 overflow-hidden group"
            >
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-purple-50 transition-colors flex items-center justify-between">
                <span className="flex-1">{faq.question}</span>
                <svg
                  className="w-5 h-5 text-[#957FFF] transform group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-700 leading-relaxed border-t border-purple-100">
                <p className="mt-3">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
    </section>
  );
}

/**
 * Helper function to add FAQ section at the end of blog posts
 * Can be used in blog post pages
 */
export function generateBlogFAQs(postTitle: string, postSummary?: string): FAQItem[] {
  // This is a template - you can customize based on your content
  return [
    {
      question: `What is ${postTitle} about?`,
      answer: postSummary || `This article covers key insights and strategies related to ${postTitle}.`
    },
    {
      question: 'Who should read this article?',
      answer: 'This article is perfect for founders, freelancers, and creators looking to improve their brand strategy and positioning.'
    },
    {
      question: 'How can I apply these insights to my brand?',
      answer: 'Start by understanding your core values and unique positioning. Use our AI Brand Consultant to guide you through the strategic discovery process.'
    }
  ];
}
