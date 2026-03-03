export const Skeleton = () => (
  <div className="bg-white/5 rounded-2xl h-[400px] animate-pulse relative overflow-hidden border border-white/5">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
  </div>
);

export const HelmSpinner = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative w-16 h-16 animate-spin-slow">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/20">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.9 4.9L6.3 6.3M17.7 17.7L19.1 19.1M19.1 4.9L17.7 6.3M6.3 17.7L4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 animate-pulse">Navigating...</span>
  </div>
);