'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header 
      className="fixed top-0 z-50 w-full h-[72px] 
      bg-[#FEFEFE] dark:bg-[#001F3F] border-b-[0.5px] border-[#B1B9C8] dark:border-[#0557AD] py-4"
    >
      <div className="container">
      <nav className="mx-auto h-full p-0">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Light mode logo */}
            <Image
              src="/images/logo/klysera-logo-light.svg"
              alt="Klysera Logo"
              width={150}
              height={20}
              className="w-[150px] h-5 dark:hidden"
              priority
            />
            {/* Dark mode logo */}
            <Image
              src="/images/logo/klysera-logo-dark.svg"
              alt="Klysera Logo"
              width={150}
              height={20}
              className="w-[150px] h-5 hidden dark:block"
              priority
            />
          </Link>

          {/* Get Newsletters Button */}
          <button
            className="group flex flex-row justify-center items-center px-4 py-2 border-[0.5px] border-[#B1B9C8] dark:border-[#0557AD] rounded bg-transparent hover:bg-[#F0F4F8] dark:hover:bg-[#02356B] cursor-pointer transition-colors"
          >
            <span
              className="font-['General_Sans'] font-normal text-base leading-6 text-center text-[#001F3F] dark:text-[#FEFEFE] group-hover:text-[#001F3F] dark:group-hover:text-[#F0F4F8] transition-colors"
            >
              Get Newsletters
            </span>
          </button>
        </div>
      </nav>
      </div>
    </header>
  );
}
