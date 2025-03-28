"use client"

import { Building2, Link, Star } from "lucide-react"
import ConnectGoogleBusinessButton from "@/app/components/ConnectGoogleBusinessButton"  // Adjust path if needed
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
export default function BusinessPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);  // Track Supabase session
    const [businessData, setBusinessData] = useState<any>(null);
  
    // Get session using Supabase
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            router.push("/auth"); // Redirect to login if not authenticated
        } else {
            setSession(session);
        }
        });
    }, [router]);

    // Fetch business data when accessToken is available
  useEffect(() => {
    console.log('session',session);

    if (session?.access_token) {
      const fetchBusinessData = async () => {
        try {
          const response = await fetch("https://mybusinessbusinessinformation.googleapis.com/v1/accounts", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.access_token}`, // Use the Supabase access token for Google Business API
            },
          });
          
          const data = await response.json();
          console.log('session123', data);
          setBusinessData(data); // Store the fetched business data
        } catch (error) {
          console.error("Error fetching Google Business data:", error);
        }
      };

      fetchBusinessData();
    }
  }, [session?.access_token]); // Re-run the effect when the session updates


  // Display loading state while waiting for session and data
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Business Setup</h1>
        <p className="text-gray-400 mt-2">Configure your business details and review link</p>
      </div>

      <div className="bg-[#252525] rounded-lg p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="business-name" className="block text-sm font-medium mb-2">
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              className="w-full p-3 bg-[#333333] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label htmlFor="google-link" className="block text-sm font-medium mb-2">
              Google Review Link
            </label>
            <div className="flex">
              <input
                id="google-link"
                type="text"
                className="flex-1 p-3 bg-[#333333] border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Paste your Google review link"
              />
              <button className="bg-[#333333] border border-l-0 border-gray-700 rounded-r-md px-4 flex items-center">
                <Link className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Or connect with Google Business API for automatic setup</p>
          </div>

           <div className="pt-4 border-t border-gray-700">
                <ConnectGoogleBusinessButton />
            </div>

          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-medium mb-4">Review Page Preview</h3>
            <div className="bg-[#333333] rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="h-16 w-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium">Your Business Name</h4>
              </div>
              <p className="text-gray-400 mb-4">We'd love to hear your feedback!</p>
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-8 w-8 text-yellow-500" />
                ))}
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-md">
                <p className="text-sm text-gray-400">Review page preview</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-medium px-6 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

