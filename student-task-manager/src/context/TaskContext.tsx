import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: 'All' | 'Completed' | 'Pending';
  setFilter: (filter: 'All' | 'Completed' | 'Pending') => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  addTask: (name: string, description: string, priority: 'Low' | 'Medium' | 'High') => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('student_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem('student_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string, description: string, priority: 'Low' | 'Medium' | 'High') => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      description,
      priority,
      status: 'Pending',
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Completed') return t.status === 'Completed';
    if (filter === 'Pending') return t.status === 'Pending';
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        setFilter,
        editingTask,
        setEditingTask,
        addTask,
        updateTask,
        deleteTask,
        toggleStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};