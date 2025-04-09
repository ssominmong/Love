import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";

export default function Letters() {
  const [letters, setLetters] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", content: "" });
  const [showModal, setShowModal] = useState(false);

  const lettersRef = collection(db, "letters");

  // 실시간 감지로 편지 불러오기
  useEffect(() => {
    const unsubscribe = onSnapshot(lettersRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLetters(data);
    });
    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    if (!form.name || !form.date || !form.content) return;
    await addDoc(lettersRef, form);
    setForm({ name: "", date: "", content: "" });
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "letters", id));
  };

  return (
    <div className="pt-32 pb-20 px-4 bg-pink-50 min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-8">💌 편지 보관함</h2>

        <button
          onClick={() => setShowModal(true)}
          className="mb-10 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          💌 편지 쓰기
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

              <h3 className="text-2xl font-bold text-pink-600 mb-4">새 편지 쓰기</h3>

              <div className="grid grid-cols-1 gap-4 text-left">
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2"
                  placeholder="보낸 사람"
                />
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2"
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="border border-pink-300 rounded-lg px-4 py-2 h-32 resize-none"
                  placeholder="편지 내용"
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

        <div className="text-left space-y-6">
          {letters.map((letter) => (
            <div key={letter.id} className="bg-white p-5 rounded-xl shadow relative">
              <div className="text-sm text-gray-500 mb-2">
                ✉️ {letter.name} • {letter.date}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{letter.content}</p>
              <button
                onClick={() => handleDelete(letter.id)}
                className="absolute top-2 right-3 text-xs text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
