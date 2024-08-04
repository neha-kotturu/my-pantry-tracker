'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress'; // Import MUI spinner

const SignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const handleSignOut = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
        
        await signOut(auth);
        router.push('/sign-in'); // Redirect to sign-in page
      } catch (error) {
        console.error('Error signing out:', error);
      } finally {
        setLoading(false); // Set loading to false after sign-out attempt
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      {loading ? (
        <CircularProgress /> // Show spinner while loading
      ) : (
        <h1>Redirecting...</h1> // Message shown after loading
      )}
    </div>
  );
};

export default SignOut;
