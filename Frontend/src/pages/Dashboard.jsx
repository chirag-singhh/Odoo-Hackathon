// // src/pages/Dashboard.jsx
// import { useNavigate } from 'react-router-dom'

// function Dashboard() {
//   const navigate = useNavigate()

//   const logout = () => {
//     localStorage.removeItem('token')
//     navigate('/')
//   }

//   return (
//     <div>
//       <h2>Welcome to Dashboard 🎉</h2>
//       <button onClick={logout}>Logout</button>
//     </div>
//   )
// }

// export default Dashboard




// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/logout') // or '/' if you don't want to use a separate logout page
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Welcome to Dashboard 🎉</h2>
        <p className="text-gray-600 mb-6">You're logged in successfully.</p>
        <button
          onClick={logout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard


