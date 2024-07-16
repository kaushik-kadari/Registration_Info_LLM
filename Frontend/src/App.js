import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Components/Homepage/HomePage';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Contact from './Components/Contact/ContactUs';
import NotFound from './Components/NotFound';
import Chatbot from './Components/Chatbot/Chatbot';
import Reach from './Components/Reachus/Reachus';
import './App.css';
import Help from './Components/Help';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SetPassword from './Components/SetPassword/SetPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import authService from './services/authService';

function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
  console.log(isAuthenticated);
  
  const onLogin = () => setIsAuthenticated(true); // Set isAuthenticated to true onLogin

  const Logout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      authService.logout(); // Call logout function from authService
      setIsAuthenticated(false);
      navigate('/login'); // Navigate to login page after logout
    };

    handleLogout();
  }

  return (
      <div className="app-container">
         {isAuthenticated && (
          <header className="header">
            <Navbar />
          </header>
        )}
        <main className="content">
          <img src='./images/homebg.jpg' alt="Background" className="background-img" />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute >
                <HomePage />
              </ProtectedRoute>
              } />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login onLogin={onLogin}/>} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/setpassword/:token" element={<SetPassword />} />
            <Route path="/home" element={
              <ProtectedRoute >
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute >
                <About />
              </ProtectedRoute>
            } />
            <Route path='/contact' element={
              <ProtectedRoute >
                <Contact />
              </ProtectedRoute>
            } />
            <Route path='/connect' element={
              <ProtectedRoute >
                <Reach />
              </ProtectedRoute>
            } />
            <Route path='/help' element={
              <ProtectedRoute >
                <Help />
              </ProtectedRoute>
            } />
            <Route path='/chatbot' element={
              <ProtectedRoute >
                <Chatbot />
              </ProtectedRoute>
            } />
            <Route path='/logout'element={
              <ProtectedRoute >
                <Logout />
              </ProtectedRoute>
            }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* <footer className="footer">
          <Footer />
        </footer> */}
      </div>
  );
}

export default App;