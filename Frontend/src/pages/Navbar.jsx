// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Bell, User, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { API } from "../lib/axios";
export default function Navbar({ isLoggedIn }) {
  const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const unread = res.data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("❌ Error fetching notifications", err.message);
    }
  };

  fetchUnreadCount();
}, []);

  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // 🔁 Re-render App after logout
  };

  return (
    <header
      className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-purple-900 shadow-sm"
      style={{ background: 'linear-gradient(135deg, #1e1b4b, #3f2d56)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-white">StackIt</h1>
        <div className="hidden md:flex gap-4">
          <Link to="/" className="text-sm font-medium text-purple-200 hover:text-white transition">Home</Link>
          <Link to="/tags" className="text-sm font-medium text-purple-200 hover:text-white transition">Tags</Link>
          <Link to="/questions" className="text-sm font-medium text-purple-200 hover:text-white transition">Questions</Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {showSearch ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-10 w-40 md:w-60 px-4 rounded-lg bg-[#2b2b36] text-white placeholder:text-purple-300 border border-purple-700 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-purple-300 hover:text-white transition"
              >
                {/* <Search size={20} /> */}
              </button>
            )}
<Link to="/notifications" className="relative">
  <button className="text-purple-300 hover:text-white transition">
    <Bell size={20} />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        {unreadCount}
      </span>
    )}
  </button>
</Link>
            <Link to={'/profile'}>
            <button className="text-purple-300 hover:text-white transition"><User size={20} /></button>
</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-purple-900 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
              Login
            </Link>
            <Link to="/signup" className="bg-purple-900 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
