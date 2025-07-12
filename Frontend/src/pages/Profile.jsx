import React, { useEffect, useState } from "react";
import { API } from "../lib/axios"; // assumes you have an axios instance setup
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hardcodedAvatar = "https://i.pravatar.cc/150?img=47";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("❌ Failed to load profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-white flex justify-center items-start">
      <div className="w-full max-w-3xl bg-[#2a1f4d] border border-purple-500/20 rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={hardcodedAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-500"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-sm text-[#c7c9ff]">{user.email}</p>
            <p className="text-sm text-[#a0a0d0]">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#3b2a61] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{user.fullName}</p>
            <p className="text-sm text-[#a0a0d0]">Name</p>
          </div>
         
        </div>

        {/* Action */}
        <div className="flex justify-end">
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
