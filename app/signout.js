'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';

const SignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const handleSignOut = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await signOut(auth);
        router.push('/sign-in');
      } catch (error) {
        console.error('Error signing out:', error);
      } finally {
        setLoading(false);
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <h1>Redirecting...</h1> // Message shown after loading
      )}
    </div>
  );
};

export default SignOut;
