import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function Farm() {
  const farmRef = doc(db, "farm", "main");

  const [animals, setAnimals] = useState([]);
  const [season, setSeason] = useState(1);
  const [goal, setGoal] = useState(0);

  const [mincheolTotal, setMincheolTotal] = useState(0);
  const [sohyunTotal, setSohyunTotal] = useState(0);

  const [mincheolToday, setMincheolToday] = useState(0);
  const [sohyunToday, setSohyunToday] = useState(0);

  const [today, setToday] = useState("");
  const [lastFedDate, setLastFedDate] = useState("");

  const animalOptions = ["🐷", "🐮", "🐔", "🐰", "🦆", "🐑", "🦙", "🦄", "🐸", "🐱"];
  const MAX_ANIMALS = 20;
  const MAX_DAILY_FEED = 50;

  // 오늘 날짜 세팅
  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setToday(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Firestore 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(farmRef);
      if (snap.exists()) {
        const data = snap.data();
        const isNewDay = data.lastFedDate !== today;

        setAnimals(data.animals || []);
        setSeason(data.season || 1);
        setGoal(data.goal || generateGoal());

        setMincheolTotal(data.mincheolTotal || 0);
        setSohyunTotal(data.sohyunTotal || 0);

        setMincheolToday(isNewDay ? 0 : data.mincheolToday || 0);
        setSohyunToday(isNewDay ? 0 : data.sohyunToday || 0);
        setLastFedDate(today);

        if (isNewDay) {
          await updateDoc(farmRef, {
            mincheolToday: 0,
            sohyunToday: 0,
            lastFedDate: today,
          });
        }
      } else {
        await setDoc(farmRef, {
          animals: [],
          season: 1,
          goal: generateGoal(),
          mincheolTotal: 0,
          sohyunTotal: 0,
          mincheolToday: 0,
          sohyunToday: 0,
          lastFedDate: today,
        });
      }
    };

    fetchData();
  }, [today]);

  const generateGoal = () => Math.floor(Math.random() * 100) + 1;

  const handleFeed = async (who) => {
    if (animals.length >= MAX_ANIMALS) {
      const newSeason = season + 1;
      alert(`🌱 동물 20마리 도달! 시즌 ${newSeason} 시작!`);
      await updateDoc(farmRef, {
        animals: [],
        goal: generateGoal(),
        season: newSeason,
        mincheolTotal: 0,
        sohyunTotal: 0,
        mincheolToday: 0,
        sohyunToday: 0,
        lastFedDate: today,
      });
      setAnimals([]);
      setSeason(newSeason);
      setGoal(generateGoal());
      setMincheolTotal(0);
      setSohyunTotal(0);
      setMincheolToday(0);
      setSohyunToday(0);
      return;
    }

    // 하루 제한 체크
    if (who === "mincheol" && mincheolToday >= MAX_DAILY_FEED) {
      alert("민철이는 오늘 더 이상 줄 수 없어요!");
      return;
    }
    if (who === "sohyun" && sohyunToday >= MAX_DAILY_FEED) {
      alert("소현이는 오늘 더 이상 줄 수 없어요!");
      return;
    }

    // 값 증가
    const updates = {};
    if (who === "mincheol") {
      const newTotal = mincheolTotal + 1;
      const newToday = mincheolToday + 1;
      setMincheolTotal(newTotal);
      setMincheolToday(newToday);
      updates.mincheolTotal = newTotal;
      updates.mincheolToday = newToday;
    } else {
      const newTotal = sohyunTotal + 1;
      const newToday = sohyunToday + 1;
      setSohyunTotal(newTotal);
      setSohyunToday(newToday);
      updates.sohyunTotal = newTotal;
      updates.sohyunToday = newToday;
    }

    // Firestore 반영
    await updateDoc(farmRef, updates);

    // ✅ 동물 생성 조건 확인
    if (mincheolTotal + (who === "mincheol" ? 1 : 0) === goal &&
        sohyunTotal + (who === "sohyun" ? 1 : 0) === goal) {
      const newAnimal = animalOptions[Math.floor(Math.random() * animalOptions.length)];
      const newAnimals = [...animals, newAnimal];
      const newGoal = generateGoal();

      alert(`🎉 ${newAnimal} 동물이 태어났어요! 다음 목표는 ${newGoal}번이에요!`);

      setAnimals(newAnimals);
      setMincheolTotal(0);
      setSohyunTotal(0);
      setGoal(newGoal);

      await updateDoc(farmRef, {
        animals: newAnimals,
        mincheolTotal: 0,
        sohyunTotal: 0,
        goal: newGoal,
      });
    }
  };

  return (
    <div className="pt-28 pb-16 px-4 min-h-screen bg-lime-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        🐾 우리 농장 <span className="text-sm text-gray-600">Season {season}</span>
      </h1>

      <p className="text-gray-700 mb-1">🎯 목표: {goal}번!</p>
      <p className="text-sm text-gray-500 mb-4">
        🧑 민철이: 총 {mincheolTotal} / 오늘 {mincheolToday} / 50<br />
        👩 소현이: 총 {sohyunTotal} / 오늘 {sohyunToday} / 50
      </p>

      <div className="text-4xl mb-10 grid grid-cols-5 gap-4 justify-center">
        {animals.map((animal, idx) => (
          <span key={idx}>{animal}</span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <button
          onClick={() => handleFeed("mincheol")}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        >
          🍚 밍무이의 사료
        </button>
        <button
          onClick={() => handleFeed("sohyun")}
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
        >
          🍚 쏘무이의 사료
        </button>
      </div>
    </div>
  );
}
