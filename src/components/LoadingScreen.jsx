import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1.5, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="mb-12"
    >
      <Logo />
    </motion.div>
    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 to-red-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 animate-pulse"
    >
      Loading Assets...
    </motion.p>
  </motion.div>
);

export default LoadingScreen;