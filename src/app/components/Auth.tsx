'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';

export default function AuthComponent() {
  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth`
      // ? `${window.location.origin}/auth/callback`
      : undefined;

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      redirectTo={redirectTo}
    />
  );
}
