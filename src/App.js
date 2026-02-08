import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DailyTasksPage from './pages/DailyTasksPage';
import MonthlyTasksPage from './pages/MonthlyTasksPage';
import YearlyTasksPage from './pages/YearlyTasksPage';
import SkillsPage from './pages/SkillsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './styles.css';

function App() {
  return (
    <AppProvider>
      <div className="app-wrapper">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/daily-tasks" element={<DailyTasksPage />} />
            <Route path="/monthly-tasks" element={<MonthlyTasksPage />} />
            <Route path="/yearly-tasks" element={<YearlyTasksPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
