
// import { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate } from "react-router-dom";
// import './App.css';

// import Login from './pages/Login';
// import Logout from './pages/Logout';
// import Dashboard from './pages/Dashboard';
// import Signup from './pages/Signup';
// import ProtectedRoute from './components/ProtectedRoutes';
// import AllQuestions from './pages/AllQuestion';
// import QuestionDetail from './pages/QuestionDetail';
// import LandingPage from './pages/LandingPage';
// import Navbar from './pages/Navbar';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <>
//       {/* ✅ Show Navbar only after login */}
//       {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

//       <Routes>
//         {/* Public Routes */}
//        <Route
//   path="/"
//   element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
// />

//         <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path='/signup' element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path='/dashboard'
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/questions' element={<AllQuestions />} />
//         <Route path="/questions/:id" element={<QuestionDetail />} />
//         <Route path='/logout' element={<Logout />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoutes';
import AllQuestions from './pages/AllQuestion';
import QuestionDetail from './pages/QuestionDetail';
import LandingPage from './pages/LandingPage';
import Navbar from './pages/Navbar';
import AskQuestionPage from './pages/AskQuestion';
import QuestionsByTag from './pages/QuestionsByTags';
import { Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Hide Navbar on these routes
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/questions' element={<AllQuestions />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path='/logout' element={<Logout />} />
        {/* <Route path='/postquestion' element={<AskQuestionPage />} /> */}
        {/* <Route path="/tags" element={<QuestionsByTag />} /> */}
        <Route path="/tags" element={<QuestionsByTag isLoggedIn={isLoggedIn} />} />
<Route path='/profile' element={<Profile />} />
<Route path='/notifications' element={<Notifications />} />

        <Route
  path="/postquestion"
  element={isLoggedIn ? <AskQuestionPage /> : <Navigate to="/login" />}
/>

      </Routes>
    </>
  );
}

export default App;
