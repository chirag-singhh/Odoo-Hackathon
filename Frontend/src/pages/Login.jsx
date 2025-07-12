
// // src/pages/Login.jsx
// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { API } from '../lib/axios'

// function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await API.post('/auth/login', { email, password })
//       localStorage.setItem('token', res.data.token)
//       navigate('/dashboard')
//       console.log("success")
//     } catch (err) {
//       alert('Login failed')
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             placeholder="Email"
//             type="email"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             placeholder="Password"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-indigo-600 hover:underline">
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login
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
