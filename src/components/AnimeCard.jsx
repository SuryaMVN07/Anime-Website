import { motion } from 'framer-motion';

const AnimeCard = ({ anime, onClick, toggleWatchlist, inWatchlist }) => {
  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    toggleWatchlist(anime);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/5 hover:border-pink-500/30 transition-all duration-300"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={anime.images?.webp?.large_image_url || 'https://via.placeholder.com/300x400'}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleWatchlistClick}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-500/20 hover:scale-110"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={inWatchlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={inWatchlist ? "text-pink-500" : "text-white"}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {anime.score && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-yellow-400 text-xs font-bold">⭐ {anime.score}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
          {anime.title_english || anime.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{anime.year || 'N/A'}</span>
          <span className="bg-white/10 px-2 py-1 rounded-md">{anime.type || 'TV'}</span>
        </div>

        {anime.episodes && (
          <div className="mt-2 text-xs text-gray-500">
            {anime.episodes} episodes
          </div>
        )}

        <div className="mt-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Genre:</span>
            <span className="text-gray-300 text-right w-1/2 truncate">
              {anime.genres?.map(g => g.name).join(', ') || 'Action'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex gap-2 pt-2">
          <button className=""><span>▶</span> Watch Now</button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleWatchlist(anime); }}
            className={`w-10 rounded-sm flex items-center justify-center border transition-all ${inWatchlist ? 'bg-pink-600 border-pink-600 text-white' : 'border-white/20 hover:bg-white/10 text-white'}`}
          >
            <span className="text-lg">{inWatchlist ? '✓' : '+'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;