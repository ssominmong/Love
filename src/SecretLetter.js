import { Link } from "react-router-dom";

export default function SecretLetter() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-100 p-8 text-center font-serif">
      <h1 className="text-3xl text-pink-700 font-bold mb-6">💌 비밀 편지</h1>
      <p className="text-lg text-gray-700 max-w-md leading-relaxed">
        사랑하는 너에게.  
        <br />
        이 천일 동안, 나랑 함께해줘서 고마워.  
        <br />
        나에겐 너와 보낸 하루하루가 정말 큰 선물이었어.  
        <br />
        앞으로도 너랑 함께 걸어가고 싶어.  
        <br /> <br />
        사랑해. 많이 많이 💖
      </p>

      <Link to="/">
        <button className="mt-10 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          돌아가기
        </button>
      </Link>
    </div>
  );
}
