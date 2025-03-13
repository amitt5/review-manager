'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('inserted_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data);
    }
  };

  // Add a new task
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

  // Delete a task
  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      fetchTasks();
    }
  };

  // Start editing a task
  const startEditing = (id: string, title: string) => {
    setEditingTaskId(id);
    setEditTaskTitle(title);
  };

  // Update an existing task
  const updateTask = async (id: string) => {
    if (editTaskTitle.trim() === '') return;

    const { error } = await supabase.from('tasks').update({ title: editTaskTitle }).eq('id', id);

    if (error) {
      console.error('Error updating task:', error.message);
    } else {
      setEditingTaskId(null);
      setEditTaskTitle('');
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* Add Task */}
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

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded">
              {editingTaskId === task.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    onClick={() => updateTask(task.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task.id, task.title)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
