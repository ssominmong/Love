import { useState, useEffect } from "react";

export default function Letters() {
  const getInitialLetters = () => {
    try {
      const saved = localStorage.getItem("letters");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("편지 불러오기 실패:", e);
      return [];
    }
  };

  const [letters, setLetters] = useState(getInitialLetters());
  const [form, setForm] = useState({ name: "", date: "", content: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("letters", JSON.stringify(letters));
  }, [letters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (!form.name || !form.date || !form.content) return;
    const newLetter = { ...form };
    setLetters([newLetter, ...letters]);
    setForm({ name: "", date: "", content: "" });
    setShowModal(false);
  };

  const handleDelete = (indexToDelete) => {
    const updated = letters.filter((_, i) => i !== indexToDelete);
    setLetters(updated);
  };

  return (
    <div className="pt-32 pb-20 px-4 bg-pink-50 min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-8">💌 편지 보관함</h2>

        {/* 모달 열기 버튼 */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-10 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          💌 편지 쓰기
        </button>

        {/* 모달 */}
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

        {/* 편지 목록 */}
        <div className="text-left space-y-6">
          {letters.map((letter, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow relative">
              <div className="text-sm text-gray-500 mb-2">
                ✉️ {letter.name} • {letter.date}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{letter.content}</p>
              <button
                onClick={() => handleDelete(index)}
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
