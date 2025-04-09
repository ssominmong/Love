import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [form, setForm] = useState({
    date: "",
    title: "",
    note: ""
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const memoriesRef = collection(db, "memories");
    const unsubscribe = onSnapshot(memoriesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMemories(data);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    if (!form.date || !form.title || !form.note) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    try {
      await addDoc(collection(db, "memories"), {
        title: form.title,
        note: form.note,
        date: form.date
      });

      alert("추억이 저장되었습니다! 💖");
      setForm({ date: "", title: "", note: "" });
      setShowModal(false);
    } catch (err) {
      console.error("❌ 저장 실패:", err);
      alert("저장 중 오류가 발생했어요 😢");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "memories", id));
  };

  return (
    <div className="pt-32 pb-20 px-4 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-8">📚 우리의 추억 아카이브</h2>

        <button
          onClick={() => setShowModal(true)}
          className="mb-10 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          ➕ 추억 추가하기
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold text-pink-600 mb-4">새로운 추억 추가하기</h3>

              <div className="grid grid-cols-1 gap-4 text-left">
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2"
                />
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2"
                  placeholder="제목"
                />
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2 h-24 resize-none"
                  placeholder="내용"
                />

                <button
                  onClick={handleAdd}
                  className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition mt-2"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="bg-rose-50 p-6 rounded-2xl shadow hover:shadow-lg transition-all text-left relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-pink-700 mb-2">{memory.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{memory.date}</p>
              <p className="text-gray-700 mb-2 whitespace-pre-line">{memory.note}</p>
              <button
                onClick={() => handleDelete(memory.id)}
                className="absolute top-3 right-3 text-sm text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
