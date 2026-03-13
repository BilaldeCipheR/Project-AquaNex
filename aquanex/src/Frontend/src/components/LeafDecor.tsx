// src/components/LeafDecor.tsx

export const LeafDecor = () => (
  <div className="pointer-events-none select-none fixed inset-0 overflow-hidden z-0" aria-hidden>

    {/* top-left large leaf */}
    <svg className="absolute -top-20 -left-20 w-96 h-96 opacity-[0.12] dark:opacity-[0.10]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg1)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
      </defs>
    </svg>

    {/* top-right medium leaf */}
    <svg className="absolute -top-10 right-16 w-64 h-64 opacity-[0.10] dark:opacity-[0.08] rotate-[210deg]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg2)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e7490"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>

    {/* bottom-right huge leaf */}
    <svg className="absolute -bottom-24 -right-16 w-[28rem] h-[28rem] opacity-[0.11] dark:opacity-[0.08] rotate-[40deg]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg3)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg3" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2"/>
          <stop offset="100%" stopColor="#134e4a"/>
        </linearGradient>
      </defs>
    </svg>

    {/* bottom-left small leaf */}
    <svg className="absolute bottom-16 -left-10 w-56 h-56 opacity-[0.09] dark:opacity-[0.07] rotate-[130deg]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg4)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
      </defs>
    </svg>

    {/* center-right thin leaf */}
    <svg className="absolute top-1/3 -right-14 w-72 h-72 opacity-[0.08] dark:opacity-[0.06] -rotate-[70deg]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg5)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg5" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e7490"/>
          <stop offset="100%" stopColor="#0891b2"/>
        </linearGradient>
      </defs>
    </svg>

    {/* center-left accent leaf */}
    <svg className="absolute top-1/2 -left-8 w-44 h-44 opacity-[0.07] dark:opacity-[0.05] rotate-[160deg]"
      viewBox="0 0 200 200" fill="none">
      <path d="M10 190 C10 190 20 80 100 40 C160 10 195 10 195 10 C195 10 190 50 160 90 C130 130 60 150 10 190Z" fill="url(#lg6)"/>
      <path d="M10 190 C55 140 100 100 195 10" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="lg6" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#06b6d4"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
      </defs>
    </svg>

    {/* subtle dot grid overlay */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#0891b2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>

  </div>
);
