import { supabase } from '@/lib/supabase'; // Adjust the path to your supabase client
import { useRouter } from 'next/navigation';

export default function ConnectGoogleBusinessButton() {
  const router = useRouter();

  const handleClick = async () => {
    // Trigger the Supabase Google OAuth flow
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/create-my-business', // URL to redirect after authentication
      },
    });

    if (error) {
      console.error('Error connecting to Google Business:', error.message);
    } else {
      console.log('Successfully initiated Google OAuth flow:', data);
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      Connect with Google Business
    </button>
  );
}
