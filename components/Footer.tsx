'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, mounted } = useTheme();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkColor = (path: string) => {
    const isThisLinkHovered = hoveredLink === path;
    const isAnyLinkHovered = hoveredLink !== null;
    
    if (theme === 'dark') {
      // Dark mode colors
      if (isThisLinkHovered) return '#FFFFFF';
      if (isAnyLinkHovered) return '#FFFFFF63';
      return isActive(path) ? '#FFFFFF' : '#FFFFFF63';
    } else {
      // Light mode colors
      if (isThisLinkHovered) return '#000000';
      if (isAnyLinkHovered) return '#8E8E93';
      return isActive(path) ? '#000000' : '#8E8E93';
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <style jsx>{`
        footer {
          --footer-link-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : 'currentColor'};
          --footer-border-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : '#e5e7eb'};
          --footer-text-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : '#6b7280'};
          --footer-input-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : 'currentColor'};
        }
      `}</style>
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Section - Logo and Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              {mounted && (
                <Image
                  src={theme === 'dark' ? '/images/logo/klysera-logo-dark.svg' : '/images/logo/klysera-logo-light.svg'}
                  alt="Klysera Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              )}
            </Link>
            <p className="text-gray-900 dark:text-white font-normal">
              Build Exceptional Products
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/chapter"
                  onMouseEnter={() => setHoveredLink('/chapter')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="transition-colors"
                  style={{ 
                    color: getLinkColor('/chapter'),
                    fontWeight: isActive('/chapter') ? 500 : 400
                  }}
                >
                  Chapter
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  onMouseEnter={() => setHoveredLink('/insights')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="transition-colors"
                  style={{ 
                    color: getLinkColor('/insights'),
                    fontWeight: isActive('/insights') ? 500 : 400
                  }}
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  onMouseEnter={() => setHoveredLink('/research')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="transition-colors"
                  style={{ 
                    color: getLinkColor('/research'),
                    fontWeight: isActive('/research') ? 500 : 400
                  }}
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/white-paper"
                  onMouseEnter={() => setHoveredLink('/white-paper')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="transition-colors"
                  style={{ 
                    color: getLinkColor('/white-paper'),
                    fontWeight: isActive('/white-paper') ? 500 : 400
                  }}
                >
                  White paper
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-6">
              Subscribe to our Newsletter
            </h3>
            <form 
              onSubmit={handleSubscribe} 
              className="flex flex-col md:flex-row border"
              style={{ 
                borderColor: 'var(--footer-border-color, #d1d5db)',
                padding: '5px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="px-4 py-3 focus:outline-none focus:ring-0 bg-white dark:bg-black text-gray-900 dark:text-white border-0"
                style={{ 
                  color: 'var(--footer-input-color, currentColor)'
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright and Social */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--footer-border-color, #e5e7eb)' }}>
          <p className="text-gray-500 text-sm" style={{ color: 'var(--footer-text-color, currentColor)' }}>
            © {currentYear} Kylsera. All rights reserved
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.7968" cy="15.7968" r="15.4871" stroke="#001F3F" strokeWidth="0.619483" className="dark:stroke-white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.7927 7.79443C13.6194 7.79443 13.3474 7.80404 12.4936 7.84244C11.6422 7.88165 11.0605 8.01688 10.5516 8.21452C10.0175 8.41521 9.53356 8.73007 9.13369 9.13711C8.72665 9.53698 8.4118 10.0209 8.2111 10.555C8.01346 11.0639 7.87823 11.6456 7.83903 12.497C7.79982 13.3508 7.79102 13.6228 7.79102 15.7961C7.79102 17.9693 7.79982 18.2414 7.83903 19.0952C7.87823 19.9465 8.01346 20.5283 8.2111 21.0372C8.4118 21.5713 8.72665 22.0552 9.13369 22.4551C9.53356 22.8621 10.0175 23.177 10.5516 23.3777C11.0605 23.5753 11.6422 23.7105 12.4936 23.7497C13.3474 23.7881 13.6194 23.7977 15.7927 23.7977C17.9659 23.7977 18.238 23.7881 19.0917 23.7497C19.9431 23.7105 20.5248 23.5753 21.0338 23.3777C21.5679 23.177 22.0518 22.8621 22.4516 22.4551C22.8587 22.0552 23.1735 21.5713 23.3742 21.0372C23.5719 20.5283 23.7071 19.9465 23.7463 19.0952C23.7847 18.2414 23.7943 17.9693 23.7943 15.7961C23.7943 13.6228 23.7847 13.3508 23.7463 12.497C23.7071 11.6456 23.5719 11.0639 23.3742 10.555C23.1735 10.0209 22.8587 9.53698 22.4516 9.13711C22.0518 8.73007 21.5679 8.41521 21.0338 8.21452C20.5248 8.01688 19.9431 7.88165 19.0917 7.84244C18.238 7.80404 17.9659 7.79443 15.7927 7.79443ZM15.7927 9.23633C17.9291 9.23633 18.182 9.24433 19.0253 9.28274C19.8063 9.31875 20.2296 9.44838 20.512 9.558C20.8849 9.70363 21.1522 9.87726 21.4322 10.1565C21.7123 10.4366 21.8851 10.7038 22.0308 11.0767C22.1396 11.3592 22.2708 11.7825 22.306 12.5626C22.3444 13.4068 22.3524 13.6588 22.3524 15.7961C22.3524 17.9325 22.3444 18.1854 22.306 19.0288C22.27 19.8097 22.1396 20.233 22.0308 20.5155C21.9025 20.863 21.698 21.1775 21.4322 21.4357C21.1522 21.7157 20.8849 21.8885 20.512 22.0342C20.2296 22.143 19.8063 22.2742 19.0261 22.3094C18.1828 22.3478 17.9299 22.3558 15.7927 22.3558C13.6562 22.3558 13.4026 22.3478 12.56 22.3094C11.779 22.2734 11.3558 22.143 11.0733 22.0342C10.7257 21.9059 10.4113 21.7014 10.1531 21.4357C9.88738 21.1775 9.68286 20.863 9.55458 20.5155C9.44496 20.233 9.31453 19.8097 9.27932 19.0296C9.24092 18.1854 9.23291 17.9333 9.23291 15.7961C9.23291 13.6596 9.24092 13.4068 9.27932 12.5634C9.31533 11.7825 9.44496 11.3592 9.55458 11.0767C9.70021 10.7038 9.87385 10.4366 10.1531 10.1565C10.4332 9.87646 10.7004 9.70363 11.0733 9.558C11.3558 9.44838 11.779 9.31795 12.5592 9.28274C13.4034 9.24433 13.6554 9.23633 15.7927 9.23633ZM15.7927 18.463C15.0853 18.463 14.407 18.1821 13.9068 17.6819C13.4067 17.1818 13.1257 16.5034 13.1257 15.7961C13.1257 15.0888 13.4067 14.4104 13.9068 13.9103C14.407 13.4101 15.0853 13.1291 15.7927 13.1291C16.5 13.1291 17.1783 13.4101 17.6785 13.9103C18.1786 14.4104 18.4596 15.0888 18.4596 15.7961C18.4596 16.5034 18.1786 17.1818 17.6785 17.6819C17.1783 18.1821 16.5 18.463 15.7927 18.463ZM15.7927 11.6872C15.2531 11.6872 14.7188 11.7935 14.2203 12C13.7218 12.2065 13.2688 12.5092 12.8873 12.8907C12.5057 13.2722 12.2031 13.7252 11.9966 14.2237C11.7901 14.7222 11.6838 15.2565 11.6838 15.7961C11.6838 16.3357 11.7901 16.87 11.9966 17.3685C12.2031 17.867 12.5057 18.3199 12.8873 18.7015C13.2688 19.083 13.7218 19.3857 14.2203 19.5922C14.7188 19.7987 15.2531 19.9049 15.7927 19.9049C16.8824 19.9049 17.9275 19.472 18.6981 18.7015C19.4686 17.9309 19.9015 16.8858 19.9015 15.7961C19.9015 14.7064 19.4686 13.6613 18.6981 12.8907C17.9275 12.1201 16.8824 11.6872 15.7927 11.6872ZM21.0241 11.5248C21.0241 11.6509 20.9993 11.7758 20.9511 11.8923C20.9028 12.0088 20.8321 12.1146 20.7429 12.2038C20.6538 12.2929 20.5479 12.3637 20.4314 12.4119C20.3149 12.4602 20.19 12.485 20.064 12.485C19.9379 12.485 19.813 12.4602 19.6965 12.4119C19.58 12.3637 19.4742 12.2929 19.385 12.2038C19.2958 12.1146 19.2251 12.0088 19.1768 11.8923C19.1286 11.7758 19.1038 11.6509 19.1038 11.5248C19.1038 11.2701 19.2049 11.0259 19.385 10.8458C19.5651 10.6658 19.8093 10.5646 20.064 10.5646C20.3186 10.5646 20.5628 10.6658 20.7429 10.8458C20.923 11.0259 21.0241 11.2701 21.0241 11.5248Z" fill="#001F3F" className="dark:fill-white"/>
              </svg>
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.7968" cy="15.7968" r="15.4871" stroke="#001F3F" strokeWidth="0.619483" className="dark:stroke-white"/>
                <path d="M16.6403 15.0824L21.1174 9.98999H20.0565L16.169 14.4116L13.0641 9.98999H9.48291L14.1782 16.6763L9.48291 22.0165H10.5439L14.6492 17.3471L17.9282 22.0165H21.5094L16.6403 15.0824ZM15.1871 16.7352L14.7114 16.0694L10.9262 10.7715H12.5558L15.6105 15.0471L16.0863 15.7129L20.057 21.2705H18.4274L15.1871 16.7352Z" fill="#001F3F" className="dark:fill-white"/>
              </svg>
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.7968" cy="15.7968" r="15.4871" stroke="#001F3F" strokeWidth="0.619483" className="dark:stroke-white"/>
                <path d="M25.4011 15.9726C25.4011 15.927 25.4011 15.8751 25.3991 15.815C25.397 15.647 25.3928 15.4582 25.3887 15.257C25.3721 14.6783 25.3431 14.1017 25.2974 13.5583C25.2352 12.8095 25.1439 12.1852 25.0195 11.7164C24.8882 11.2273 24.6307 10.7811 24.2729 10.4226C23.9151 10.0641 23.4695 9.80572 22.9806 9.67339C22.3936 9.51576 21.2445 9.41827 19.6267 9.35812C18.8572 9.32908 18.0337 9.31042 17.2103 9.30004C16.922 9.2959 16.6544 9.29382 16.4138 9.29175H15.804C15.5634 9.29382 15.2958 9.2959 15.0075 9.30004C14.1841 9.31042 13.3606 9.32908 12.5911 9.35812C10.9733 9.42035 9.82211 9.51783 9.2372 9.67339C8.74811 9.80539 8.30231 10.0636 7.94446 10.4222C7.58662 10.7808 7.3293 11.2271 7.1983 11.7164C7.07177 12.1852 6.98258 12.8095 6.92036 13.5583C6.87473 14.1017 6.84569 14.6783 6.8291 15.257C6.82287 15.4582 6.8208 15.647 6.81872 15.815C6.81872 15.8751 6.81665 15.927 6.81665 15.9726V16.0888C6.81665 16.1344 6.81665 16.1863 6.81872 16.2464C6.8208 16.4144 6.82495 16.6032 6.8291 16.8044C6.84569 17.383 6.87473 17.9597 6.92036 18.5031C6.98258 19.2519 7.07385 19.8762 7.1983 20.345C7.46379 21.3385 8.24367 22.1225 9.2372 22.388C9.82211 22.5456 10.9733 22.6431 12.5911 22.7033C13.3606 22.7323 14.1841 22.751 15.0075 22.7613C15.2958 22.7655 15.5634 22.7676 15.804 22.7696H16.4138C16.6544 22.7676 16.922 22.7655 17.2103 22.7613C18.0337 22.751 18.8572 22.7323 19.6267 22.7033C21.2445 22.641 22.3957 22.5436 22.9806 22.388C23.9741 22.1225 24.754 21.3405 25.0195 20.345C25.146 19.8762 25.2352 19.2519 25.2974 18.5031C25.3431 17.9597 25.3721 17.383 25.3887 16.8044C25.3949 16.6032 25.397 16.4144 25.3991 16.2464C25.3991 16.1863 25.4011 16.1344 25.4011 16.0888V15.9726ZM23.9077 16.0805C23.9077 16.124 23.9077 16.1717 23.9057 16.2277C23.9036 16.3895 23.8994 16.5679 23.8953 16.7608C23.8808 17.3125 23.8517 17.8643 23.8082 18.3766C23.7522 19.0445 23.6734 19.592 23.5759 19.9592C23.4473 20.4383 23.0698 20.8179 22.5927 20.9444C22.1571 21.0605 21.0599 21.1539 19.5686 21.2099C18.8136 21.2389 18.0005 21.2576 17.1895 21.268C16.9054 21.2721 16.642 21.2742 16.4055 21.2742H15.8123L15.0283 21.268C14.2173 21.2576 13.4063 21.2389 12.6492 21.2099C11.1579 21.1518 10.0586 21.0605 9.62506 20.9444C9.14801 20.8158 8.77051 20.4383 8.64191 19.9592C8.54443 19.592 8.46561 19.0445 8.40961 18.3766C8.36605 17.8643 8.33908 17.3125 8.32249 16.7608C8.31627 16.5679 8.31419 16.3875 8.31212 16.2277C8.31212 16.1717 8.31005 16.122 8.31005 16.0805V15.9809C8.31005 15.9374 8.31005 15.8897 8.31212 15.8337C8.31419 15.6719 8.31834 15.4935 8.32249 15.3006C8.33701 14.7489 8.36605 14.1971 8.40961 13.6848C8.46561 13.0169 8.54443 12.4694 8.64191 12.1022C8.77051 11.6231 9.14801 11.2435 9.62506 11.117C10.0606 11.0009 11.1579 10.9075 12.6492 10.8515C13.4042 10.8225 14.2173 10.8038 15.0283 10.7934C15.3124 10.7893 15.5758 10.7872 15.8123 10.7872H16.4055L17.1895 10.7934C18.0005 10.8038 18.8115 10.8225 19.5686 10.8515C21.0599 10.9096 22.1592 11.0009 22.5927 11.117C23.0698 11.2456 23.4473 11.6231 23.5759 12.1022C23.6734 12.4694 23.7522 13.0169 23.8082 13.6848C23.8517 14.1971 23.8787 14.7489 23.8953 15.3006C23.9015 15.4935 23.9036 15.6739 23.9057 15.8337C23.9057 15.8897 23.9077 15.9394 23.9077 15.9809V16.0805ZM14.2629 18.8101L19.0749 16.01L14.2629 13.2513V18.8101Z" fill="#001F3F" className="dark:fill-white"/>
              </svg>
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.7968" cy="15.7968" r="15.4871" stroke="#001F3F" strokeWidth="0.619483" className="dark:stroke-white"/>
                <path d="M13.5115 22.4815H16.4187V16.6597H19.0382L19.326 13.767H16.4187V12.3061C16.4187 12.1133 16.4953 11.9285 16.6316 11.7921C16.7679 11.6558 16.9528 11.5793 17.1456 11.5793H19.326V8.672H17.1456C16.1817 8.672 15.2574 9.05487 14.5759 9.7364C13.8944 10.4179 13.5115 11.3423 13.5115 12.3061V13.767H12.0578L11.77 16.6597H13.5115V22.4815Z" fill="#001F3F" className="dark:fill-white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
