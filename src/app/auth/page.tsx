'use client';
import AuthComponent from '../components/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard'); // Redirect to home if already logged in
      }
    });

    // Set up auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-2xl font-bold text-center">Welcome</h1>
        <AuthComponent />
      </div>
    </div>
  );
}