import React from 'react';
import { useTasks, type Task } from '../context/TaskContext';

export const TaskList: React.FC = () => {
  const { filteredTasks, filter, setFilter, deleteTask, setEditingTask, toggleStatus } = useTasks();

  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 p-1 rounded-lg max-w-md">
        {(['All', 'Pending', 'Completed'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${
              filter === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No tasks found matching your filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {filteredTasks.map((task: Task) => (
            <div
              key={task.id}
              className={`p-5 rounded-xl border bg-white shadow-sm flex flex-col justify-between transition hover:shadow-md ${
                task.status === 'Completed' ? 'border-green-200 bg-green-50/20' : 'border-gray-400'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    task.status === 'Completed' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-gray-900 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                  {task.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1 mb-4 line-clamp-2">{task.description}</p>
              </div>

              <div className="flex justify-end items-center space-x-2 pt-3 border-t border-gray-100 text-xs">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className={`px-3 py-1.5 rounded-md font-medium border transition ${
                    task.status === 'Completed'
                      ? 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300'
                      : 'bg-green-600 text-white hover:bg-green-700 border-transparent'
                  }`}
                >
                  {task.status === 'Completed' ? 'Mark Pending' : 'Complete'}
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="px-3 py-1.5 rounded-md font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1.5 rounded-md font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};