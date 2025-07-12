
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { API } from "../lib/axios";

const getIcon = (type) => {
  switch (type) {
    case "answer":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
        </svg>
      );
    case "comment":
    case "mention":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
        </svg>
      );
    default:
      return null;
  }
};

const formatTime = (iso) => {
  const date = new Date(iso);
  return date.toLocaleString();
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("❌ Failed to mark as read:", err.response?.data || err.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    const token = localStorage.getItem("token");
    try {
      // mark all unread notifications one by one
      const unread = notifications.filter((n) => !n.isRead);
      await Promise.all(
        unread.map((n) =>
          API.patch(`/notifications/${n._id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      // update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error("❌ Failed to mark all as read:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6 text-white">
      <div className="relative w-full max-w-2xl bg-[#2a1f4d] p-6 rounded-xl shadow-xl">
        <button
          onClick={() => navigate("/")}
          className="absolute right-4 top-4 text-purple-300 hover:text-white transition p-1"
        >
          <X size={22} />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-center">Notifications</h1>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm bg-purple-700 hover:bg-purple-600 px-4 py-1 rounded-lg transition"
          >
            Mark all as read
          </button>
        </div>

        {loading ? (
          <p className="text-center text-purple-200">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-purple-400">No notifications yet.</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              onClick={() => handleMarkAsRead(note._id)}
              className={`cursor-pointer flex items-center gap-4 px-4 py-3 rounded-lg mb-3 transition ${
                note.isRead ? "bg-[#3b2a61]" : "bg-purple-700"
              } hover:bg-[#4b3781]`}
            >
              <div className="flex items-center justify-center rounded-lg bg-[#e7edf4] text-[#0d141c] shrink-0 size-12">
                {getIcon(note.type)}
              </div>
              <div>
                <p className="text-white font-medium">{note.message}</p>
                <p className="text-sm text-[#a5a4db]">{formatTime(note.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
