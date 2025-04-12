// src/components/Navbar.js
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
      isActive(path)
        ? "bg-pink-500 text-white shadow-md"
        : "bg-white text-pink-500 border border-pink-300 hover:bg-pink-100 hover:shadow"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-pink-600">
          💖 쏘밍몽 diary
        </Link>

        <div className="flex flex-row gap-4">
          <Link to="/memories" className={linkClass("/memories")}>
            추억
          </Link>

          <Link to="/letters" className={linkClass("/letters")}>
            너에게
          </Link>

          <Link to="/farm" className={linkClass("/farm")}>
            🐣 농장
          </Link>
        </div>
      </div>
    </nav>
  );
}
