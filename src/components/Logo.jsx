const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-600 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full w-full bg-[#0a0a0f] border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
          <path d="M4 4L20 20M20 4L4 20" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="13.5" r="5" fill="#F3F4F6" />
          <path d="M7 8.5C7 5.5 8.5 3.5 12 3.5C15.5 3.5 17 5.5 17 8.5H7Z" fill="#FBBF24" />
          <path d="M7 8.5H17" stroke="#EF4444" strokeWidth="2" />
          <path d="M4 8.5H20C21 8.5 21 9.5 20 9.5H4C3 9.5 3 8.5 4 8.5Z" fill="#FBBF24" />
          <circle cx="10" cy="13" r="1.5" fill="#1F2937" />
          <circle cx="14" cy="13" r="1.5" fill="#1F2937" />
          <path d="M10 16.5V17M12 16.5V17M14 16.5V17" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </div>
    <div className="flex flex-col justify-center">
      <h1 className="text-xl font-black tracking-tighter leading-none text-white group-hover:text-yellow-400 transition-colors">むぎわら</h1>
      <span className="text-[9px] font-bold tracking-[0.35em] text-red-500 uppercase leading-none group-hover:text-yellow-500 transition-colors">ストリーㇺ</span>
    </div>
  </div>
);

export default Logo;