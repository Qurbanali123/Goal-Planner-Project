const TASKS_KEY = 'goal-planner:tasks';
const SKILLS_KEY = 'goal-planner:skills';
const THEME_KEY = 'goal-planner:theme';

export function loadTasks(){
  try{
    const raw = localStorage.getItem(TASKS_KEY);
    return raw? JSON.parse(raw): null;
  }catch(e){ return null }
}

export function saveTasks(tasks){
  try{ localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }catch(e){}
}

export function loadSkills(){
  try{ const raw = localStorage.getItem(SKILLS_KEY); return raw? JSON.parse(raw): null }catch(e){return null}
}

export function saveSkills(skills){
  try{ localStorage.setItem(SKILLS_KEY, JSON.stringify(skills)); }catch(e){}
}

export function loadTheme(){
  try{ const raw = localStorage.getItem(THEME_KEY); return raw? JSON.parse(raw): null }catch(e){return null}
}

export function saveTheme(isDark){
  try{ localStorage.setItem(THEME_KEY, JSON.stringify(isDark)); }catch(e){}
}
