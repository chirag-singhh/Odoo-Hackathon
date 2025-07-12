

// // src/pages/Signup.jsx
// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { API } from '../lib/axios'

// function Signup() {
//   const [fullName, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleSignup = async (e) => {
//     e.preventDefault()
//     try {
//       await API.post('auth/signup', { fullName, email, password })
//       alert('Signup successful')
//       navigate('/')
//     } catch (err) {
//       alert('Signup failed')
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Signup</h2>
//         <form onSubmit={handleSignup} className="space-y-4">
//           <input
//             value={fullName}
//             onChange={e => setName(e.target.value)}
//             placeholder="Full Name"
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
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
//             Signup
//           </button>
//         </form>
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Signup




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { API } from '../lib/axios';

function Signup() {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { fullName, email, password });
      alert('Signup successful');
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] to-[#3f2d56] px-4 font-sans text-white"
    >
      {/* Signup Form */}
      <div className="relative w-full max-w-md bg-[#2a1f4d] rounded-2xl shadow-lg p-8">
        {/* Close Button inside the box */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-purple-300 hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#3f2d56] text-white placeholder-purple-300 border border-[#4b3a6e] focus:outline-none focus:border-purple-200"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#3f2d56] text-white placeholder-purple-300 border border-[#4b3a6e] focus:outline-none focus:border-purple-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#3f2d56] text-white placeholder-purple-300 border border-[#4b3a6e] focus:outline-none focus:border-purple-200"
            required
          />
          <button
            type="submit"
            className="w-full h-12 bg-purple-800 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Sign up
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-purple-300">
          Already have an account?{' '}
          <Link to="/login" className="text-white underline hover:text-purple-100">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
