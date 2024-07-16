// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
