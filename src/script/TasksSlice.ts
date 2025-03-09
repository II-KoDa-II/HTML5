import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('taskList') || '[]').map((task: any) => ({
    ...task,
    pinned: task.pinned || false,
  })),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<{ title: string; about: string }>) => {
      const newTask: Task = {
        id: uuidv4(),
        title: action.payload.title,
        about: action.payload.about,
        pinned: false,
      };
      state.tasks.push(newTask);
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<{ id: string; title: string; about: string }>) => {
      const { id, title, about } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], title, about };
        localStorage.setItem('taskList', JSON.stringify(state.tasks));
      }
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return;

      const task = state.tasks[taskIndex];
      const newPinnedState = !task.pinned;

      if (newPinnedState) {
        const pinnedCount = state.tasks.filter(t => t.pinned).length;
        if (pinnedCount >= 3) return;
      }

      const [toggledTask] = state.tasks.splice(taskIndex, 1);
      toggledTask.pinned = newPinnedState;

      if (newPinnedState) {
        const insertIndex = state.tasks.findIndex(t => !t.pinned);
        if (insertIndex === -1) {
          state.tasks.push(toggledTask);
        } else {
          state.tasks.splice(insertIndex, 0, toggledTask);
        }
      } else {
        state.tasks.push(toggledTask);
      }

      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
  },
});

export const { createTask, deleteTask, updateTask, reorderTasks, togglePin } = tasksSlice.actions;
export default tasksSlice.reducer;