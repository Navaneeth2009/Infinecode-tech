import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskForm: React.FC = () => {
  const { addTask, editingTask, updateTask, setEditingTask } = useTasks();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setName('');
      setDescription('');
      setPriority('Medium');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    if (editingTask) {
      updateTask({ ...editingTask, name, description, priority });
    } else {
      addTask(name, description, priority);
    }

    setName('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{editingTask ? '📝 Edit Task' : '➕ Create New Task'}</h2>
      
      {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Study React Hooks"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="What needs to be done?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex space-x-2 pt-2">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={() => setEditingTask(null)} className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};