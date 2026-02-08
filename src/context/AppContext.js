import React, { createContext, useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { loadTasks, saveTasks, loadSkills, saveSkills, loadTheme, saveTheme } from '../utils/storage';

export const AppContext = createContext();

const makeId = () => Math.random().toString(36).slice(2, 9);

const DAILY_QUOTES = [
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "You don't have to be great to start, but you have to start to be great.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
];

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = loadTasks();
    if (stored) return stored;
    return [
      { id: makeId(), title: 'Morning run', description: '30 minutes', priority: 'High', date: format(new Date(), 'yyyy-MM-dd'), status: 'pending', type: 'daily' },
      { id: makeId(), title: 'Read 20 pages', description: 'Skill: Reading', priority: 'Medium', date: format(new Date(), 'yyyy-MM-dd'), status: 'pending', type: 'daily' }
    ];
  });

  const [skills, setSkills] = useState(() => {
    const stored = loadSkills();
    return stored || [
      { id: makeId(), name: 'React', status: 'active' },
      { id: makeId(), name: 'Spanish', status: 'active' }
    ];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = loadTheme();
    return stored !== null ? stored : false;
  });

  // Persist data to localStorage
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveSkills(skills);
  }, [skills]);

  useEffect(() => {
    saveTheme(darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Task management functions
  const addTask = useCallback((data) => {
    const newTask = {
      id: makeId(),
      title: data.title,
      description: data.description || '',
      priority: data.priority || 'Medium',
      date: data.date || format(new Date(), 'yyyy-MM-dd'),
      status: 'pending',
      type: data.type || 'daily',
      linkedSkill: data.linkedSkill || null,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  }, []);

  const markTaskMissed = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'missed' ? 'pending' : 'missed' }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const editTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  // Skill management functions
  const addSkill = useCallback(({ name }) => {
    const newSkill = { id: makeId(), name, status: 'active' };
    setSkills((prev) => [newSkill, ...prev]);
    return newSkill;
  }, []);

  const toggleSkill = useCallback((id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? { ...skill, status: skill.status === 'completed' ? 'active' : 'completed' }
          : skill
      )
    );
  }, []);

  const markSkillMissed = useCallback((id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? { ...skill, status: skill.status === 'missed' ? 'active' : 'missed' }
          : skill
      )
    );
  }, []);

  const deleteSkill = useCallback((id) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  }, []);

  const reorderSkill = useCallback((id, direction) => {
    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.length - 1) return prev;

      const newList = [...prev];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      [newList[idx], newList[targetIdx]] = [newList[targetIdx], newList[idx]];
      return newList;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const getTodaysTasks = useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return tasks.filter((task) => task.date === today);
  }, [tasks]);

  const getTasksByDate = useCallback((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter((task) => task.date === dateStr);
  }, [tasks]);

  const getTasksByMonth = useCallback((year, month) => {
    return tasks.filter((task) => {
      const [taskYear, taskMonth] = task.date.split('-').slice(0, 2);
      return parseInt(taskYear) === year && parseInt(taskMonth) === month;
    });
  }, [tasks]);

  const getTasksByYear = useCallback((year) => {
    return tasks.filter((task) => task.date.startsWith(year.toString()));
  }, [tasks]);

  const getDailyQuote = useCallback(() => {
    const today = new Date().getDate();
    return DAILY_QUOTES[today % DAILY_QUOTES.length];
  }, []);

  const getTaskStats = useCallback((tasksArray = tasks) => {
    const completed = tasksArray.filter((t) => t.status === 'completed').length;
    const missed = tasksArray.filter((t) => t.status === 'missed').length;
    const total = tasksArray.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { completed, missed, total, percentage };
  }, [tasks]);

  const getTaskStreak = useCallback(() => {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      
      if (dayTasks.length === 0) break;
      
      const allCompleted = dayTasks.every((t) => t.status === 'completed');
      if (!allCompleted) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }, [tasks]);

  const value = {
    // State
    tasks,
    skills,
    darkMode,

    // Task functions
    addTask,
    toggleTask,
    markTaskMissed,
    deleteTask,
    editTask,
    getTodaysTasks,
    getTasksByDate,
    getTasksByMonth,
    getTasksByYear,

    // Skill functions
    addSkill,
    toggleSkill,
    markSkillMissed,
    deleteSkill,
    reorderSkill,

    // Utility functions
    getDailyQuote,
    getTaskStats,
    getTaskStreak,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
