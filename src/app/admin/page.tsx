'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Get total users
    const { count: userCount } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact' });

    // Get total tasks
    const { count: taskCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact' });

    setStats({
      totalUsers: userCount || 0,
      totalTasks: taskCount || 0,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Tasks</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalTasks}</p>
        </div>
      </div>
    </div>
  );
} 