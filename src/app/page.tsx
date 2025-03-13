'use client';

import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn Next.js', completed: false },
    { id: 2, title: 'Build a Task Manager', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  // Handle adding a new task
  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Handle marking a task as complete or incomplete
  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle deleting a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* Task Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={addTask}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded"
            >
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="text-green-500 mr-2"
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
