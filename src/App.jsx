import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './store/slices/authSlice';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import PrivateRoutes from './store/PrivateRoutes';
import CommonRoutes from './store/CommonRoutes';

const App = () => {

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
