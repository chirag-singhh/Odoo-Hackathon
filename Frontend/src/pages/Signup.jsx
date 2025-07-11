// // src/pages/Signup.jsx
// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import {API} from '../lib/axios'

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
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup}>
//         <input
//           value={fullName}
//           onChange={e => setName(e.target.value)}
//           placeholder='Full Name'
//         /><br />
//         <input
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder='Email'
//         /><br />
//         <input
//           type='password'
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder='Password'
//         /><br />
//         <button type='submit'>Signup</button>
//       </form>
//       <p>Already have an account? <Link to="/">Login</Link></p>
//     </div>
//   )
// }

// export default Signup



// src/pages/Signup.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API } from '../lib/axios'

function Signup() {
  const [fullName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await API.post('auth/signup', { fullName, email, password })
      alert('Signup successful')
      navigate('/')
    } catch (err) {
      alert('Signup failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            value={fullName}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
