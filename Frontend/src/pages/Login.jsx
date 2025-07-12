
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { API } from '../lib/axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      // ✅ Store token and update login state
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true); // <-- This makes Navbar appear

      navigate('/'); // or navigate('/')
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b, #3f2d56)',
        fontFamily: 'Inter, "Noto Sans", sans-serif',
      }}
    >
      <div className="relative w-full max-w-md bg-[#2a1f4d] p-6 rounded-2xl shadow-lg text-white">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-purple-300 hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-purple-200 block mb-1">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="w-full px-4 py-3 rounded-lg bg-[#3f2d56] placeholder-purple-300 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-purple-200 block mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#3f2d56] placeholder-purple-300 text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 hover:bg-purple-700 py-3 rounded-lg font-semibold text-white"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-purple-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-white underline hover:text-purple-100">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
