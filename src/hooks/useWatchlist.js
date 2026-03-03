import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    console.log('Attempting to load watchlist from localStorage...');
    const storedWatchlist = localStorage.getItem('anime-watchlist');
    console.log('Raw storedWatchlist:', storedWatchlist);
    if (storedWatchlist) {
      try {
        const parsed = JSON.parse(storedWatchlist);
        console.log('Loading watchlist from localStorage:', parsed);
        return parsed;
      } catch (e) {
        console.error("Error parsing stored watchlist:", e);
        localStorage.removeItem('anime-watchlist');
      }
    }
    return [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    console.log('Saving watchlist to localStorage:', watchlist);
    localStorage.setItem('anime-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = async (anime) => {
    console.log('Toggling watchlist for:', anime.title);
    setWatchlist(prev => {
      const exists = prev.some(item => item.mal_id === anime.mal_id);
      let newWatchlist;
      if (exists) {
        newWatchlist = prev.filter(item => item.mal_id !== anime.mal_id);
        console.log('Removed from watchlist:', anime.title);
      } else {
        newWatchlist = [...prev, anime];
        console.log('Added to watchlist:', anime.title);
      }
      return newWatchlist;
    });
  };

  return { watchlist, toggleWatchlist };
};