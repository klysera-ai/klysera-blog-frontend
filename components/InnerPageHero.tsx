'use client';

interface InnerPageHeroProps {
  title: string;
  description?: string;
}

export default function InnerPageHero({ title, description }: InnerPageHeroProps) {
  return (
    <div 
      className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
      style={{ height: '380px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
          {/* Title Section */}
          <div>
            <h1 
              className="text-[#001F3F] dark:text-white text-5xl md:text-[100px]"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontWeight: '400',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Description Section */}
          {description && (
            <div>
              <p 
                className="text-[#001F3F] dark:text-white"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '30px',
                }}
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
