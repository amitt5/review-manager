'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  // const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user email and ID
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session111', session);
      setUserEmail(session?.user?.email ?? null);
      setUserName(session?.user?.user_metadata?.full_name ?? null);
      // setUserRole(session?.user?.user_metadata?.role ?? null);
      setUserId(session?.user?.id ?? null);
      if (session?.user?.id) {
        fetchTasks(session.user.id);
      }
    // router.push('/dashboard/business');

    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  // Fetch tasks from Supabase
  const fetchTasks = async (uid: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', uid)
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === '' || !userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ 
        title: newTask, 
        completed: false,
        user_id: userId 
      }]);

    if (error) {
      console.error('Error adding task:', error.message);
    } else {
      setNewTask('');
      fetchTasks(userId);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);  // Extra security to ensure users can only delete their own tasks

    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      fetchTasks(userId);
    }
  };

  // Mark task as complete/incomplete
  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    if (!userId) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id)
      .eq('user_id', userId);  // Extra security

    if (error) {
      console.error('Error updating task status:', error.message);
    } else {
      fetchTasks(userId);
    }
  };

  // Start editing a task
  const startEditing = (id: string, title: string) => {
    setEditingTaskId(id);
    setEditTaskTitle(title);
  };

  // Update an existing task
  const updateTask = async (id: string) => {
    if (editTaskTitle.trim() === '' || !userId) return;

    const { error } = await supabase
      .from('tasks')
      .update({ title: editTaskTitle })
      .eq('id', id)
      .eq('user_id', userId);  // Extra security

    if (error) {
      console.error('Error updating task:', error.message);
    } else {
      setEditingTaskId(null);
      setEditTaskTitle('');
      fetchTasks(userId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <div className="flex items-center gap-4">
            {!userName && userEmail && <span className="text-gray-600">{userEmail}</span>}
            {userName && <span className="text-gray-600">{userName}</span>}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

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
          onClick={() => userId && fetchTasks(userId)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Refresh Tasks
        </button>

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 mb-2 rounded ${
                task.completed ? 'bg-green-100' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, !task.completed)}
                />
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                ) : (
                  <span className={task.completed ? 'line-through text-gray-500' : ''}>
                    {task.title}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(task.id, task.title)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    {/* <button 
                      onClick={() => getTaskHelp(task.title)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Get Help
                    </button> */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
