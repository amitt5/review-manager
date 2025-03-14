'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth');
      return;
    }

    // Get user's role from Supabase
    const { data: userRole, error } = await supabase
      .from('user_roles')  // We'll create this table
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (error || !userRole || userRole.role !== 'admin') {
      router.push('/'); // Redirect non-admins to home
      return;
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-800 hover:text-gray-600">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-gray-800 hover:text-gray-600">
              Users
            </Link>
            <Link href="/admin/roles" className="text-gray-800 hover:text-gray-600">
              Roles
            </Link>
          </div>
          <Link href="/" className="text-gray-800 hover:text-gray-600">
            Back to App
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </div>
    </div>
  );
} 