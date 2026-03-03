import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmSpinner } from './Skeleton';
import { API_BASE } from '../utils/constants';

const modalStyles = {
  overlay: "fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-xl",
  modalContainer: "relative w-full max-w-7xl h-full md:h-auto md:aspect-[16/9] bg-[#0a0a0f] md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row",
  playerSection: "md:w-3/4 bg-black relative flex items-center justify-center group",
  sidebar: "md:w-1/4 bg-[#121217] border-l border-white/5 flex flex-col h-full overflow-hidden",
  sidebarHeader: "p-6 border-b border-white/5 shrink-0 bg-[#121217] z-10",
  tabBtn: (active) => `flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${active ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`,
  sourceBtn: "w-full p-3 rounded-xl flex items-center gap-3 transition-all",
  episodeBtn: (active) => `w-full p-3 rounded-lg flex items-center gap-3 text-left transition-all border border-transparent ${active ? 'bg-white/10 border-pink-500/50 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`,
  closeBtn: "absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
};

const VideoModal = ({ anime, onClose, user, watchlist, toggleWatchlist }) => {
  const [activeSource, setActiveSource] = useState('trailer');
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [view, setView] = useState('info');

  const inList = anime && watchlist ? watchlist.some(item => item.mal_id === anime.mal_id) : false;

  useEffect(() => {
    if (!anime) return;

    const fetchLinks = async () => {
      setLoadingLinks(true);
      try {
        const res = await fetch(`${API_BASE}/anime/${anime.mal_id}/streaming`);
        const data = await res.json();
        setStreamingLinks(data.data || []);
      } catch (e) { console.error("Failed streams", e); }
      finally { setLoadingLinks(false); }
    };

    const fetchEpisodes = async () => {
      setLoadingEpisodes(true);
      try {
        const res = await fetch(`${API_BASE}/anime/${anime.mal_id}/episodes`);
        const data = await res.json();
        setEpisodes(data.data || []);
      } catch (e) { console.error("Failed episodes", e); }
      finally { setLoadingEpisodes(false); }
    };

    fetchLinks();
    fetchEpisodes();
  }, [anime]);

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
    setActiveSource('stream');
  };

  if (!anime) return null;

  const trailerUrl = anime.trailer?.youtube_id
    ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1&mute=1&modestbranding=1&rel=0&enablejsapi=1`
    : anime.trailer?.embed_url;

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const animeSlug = anime.title_english ? getSlug(anime.title_english) : getSlug(anime.title);

  // External free streaming links
  const gogoAnimeLink = `https://gogoanime3.co/category/${animeSlug}`;
  const crunchyrollSearch = `https://www.crunchyroll.com/search?q=${encodeURIComponent(anime.title_english || anime.title)}`;
  const aniwaveSearch = `https://aniwave.to/filter?keyword=${encodeURIComponent(anime.title_english || anime.title)}`;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={modalStyles.overlay} onClick={onClose}>
        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className={modalStyles.modalContainer} onClick={e => e.stopPropagation()}>

          <div className={modalStyles.playerSection}>
            {activeSource === 'trailer' && (
              trailerUrl ? (
                <iframe
                  className="w-full h-full aspect-video"
                  src={trailerUrl}
                  title={anime.title}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="text-center"><p className="font-mono text-gray-500 uppercase">Trailer Unavailable</p></div>
              )
            )}

            {activeSource === 'stream' && (
              <div className="w-full h-full relative bg-[#0a0a0f] flex flex-col items-center justify-center p-10 text-center">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black mb-2 text-white">Ready to Watch?</h3>
                  <p className="text-gray-400 text-sm mb-8">
                    Choose a platform below to watch <strong className="text-white">{anime.title} - Episode {currentEpisode?.mal_id}</strong>.
                  </p>

                  <div className="space-y-3">
                    <a href={gogoAnimeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#1a1a24] hover:bg-pink-600/20 border border-white/5 hover:border-pink-500 rounded-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌍</span>
                        <div className="text-left">
                          <p className="font-bold text-white group-hover:text-pink-400">GogoAnime</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Free Sub/Dub</p>
                        </div>
                      </div>
                      <span className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </a>

                    <a href={aniwaveSearch} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#1a1a24] hover:bg-purple-600/20 border border-white/5 hover:border-purple-500 rounded-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌊</span>
                        <div className="text-left">
                          <p className="font-bold text-white group-hover:text-purple-400">AniWave</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">High Quality Free</p>
                        </div>
                      </div>
                      <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </a>

                    <a href={crunchyrollSearch} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#1a1a24] hover:bg-orange-600/20 border border-white/5 hover:border-orange-500 rounded-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👑</span>
                        <div className="text-left">
                          <p className="font-bold text-white group-hover:text-orange-400">Crunchyroll</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Official & Premium</p>
                        </div>
                      </div>
                      <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeSource === 'official' && (
              <div className="w-full h-full p-10 overflow-y-auto bg-[#0a0a0f]">
                <h3 className="text-2xl font-black mb-6 text-white">Select Streaming Service</h3>
                {loadingLinks ? (
                  <div className="text-pink-500 font-mono animate-pulse">SCANNING NETWORKS...</div>
                ) : streamingLinks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {streamingLinks.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500 rounded-xl transition-all group">
                        <span className="text-2xl">📺</span>
                        <div>
                          <p className="font-bold text-sm text-gray-200 group-hover:text-white">{link.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Official Source</p>
                        </div>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </a>
                    ))}
                  </div>
                ) : <p className="text-gray-500">No official streams found for your region.</p>}
              </div>
            )}

            <button onClick={onClose} className={modalStyles.closeBtn}>✕</button>
          </div>

          <div className={modalStyles.sidebar}>
            <div className={modalStyles.sidebarHeader}>
              <h2 className="text-xl font-black leading-tight mb-2 line-clamp-2 text-white">{anime.title_english || anime.title}</h2>
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                <span className="text-pink-500">★ {anime.score}</span>
                <span>{anime.year || 'N/A'}</span>
                <span>{anime.episodes || '?'} Eps</span>
              </div>
              <div className="flex gap-2 mt-4 bg-black/40 p-1 rounded-lg">
                <button onClick={() => setView('info')} className={modalStyles.tabBtn(view === 'info')}>Info</button>
                <button onClick={() => setView('episodes')} className={modalStyles.tabBtn(view === 'episodes')}>Episodes</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {view === 'info' && (
                <>
                  <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-2 px-2">Source</p>
                  <button onClick={() => setActiveSource('trailer')} className={`${modalStyles.sourceBtn} ${activeSource === 'trailer' ? 'bg-pink-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                    <span>🎥</span><div className="text-left"><p className="text-xs font-bold">Watch Trailer</p></div>
                  </button>
                  <button onClick={() => setActiveSource('official')} className={`${modalStyles.sourceBtn} ${activeSource === 'official' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                    <span>🌐</span><div className="text-left"><p className="text-xs font-bold">Official Sources</p></div>
                  </button>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-2">Synopsis</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{anime.synopsis}</p>
                  </div>
                </>
              )}
              {view === 'episodes' && (
                loadingEpisodes ? <div className="py-10"><HelmSpinner /></div> : (
                  episodes.length > 0 ? episodes.map((ep) => (
                    <button key={ep.mal_id} onClick={() => handleEpisodeClick(ep)} className={modalStyles.episodeBtn(currentEpisode?.mal_id === ep.mal_id)}>
                      <div className="w-8 h-8 rounded bg-black/40 flex items-center justify-center text-[10px] font-bold shrink-0">{ep.mal_id}</div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold truncate">{ep.title || `Episode ${ep.mal_id}`}</p>
                        <p className="text-[9px] text-gray-500">{ep.aired ? new Date(ep.aired).toLocaleDateString() : ''}</p>
                      </div>
                      <span className="ml-auto text-[10px] opacity-50">▶</span>
                    </button>
                  )) : <p className="text-center text-gray-500 text-xs py-10">No episodes found.</p>
                )
              )}
            </div>

            <div className="p-4 bg-[#0a0a0e] mt-auto shrink-0 border-t border-white/5">
              {user ? (
                <button onClick={() => toggleWatchlist(anime)} className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${inList ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white text-black hover:bg-gray-200'}`}>
                  {inList ? '- Remove List' : '+ Add Watchlist'}
                </button>
              ) : <p className="text-xs text-gray-500 text-center italic">Login to save</p>}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;