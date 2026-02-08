import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navigation = () => {
  const { darkMode, toggleDarkMode } = useContext(AppContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">Goal Planner</span>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/daily-tasks" className={`nav-link ${isActive('/daily-tasks')}`}>
              <span className="nav-icon">📅</span>
              <span className="nav-label">Daily Tasks</span>
            </Link>
          </li>
          <li>
            <Link to="/monthly-tasks" className={`nav-link ${isActive('/monthly-tasks')}`}>
              <span className="nav-icon">📊</span>
              <span className="nav-label">Monthly</span>
            </Link>
          </li>
          <li>
            <Link to="/yearly-tasks" className={`nav-link ${isActive('/yearly-tasks')}`}>
              <span className="nav-icon">📈</span>
              <span className="nav-label">Yearly</span>
            </Link>
          </li>
          <li>
            <Link to="/skills" className={`nav-link ${isActive('/skills')}`}>
              <span className="nav-icon">⭐</span>
              <span className="nav-label">Skills</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>
              <span className="nav-icon">📉</span>
              <span className="nav-label">Analytics</span>
            </Link>
          </li>
        </ul>

        <button
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
          onClick={toggleDarkMode}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
