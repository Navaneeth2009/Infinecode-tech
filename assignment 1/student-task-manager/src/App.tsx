import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-6 shadow-lg rounded-2xl mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">🎓 Student Task Manager</h1>
            <p className="text-blue-100 mt-1 text-sm">Organize your internship assignments and daily goals seamlessly.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TaskForm />
            </div>
            <div className="lg:col-span-2">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;