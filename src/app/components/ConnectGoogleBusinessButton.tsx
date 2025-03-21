// components/ConnectGoogleBusinessButton.tsx
"use client";
import { signIn } from "next-auth/react";

export default function ConnectGoogleBusinessButton() {
  const handleClick = () => {
    // Trigger the sign-in flow only for Google Business authentication
    signIn("google", {
      callbackUrl: "/create-my-business", // You can change this URL to your business page URL
    });
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      Connect with Google Business
    </button>
  );
}
