import axios from 'axios';
import { Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth/';


const register = (name, email, password) => {
    return axios.post(API_URL + 'signup', { name, email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      <Navigate to="/" />
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default { register, login, logout };
