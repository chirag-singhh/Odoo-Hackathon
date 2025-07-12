


// src/pages/Logout.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')

    const timeout = setTimeout(() => {
      navigate('/')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">You have been logged out.</h2>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
}

export default Logout
