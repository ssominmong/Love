import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import About from "./pages/About";
import HeartsBackground from "./components/HeartsBackground"; 
import Letters from "./pages/Letters"; 

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-800 bg-gradient-to-br from-rose-50 to-pink-100 min-h-screen relative overflow-hidden">
        {/* 💖 하트 배경 */}
        <HeartsBackground />

        {/* 💖 고정 상단 메뉴바 */}
        <Navbar />

        {/* 💖 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/about" element={<About />} />
          <Route path="/letters" element={<Letters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
