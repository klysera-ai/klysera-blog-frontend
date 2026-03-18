'use client';

export default function Divider() {
  return (
    <div className="container">
      {/* Light mode divider */}
      <div
        className="w-full flex flex-col items-start p-0 gap-[72px] h-8 border-r-[0.5px] border-l-[0.5px]  border-b-[0.5px] border-solid border-[#B1B9C8] flex-none order-0 self-stretch grow-0 dark:hidden"
        style={{
          backgroundImage: 'url(/images/divider-pattern-light.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Dark mode divider */}
      <div
        className="w-full flex flex-col items-start p-0 gap-[72px] h-8 border-r-[0.5px] border-l-[0.5px]  border-b-[0.5px] border-solid border-[#0557AD] flex-none order-0 self-stretch grow-0 hidden dark:block"
        style={{
          backgroundImage: 'url(/images/divider-pattern-dark.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}
