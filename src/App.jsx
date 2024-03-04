import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './components/login/Login';
import PrivateRoutes from './store/PrivateRoutes';
import CommonRoutes from './store/CommonRoutes';
import TasksList from './pages/tasks/TasksList';
import TaskDetails from './pages/tasks/TaskDetails';
import MemberList from './pages/members/MemberList';
import MemberDetails from './pages/members/MemberDetails';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/dashboard"
          >
            {/* Nested routes for tasks */}
            <Route index element={<Dashboard />} />
            <Route exact path="tasks" element={<TasksList />} />
            <Route path="tasks/:taskId" element={<TaskDetails />} />
            <Route exact path="members" element={<MemberList />} />
            <Route path="members/:memberId" element={<MemberDetails />} />
          </Route>
        </Route>
        <Route element={<CommonRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
