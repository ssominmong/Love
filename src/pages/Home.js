import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Home() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [milestoneMessage, setMilestoneMessage] = useState("");

  const startDate = dayjs("2022-07-18"); // 💘 너희 사귄 날

  useEffect(() => {
    const today = dayjs();
    const diff = today.diff(startDate, "day");
    setDaysTogether(diff);

    // 💝 기념일 체크
    const milestoneDays = [100, 200, 365, 500, 700, 1000, 1111, 1500, 2000, 2500, 3000, 3500];
    if (milestoneDays.includes(diff)) {
      setMilestoneMessage(`🎉 오늘은 우리가 ${diff}일 되는 특별한 날이에요!`);
    }
  }, [startDate]);

  return (
    <div className="pt-32 pb-20 px-6 bg-white text-gray-900 text-center">
      {/* 💖 기념일 계산 문구 */}
      <motion.p
        className="text-lg md:text-xl text-pink-500 font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        오늘은 우리가 함께한 지 <strong className="text-pink-600">{daysTogether}일째</strong> 되는 날이야!
      </motion.p>

      {/* 🎉 기념일 축하 메시지 (있을 때만 표시) */}
      {milestoneMessage && (
        <motion.p
          className="text-md md:text-lg text-red-500 font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {milestoneMessage}
        </motion.p>
      )}

      {/* 💌 제목 */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        KMC 💖 KSH
      </motion.h1>

      {/* 📜 소개 문구 */}
      <motion.p
        className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        우리의 소중한 기억.
        <br className="hidden md:block" />
        평생 같이 하자!
      </motion.p>

      {/* 📸 대표 사진 */}
      <motion.img
        src="/main-couple.jpg"
        alt="우리의 대표 사진"
        className="w-full max-w-md mx-auto rounded-3xl shadow-xl mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      {/* 🔗 추억 보러가기 */}
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
