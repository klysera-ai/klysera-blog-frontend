export default function ReadModeIcon({ className = "", isActive = false }: { className?: string; isActive?: boolean }) {
  if (isActive) {
    // Filled version when active
    return (
      <svg 
        width="15" 
        height="6" 
        viewBox="0 0 15 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M0.5 0.5H6.41089V5.5H0.5V0.5Z" 
          className="fill-[#001F3F] dark:fill-[#F0F4F8]"
        />
        <path 
          d="M8.58911 0.5H14.5V5.5H8.58911V0.5Z" 
          className="fill-[#001F3F] dark:fill-[#F0F4F8]"
        />
        <path 
          d="M6.25577 2.99996H8.58901M0.5 0.5H6.41089V5.5H0.5V0.5ZM8.58911 0.5H14.5V5.5H8.58911V0.5Z" 
          className="stroke-[#001F3F] dark:stroke-[#F0F4F8]"
        />
      </svg>
    );
  }

  // Normal version
  return (
    <svg 
      width="18" 
      height="7" 
      viewBox="0 0 18 7" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M7.48915 3.49996H10.3224M0.5 0.5H7.67751V6.5H0.5V0.5ZM10.3225 0.5H17.5V6.5H10.3225V0.5Z" 
        className="stroke-[#001F3F] dark:stroke-[#CFDDE8]"
      />
    </svg>
  );
}
