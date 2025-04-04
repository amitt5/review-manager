"use client"
import Link from "next/link"
import { BarChart3, Home, Settings, Star, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your review management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Reviews" value="124" icon={<Star className="h-5 w-5 text-yellow-500" />} />
        <DashboardCard title="Conversion Rate" value="68%" icon={<BarChart3 className="h-5 w-5 text-green-500" />} />
        <DashboardCard title="Average Rating" value="4.7" icon={<Star className="h-5 w-5 text-yellow-500" />} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-[#252525] rounded-lg p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-700">
                <div>
                  <p className="font-medium">New {i % 2 === 0 ? "5" : "4"} star review</p>
                  <p className="text-sm text-gray-400">Customer left a positive review</p>
                </div>
                <span className="text-sm text-gray-400">{i}h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


  function DashboardCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
      <div className="bg-[#252525] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 font-medium">{title}</h3>
          {icon}
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    )
  }