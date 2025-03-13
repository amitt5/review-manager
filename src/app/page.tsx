'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('inserted_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;

    const { data, error } = await supabase.from('tasks').insert([{ title: newTask }]);

    if (error) {
      console.error('Error adding task:', error.message);
    } else {
      setNewTask('');
      fetchTasks(); // Refresh task list
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Task
          </button>
        </div>

        <button
          onClick={fetchTasks}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Refresh Tasks
        </button>

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded">
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
