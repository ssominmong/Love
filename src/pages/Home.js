import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-32 pb-20 px-6 bg-white text-gray-900">
      <motion.h1
        className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        KMC 💖 KSH
        <br className="hidden md:block" />

      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        우리의 소중한 기억.
        <br className="hidden md:block" />
        평생 같이 하자!
      </motion.p>

      <Link to="/memories">
        <motion.button
          className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          whileTap={{ scale: 0.95 }}
        >
          추억 보러가기
        </motion.button>
      </Link>
    </div>
  );
}
