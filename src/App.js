import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
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
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignup = () => setIsLoggedIn(true);

  return (
      <div className="app-container">
        <header className="header">
          {isLoggedIn && <Navbar />}
        </header>
        <main className="content">
          <img src='./images/homebg.jpg' alt="Background" className="background-img" />
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <About />
              </ProtectedRoute>
            } />
            <Route path='/contact' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Contact />
              </ProtectedRoute>
            } />
            <Route path='/connect' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Reach />
              </ProtectedRoute>
            } />
            <Route path='/help' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Help />
              </ProtectedRoute>
            } />
            <Route path='/chatbot' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Chatbot />
              </ProtectedRoute>
            } />
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