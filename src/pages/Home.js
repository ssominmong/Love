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
        우리 1000일,  
        <br className="hidden md:block" />
        사랑의 기록을 남겼어요
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        너와 함께한 하루하루가 소중한 기억이야.  
        이 웹사이트는 오직 너만을 위한 감성 기록장이야.
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
