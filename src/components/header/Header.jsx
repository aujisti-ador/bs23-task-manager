import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"; // Import your CSS file for styling

const Header = ({ appName, username, onLogout }) => {
  return (
    <div className='header-container'>
      <div className='left-section'>
        <img src="/bs23-logo.png" alt="Logo" className='logo' />
        <h1>{appName}</h1>
      </div>
      <div className='right-section'>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/tasks">Tasks</Link>
        <Link to="/members">Members</Link>
        <span className='username'>{username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
