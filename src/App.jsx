import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './store/slices/authSlice';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if there is a stored username in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      // Dispatch login success action if username is found
      dispatch(loginSuccess(storedUsername));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          render={() => (isAuthenticated ? <Dashboard /> : <Navigate to="/login" />)}
        />
      </Routes>
    </Router>
  );
};

export default App;
