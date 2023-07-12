import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import SignupPage from './SignUpPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import Dashboard from './Dashboard';

const App = () => {
  const baseURL = 'http://localhost:8080';
  const [firstName, setFirstName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  const handleSignup = async (user) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, user);
      console.log(response.data);
      localStorage.setItem('userId', response.data.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (user, navigate) => {
    try {
      const response = await axios.post(`${baseURL}/login`, user);
      console.log(response.data);
      if (response && response.data.firstName) {
        const { password, id } = response.data;
        if (password === user.password) {
          setFirstName(response.data.firstName);
          setLoggedIn(true);
          localStorage.setItem('userId', id);
          navigate('/dashboard');
        }
        else {
          console.log('Incorrect password.');
          setLoggedIn(false);
        }

      }
    }
    catch (error) {
      console.error(error);
    }

  };


  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };


  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} /> { }
          <Route
            path="/dashboard"
            element={loggedIn ? (<Dashboard firstName={firstName} handleLogout={handleLogout} />) : (<Navigate to="/login" />)} />

          <Route path="/services" element={<ServicesPage />} /> { }
          <Route
            path="/signup"
            element={<SignupPage handleSignup={handleSignup} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};


export default App;