"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth"); // Redirect to login if not authenticated
      else setSession(session);
    });
  }, [supabase, router]);

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      <button onClick={() => supabase.auth.signOut().then(() => router.push("/auth"))}>
        Logout
      </button>
    </div>
  );
}
