import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = ({ activeTab, setActiveTab, search, setSearch, user, watchlist = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const ns = {
    nav: "sticky top-4 z-50 mx-auto max-w-screen-xl px-4",
    container: "bg-[#121217]/80 backdrop-blur-xl border border-white/10 rounded-2xl h-16 flex items-center justify-between px-6 shadow-2xl shadow-black/50 relative",
    logoSection: "flex items-center gap-10",
    linkGroup: "hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg",
    linkBtn: (active) => `flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`,
    controls: "flex items-center gap-4",
    statusBadge: "hidden md:flex items-center gap-2",
    statusDot: (online) => `w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`,
    searchWrapper: "relative hidden md:block",
    searchInput: "bg-black/40 border border-white/10 focus:border-pink-500/50 rounded-lg py-1.5 pl-8 pr-4 text-xs font-medium w-48 transition-all focus:w-64 outline-none placeholder:text-gray-600 text-white",
    mobileBtn: "text-white hover:text-pink-500 transition-colors",
    badge: "bg-pink-600 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black"
  };

  return (
    <nav className={ns.nav}>
      <div className={ns.container}>
        <div className={ns.logoSection}>
          <Logo />
          <div className={ns.linkGroup}>
            {['Trending', 'Watchlist'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={ns.linkBtn(activeTab === tab)}>
                {tab}
                {tab === 'Watchlist' && watchlist.length > 0 && <span className={ns.badge}>{watchlist.length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className={ns.controls}>
          <div className={ns.statusBadge}>
            <div className={ns.statusDot(!!user)} />
            <span className="text-[10px] font-mono text-gray-500 uppercase">{user ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <div className={ns.searchWrapper}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔎</span>
            <input type="text" placeholder="Find anime..." className={ns.searchInput} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex md:hidden gap-4">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className={`${ns.mobileBtn} ${mobileSearchOpen ? 'text-pink-500' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${ns.mobileBtn} ${mobileMenuOpen ? 'text-pink-500' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 mx-2 bg-[#121217] border border-white/10 p-4 rounded-xl shadow-2xl z-50 md:hidden">
              <input type="text" placeholder="Search anime..." className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-48 bg-[#121217] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden md:hidden p-2">
              {['Trending', 'Watchlist'].map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-lg mb-1 flex justify-between items-center transition-colors ${activeTab === tab ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5'}`}>
                  {tab}
                  {tab === 'Watchlist' && watchlist.length > 0 && <span className={ns.badge}>{watchlist.length}</span>}
                </button>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2 px-4 py-2 flex items-center gap-2">
                <div className={ns.statusDot(!!user)} />
                <span className="text-[10px] font-mono text-gray-500 uppercase">{user ? 'ONLINE' : 'OFFLINE'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;