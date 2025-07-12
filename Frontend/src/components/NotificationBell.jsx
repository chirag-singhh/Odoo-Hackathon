import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios"; // your Axios instance

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const unread = res.data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("❌ Error fetching unread count", err.message);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
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
  );
};

export default NotificationBell;
