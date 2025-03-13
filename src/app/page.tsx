'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch tasks from Supabase
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        <button
          onClick={fetchTasks}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
