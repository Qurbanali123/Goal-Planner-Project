# Goal Planner Application

A comprehensive, modern React.js-based Goal Planner application with an attractive UI, multiple views for managing daily, monthly, and yearly tasks, skill tracking, analytics, and more!

## Features

### 1. **Home/Dashboard Page**
- Quick overview of today's tasks and active skills
- Progress rings showing completion percentage
- Display of today's tasks preview
- Active skills in progress
- Motivational quote of the day
- Easy access to add new tasks and skills
- Task streak counter (continuous completed days)

### 2. **Daily Tasks Page**
- View all tasks for a selected day
- Navigate between days with intuitive date controls
- Search functionality to filter tasks
- Priority-based filtering (High, Medium, Low)
- Task management:
  - ✔ Mark tasks as completed
  - ✕ Mark tasks as missed
  - 🗑️ Delete tasks
- Color-coded status indicators
- Daily statistics (Total, Completed, Missed)

### 3. **Monthly Tasks Page**
- View all tasks grouped by month
- Expandable date groups to view tasks
- Search and filter capabilities
- Monthly statistics dashboard
- Same task management features as daily view

### 4. **Yearly Tasks Page**
- View tasks grouped by month within a year
- Yearly navigation controls
- Expandable month groups
- Yearly statistics overview
- Comprehensive task organization

### 5. **Skills Page**
- Manage your learning skills
- Add new skills to track
- Mark skills as completed
- Priority reordering (move skills up/down to prioritize)
- Filter by status (Active, Completed, Missed)
- Search functionality
- Detailed skill statistics

### 6. **Analytics Page**
- **Visual Charts:**
  - Bar charts for daily progress (last 7 days)
  - Bar charts for monthly progress (last 6 months)
  - Bar charts for yearly progress
  - Pie charts for task status distribution
  - Pie charts for task priority distribution

- **Statistics Dashboard:**
  - Total tasks created
  - Successfully completed tasks
  - Missed tasks
  - Pending tasks
  - Overall completion percentage
  - Progress rings for visual representation

- **Detailed Breakdown:**
  - Comprehensive statistics table
  - Completion rate tracking

### 7. **Extra Features**

✨ **Modern UI/UX:**
- Clean, gradient-based card design
- Smooth page transitions and animations
- Eye-catching progress rings
- Responsive design (works on desktop, tablet, mobile)
- Fully functional dark mode toggle

🎨 **Color Indicators:**
- Green: ✅ Completed tasks
- Red: ❌ Missed tasks
- Yellow: ⏳ Pending tasks

🌙 **Dark Mode:**
- Toggle dark/light theme
- Persistent theme preference (saved to localStorage)
- Beautiful color scheme for both modes

🔍 **Search & Filter:**
- Search tasks by title or description
- Filter by priority level
- Filter skills by status
- Real-time filtering

💾 **Data Persistence:**
- All data saved to browser localStorage
- Automatic saving of tasks and skills
- Theme preference persistence

🔥 **Task Streaks:**
- Tracks consecutive days with all tasks completed
- Visual streak counter with fire emoji 🔥
- Motivational indicator

## Tech Stack

- **Frontend Framework:** React.js (v18.2.0)
- **Routing:** React Router v6.14.0
- **State Management:** Context API with React Hooks
- **Charts:** Chart.js with react-chartjs-2
- **Date Handling:** date-fns v2.30.0
- **Styling:** CSS3 with CSS Variables and Gradients
- **Build Tool:** Create React App with react-scripts v5.0.1

## Installation

1. **Clone or navigate to the project:**
   ```bash
   cd "c:\Project CB"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Local: `http://localhost:3000`
   - (Or the port shown in terminal if 3000 is busy)

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Main navigation component
│   ├── UIComponents.js        # Reusable UI components (ProgressRing, GradientCard, etc.)
│   ├── Header.js              # Header component
│   ├── TaskList.js            # Task list component
│   ├── SkillPlanner.js        # Skill planner component
│   ├── TaskItem.js            # Individual task component
│   ├── DateBox.js             # Date box component
│   └── Analytics.js           # Analytics component
├── pages/
│   ├── HomePage.js            # Home/Dashboard page
│   ├── DailyTasksPage.js      # Daily tasks view
│   ├── MonthlyTasksPage.js    # Monthly tasks view
│   ├── YearlyTasksPage.js     # Yearly tasks view
│   ├── SkillsPage.js          # Skills management page
│   └── AnalyticsPage.js       # Analytics and insights page
├── context/
│   └── AppContext.js          # Global state management
├── utils/
│   ├── storage.js             # LocalStorage utilities
│   ├── dateUtils.js           # Date formatting utilities
│   └── analyticsUtils.js      # Analytics calculations
├── App.js                      # Main app with routing
├── index.js                    # React entry point
├── styles.css                  # Global styles
└── index.css                   # Additional styles

public/
└── index.html                  # HTML template
```

## Key Components

### AppContext
Manages global state including:
- Tasks (with CRUD operations)
- Skills (with CRUD operations)
- Dark mode toggle
- Utility functions for analytics
- Task statistics and streak calculations

### UIComponents
Reusable UI elements:
- `ProgressRing` - Circular progress indicator
- `GradientCard` - Styled card with gradients
- `TaskStreak` - Streak display component
- `PriorityBadge` - Priority level indicator
- `StatusIndicator` - Task status display
- `EmptyState` - Empty state messages
- `QuoteOfDay` - Daily motivational quote

### Navigation
- Sticky header with app logo
- Navigation links to all pages
- Dark mode toggle button
- Active page highlighting
- Responsive mobile menu

## Usage

### Adding a Task
1. Click "Add New Task" button on Home page or Daily Tasks page
2. Enter task title (required)
3. Add optional description
4. Select priority level
5. Click "Add Task"

### Managing Tasks
- **Mark as Completed:** Click checkbox next to task
- **Mark as Missed:** Click ✕ button
- **Delete:** Click 🗑️ button
- **View Details:** Task shows in respective date view

### Managing Skills
1. Go to Skills page
2. Click "⭐ Add Skill" button
3. Enter skill name
4. Click "Add Skill"
5. Reorder by priority using Up/Down buttons
6. Mark as completed or missed
7. Delete when no longer needed

### Viewing Analytics
1. Go to Analytics page
2. View overall statistics
3. Explore charts for daily, monthly, and yearly progress
4. Check task status and priority distribution
5. Review detailed breakdown of all tasks

### Theme Toggle
- Click the sun/moon icon in navigation
- Theme preference automatically saved
- Applies to all pages immediately

## Data Storage

All data is stored in browser localStorage:
- `goal-planner:tasks` - All tasks
- `goal-planner:skills` - All skills
- `goal-planner:theme` - Theme preference (light/dark)

Data persists between sessions unless browser data is cleared.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Future Enhancements

- [ ] Export/Import data as JSON
- [ ] Cloud sync with backend
- [ ] Recurring tasks
- [ ] Task categories/tags
- [ ] Subtasks support
- [ ] Notifications/reminders
- [ ] Collaboration features
- [ ] Mobile app version
- [ ] Habit tracking
- [ ] Time tracking

## Performance

- Optimized React components with useMemo and useCallback
- Efficient state management with Context API
- Chart rendering optimized for large datasets
- Responsive animations using CSS transitions
- Lazy loading of components

## Accessibility

- Semantic HTML structure
- Proper color contrast ratios
- Keyboard navigation support
- ARIA labels where needed
- Screen reader friendly

## License

This project is open source and available for personal and commercial use.

## Support

For issues or feature requests, please create an issue in the project repository.

---

**Happy Planning! 🎯**

Start tracking your goals today and watch your productivity soar!
