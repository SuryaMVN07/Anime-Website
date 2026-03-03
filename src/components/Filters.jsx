import { motion, AnimatePresence } from 'framer-motion';
import { GENRES, ANIME_TYPES, ANIME_STATUS } from '../utils/constants';

const Filters = ({ showFilters, filters, updateFilter }) => {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden mb-12"
        >
          <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl">
            {[
              { label: 'Genre', items: GENRES, key: 'genre' },
              { label: 'Format', items: ANIME_TYPES, key: 'type' },
              { label: 'Status', items: ANIME_STATUS, key: 'status' }
            ].map((section) => (
              <div key={section.key}>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">{section.label}</label>
                <div className="flex flex-wrap gap-2">
                  {section.items.map(item => (
                    <button
                      key={item.label}
                      onClick={() => updateFilter(section.key, item.id ?? item.value)}
                      className={`text-[10px] px-3 py-1 rounded border transition-colors ${
                        filters[section.key] === (item.id ?? item.value)
                          ? 'bg-pink-600 border-pink-600 text-white'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filters;