import Image from 'next/image';

export interface AuthorBioProps {
  name: string;
  bio?: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

/**
 * Author Bio Component with Schema.org Person markup
 * Displays author information with social links and generates structured data for SEO
 */
export default function AuthorBio({
  name,
  bio,
  avatar,
  linkedin,
  twitter,
  website
}: AuthorBioProps) {
  // Generate Schema.org Person markup
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    ...(bio && { "description": bio }),
    ...(avatar && { "image": avatar }),
    ...(website && { "url": website }),
    "sameAs": [
      linkedin,
      twitter,
    ].filter(Boolean) // Remove undefined values
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg p-6 border border-purple-100">
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Author Bio Card */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          {avatar && (
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Bio Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                {name}
              </h3>

              {/* Social Links */}
              {(linkedin || twitter || website) && (
                <div className="flex items-center gap-2 ml-auto">
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#957FFF] transition-colors"
                      aria-label={`${name} on LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}

                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#957FFF] transition-colors"
                      aria-label={`${name} on Twitter`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}

                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#957FFF] transition-colors"
                      aria-label={`${name}'s website`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bio Text */}
            {bio && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {bio}
              </p>
            )}
          </div>
        </div>
    </div>
  );
}
