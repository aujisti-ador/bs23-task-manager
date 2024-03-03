import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './store/slices/authSlice';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import PrivateRoutes from './store/PrivateRoutes';
import CommonRoutes from './store/CommonRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if there is a stored username in localStorage
    // const storedUsername = localStorage.getItem('username');
    console.log("===>app jsx login", isAuthenticated, username)
    // if (storedUsername) {
    //   // Dispatch login success action if username is found
    //   dispatch(loginSuccess(storedUsername));
    // }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<CommonRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
