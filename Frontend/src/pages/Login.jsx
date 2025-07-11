// // src/pages/Login.jsx
// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import {API} from '../lib/axios'

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
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' /><br />
//         <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' /><br />
//         <button type='submit'>Login</button>
//       </form>
//       <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//     </div>
//   )
// }

// export default Login




// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API } from '../lib/axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
      console.log("success")
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
