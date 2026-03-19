'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Add your newsletter submission logic here
      // For now, just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container">
      <div className="mx-auto 
            px-4 sm:px-6 lg:px-10  py-[56px] lg:py-[120px] 
            bg-[#F0F4F8] dark:bg-[#02356B]
            border-r-[0.5px] border-l-[0.5px] 
            border-[#B1B9C8] dark:border-[#0557AD] rounded">

          {/* Heading */}
          <div className="max-w-[650px] mb-[24px] sm:mb-[56px] lg:mb-[56px]">
            <h2 
              className="text-[#001F3F] dark:text-white font-['Acid_Grotesk'] text-[24px] lg:text-[36px] font-extralight leading-[36px] lg:leading-[56px]"
            >
              Give us your mail and be the first to Know when there&apos;s an AI apocalypse.
            </h2>
        </div>  

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
        

          {/* Left Content */}
          <div className="flex-1 ">
           

            {/* Subtext */}
            <p 
              className="text-[#68778F] dark:text-[#68778F] mb-[20px] sm:mb-[40px] font-['General_Sans'] text-sm sm:text-base font-normal leading-5 sm:leading-6"
            >
              Strategic partnership combines ElevenLabs&apos; Agents platform with Deloitte&apos;s industry expertise to help enterprises deploy omnichannel agents
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-[20px] sm:space-y-[40px]">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-[#0557AD1A] border border-[#B1B9C8] dark:border-[#0557AD] rounded text-[#001F3F] dark:text-white placeholder:text-[#68778F] focus:outline-none focus:ring-1 focus:ring-[#007AFF] dark:focus:ring-[#0557AD] font-['General_Sans'] text-sm sm:text-base font-normal"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 bg-[#007AFF] dark:bg-[#0557AD] text-white rounded transition-colors hover:bg-[#0051D5] dark:hover:bg-[#044A99] disabled:opacity-50 disabled:cursor-not-allowed font-['General_Sans'] text-sm sm:text-base font-semibold"
              >
                {isSubmitting ? 'Submitting...' : 'Get Newsletters'}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p className="mt-3 text-sm text-[#007AFF] dark:text-[#0557AD]">
                {message}
              </p>
            )}

            {/* Disclaimer */}
            <p 
              className="text-[#68778F] dark:text-[#68778F] mt-3 sm:mt-4 font-['General_Sans'] text-xs sm:text-sm font-normal leading-4 sm:leading-5"
            >
              By submitting this form, you are agreeing to receive timely newsletters and updates about our services. You can unsubscribe at anytime
            </p>
          </div>

          {/* Right Image - Desktop Only */}
          <div className="hidden lg:block flex-shrink-0 flex-1">
            <div 
              className="relative flex items-center justify-center bg-white dark:bg-[#0557AD1A] border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD] rounded overflow-hidden w-full max-w-[593px] h-[304px] p-[12px]"
            >
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center text-[#68778F] border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD]">
              

                {/* Add your newsletter image here */}
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="#F5F7FA"/>
                  <path d="M30 40L50 55L70 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="25" y="35" width="50" height="35" stroke="currentColor" strokeWidth="2" rx="2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Image - Mobile Only */}
          <div className="block lg:hidden w-full">
            <div 
              className="relative p-3 flex items-center justify-center bg-white dark:bg-[#0557AD1A] border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD] rounded overflow-hidden mx-auto w-full max-w-[352px] h-[250px] sm:h-[297px]"
            >
              {/* Placeholder for image */}
              <div 
              className="w-full h-full flex items-center justify-center text-[#68778F] border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD]"
              >
                {/* Add your newsletter image here */}
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="#F5F7FA"/>
                  <path d="M30 40L50 55L70 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="25" y="35" width="50" height="35" stroke="currentColor" strokeWidth="2" rx="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
