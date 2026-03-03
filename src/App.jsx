import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useWatchlist } from './hooks/useWatchlist';
import { useAnime } from './hooks/useAnime';
import { GENRES, DEFAULT_ITEMS } from './utils/constants';
import Navbar from './components/Navbar';
import AnimeCard from './components/AnimeCard';
import VideoModal from './components/VideoModal';
import Filters from './components/Filters';
import LoadingScreen from './components/LoadingScreen';
import AnimatedBackground, { AuroraHero } from './components/AnimatedBackground';
import { Skeleton, HelmSpinner } from './components/Skeleton';

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('Trending');
  const [filters, setFilters] = useState({ genre: null, type: null, status: null });
  const [showFilters, setShowFilters] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [page, setPage] = useState(1);

  const user = useAuth();
  const { watchlist, toggleWatchlist } = useWatchlist();
  const { items, setItems, loading, isLoadingMore, hasNextPage, fetchContent } = useAnime(DEFAULT_ITEMS);

  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Always fetch trending content on initial load
    fetchContent('', 1, false, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs only once on mount

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      if (activeTab === 'Watchlist') {
        setItems(watchlist);
      } else if (activeTab === 'Trending') {
        // Fetch trending content when switching back from Watchlist
        fetchContent('', 1, false, filters);
      }
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, watchlist, fetchContent, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        if (activeTab !== 'Search') setActiveTab('Search');
        setPage(1);
        setFilters({ genre: null, type: null, status: null });
        fetchContent(search, 1, false, {});
      } else if (activeTab === 'Search') {
        setActiveTab('Trending');
        fetchContent('', 1, false, filters);
      }
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, fetchContent]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchContent(search, nextPage, true, filters);
  };

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setSearch('');
    setActiveTab('Trending');
    setPage(1);
    fetchContent('', 1, false, newFilters);
  };

  const handleSurprise = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/random/anime?sfw`);
      const data = await response.json();
      if (data.data) setSelected(data.data);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/30 selection:text-pink-100 overflow-x-hidden">
      <AnimatePresence>
        {!appReady && <LoadingScreen />}
      </AnimatePresence>

      <AnimatedBackground />
      <AuroraHero />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} search={search} setSearch={setSearch} user={user} watchlist={watchlist} />

      {!search && activeTab !== 'Watchlist' && (
        <header className="relative pt-24 pb-12 px-6">
          <div className="max-w-screen-xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span> Live Free Access
              </div>
              <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                The Pirate <br /> King's Era.
              </h2>
              <div className="flex gap-4 mb-12">
                <button onClick={() => setSelected(DEFAULT_ITEMS[0])} className="px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">Start Watching</button>
                <button onClick={handleSurprise} className="px-8 py-3 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-colors">Surprise Me</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {GENRES.map(genre => (
                  <button key={genre.label} onClick={() => updateFilter('genre', genre.id)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${filters.genre === genre.id ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}`}>
                    {genre.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </header>
      )}

      <main className="max-w-screen-xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-white/5 pb-4 gap-4">
          <div className="flex items-center gap-4">
            <h4 className="text-2xl font-black tracking-tighter">
              {activeTab === 'Watchlist' ? 'My Collection' : (search ? `Results: "${search}"` : 'Library')}
            </h4>
            {activeTab !== 'Watchlist' && (
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${showFilters ? 'bg-white text-black' : 'bg-white/5 text-gray-400'}`}>
                <span>⚡ Filter</span>
              </button>
            )}
          </div>
          <span className="text-xs font-mono text-gray-500">{loading ? 'SCANNING...' : `${items.length} TITLES`}</span>
        </div>

        <Filters showFilters={showFilters} filters={filters} updateFilter={updateFilter} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {loading && !isLoadingMore ? (
            Array(12).fill(0).map((_, i) => <Skeleton key={i} />)
          ) : items.length > 0 ? (
            items.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onClick={() => setSelected(anime)}
                toggleWatchlist={toggleWatchlist}
                inWatchlist={watchlist.some(item => item.mal_id === anime.mal_id)}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
              <p className="text-gray-500 font-mono text-sm uppercase">
                {activeTab === 'Watchlist' ? "Your collection is empty." : "No signals found in this sector."}
              </p>
            </div>
          )}
        </div>

        {activeTab !== 'Watchlist' && items.length > 0 && hasNextPage && (
          <div className="flex justify-center pb-20">
            <button onClick={handleLoadMore} disabled={isLoadingMore}
              className="group relative px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl transition-all disabled:opacity-50 min-w-[200px]">
              {isLoadingMore
                ? <div className="flex justify-center"><HelmSpinner /></div>
                : <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-pink-500 transition-colors">Load More Signals</span>
              }
            </button>
          </div>
        )}
      </main>

      <VideoModal anime={selected} onClose={() => setSelected(null)} user={user} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />

    </div>
  );
}