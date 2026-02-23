'use client';

import Link from 'next/link';

interface BlogToolbarProps {
  parentPage: string;
  parentHref: string;
  currentPage: string;
  onToggleFontSize: () => void;
  onToggleReadMode: () => void;
  fontSizeActive: boolean;
  readModeActive: boolean;
}

export default function BlogToolbar({ 
  parentPage, 
  parentHref, 
  currentPage,
  onToggleFontSize,
  onToggleReadMode,
  fontSizeActive,
  readModeActive,
}: BlogToolbarProps) {
  return (
    <div className="w-full max-w-[976px] mx-auto pt-[150px] mb-12">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <nav className="flex items-center">
          <Link
            href={parentHref}
            className="text-black dark:text-white hover:opacity-70 transition-opacity"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '38px',
              letterSpacing: '-0.02em',
            }}
          >
            {parentPage}
          </Link>
          <span
            className="mx-2 text-black dark:text-white"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '38px',
              letterSpacing: '-0.02em',
            }}
          >
            /
          </span>
          <span
            className="text-black dark:text-white"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '38px',
              letterSpacing: '-0.02em',
            }}
          >
            {currentPage}
          </span>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Read Mode Icon (Shopping Cart) */}
          <button 
            onClick={onToggleReadMode}
            className={`hover:opacity-70 transition-opacity ${readModeActive ? 'opacity-100' : 'opacity-50'}`}
            aria-label="Toggle read mode"
            title="Toggle read mode (hide table of contents)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5H6.743L4.503 12.467C5.07335 12.1845 5.69714 12.0262 6.33317 12.0026C6.9692 11.979 7.60301 12.0906 8.19274 12.33C8.78247 12.5693 9.31472 12.9311 9.75433 13.3914C10.1939 13.8516 10.5309 14.3999 10.743 15H13.256C13.4682 14.3999 13.8053 13.8516 14.245 13.3913C14.6847 12.931 15.217 12.5692 15.8068 12.3298C16.3965 12.0903 17.0304 11.9786 17.6665 12.0021C18.3026 12.0256 18.9265 12.1837 19.497 12.466L17.256 5H16C15.7551 4.99997 15.5187 4.91004 15.3356 4.74728C15.1526 4.58453 15.0357 4.36025 15.007 4.117L15 4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3H18C18.2151 2.99999 18.4245 3.06935 18.5971 3.19779C18.7697 3.32624 18.8963 3.50692 18.958 3.713L21.958 13.713C21.9859 13.8061 22 13.9028 22 14V16.5C21.9997 17.6499 21.5592 18.7561 20.7689 19.5914C19.9786 20.4267 18.8985 20.9278 17.7504 20.9918C16.6023 21.0558 15.4732 20.6778 14.595 19.9355C13.7168 19.1931 13.1561 18.1428 13.028 17H10.972C10.8439 18.1428 10.2832 19.1931 9.40502 19.9355C8.52682 20.6778 7.39775 21.0558 6.24961 20.9918C5.10147 20.9278 4.02139 20.4267 3.23111 19.5914C2.44083 18.7561 2.00031 17.6499 2 16.5V14C1.99998 13.9028 2.01413 13.8061 2.042 13.713L5.042 3.713C5.10374 3.50692 5.2303 3.32624 5.40288 3.19779C5.57546 3.06935 5.78487 2.99999 6 3H8Z" fill="currentColor" className="text-black dark:text-white"/>
            </svg>
          </button>

          {/* Text Size Icon (Ab) */}
          <button 
            onClick={onToggleFontSize}
            className={`hover:opacity-70 transition-opacity ${fontSizeActive ? 'opacity-100' : 'opacity-50'}`}
            aria-label="Toggle font size"
            title="Increase font size by 20%"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.95987 11.488L7.75987 8.30404H2.39987L1.18387 11.488H-0.000128895L4.46387 3.62396e-05H5.77587L10.2239 11.488H8.95987ZM5.08787 1.28004L2.76787 7.32804H7.37587L5.08787 1.28004ZM19.2856 7.26404C19.2856 9.85604 17.8296 11.648 15.5736 11.648C14.2776 11.648 13.1896 10.944 12.5976 9.71204V11.488H11.5576V3.62396e-05H12.6776V4.83204C13.2216 3.60004 14.2936 2.89604 15.5736 2.89604C17.8296 2.89604 19.2856 4.67204 19.2856 7.26404ZM18.1496 7.26404C18.1496 5.12004 17.0456 3.87204 15.3976 3.87204C13.8136 3.87204 12.6616 5.10404 12.6616 7.23204C12.6616 9.34404 13.7816 10.672 15.3976 10.672C17.0456 10.672 18.1496 9.40804 18.1496 7.26404Z" fill="currentColor" className="text-black dark:text-white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
