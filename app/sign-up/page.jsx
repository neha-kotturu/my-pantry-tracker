'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/myfirebase/firebase'; // Ensure your firebase config is correctly imported
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link component

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter(); // Initialize router

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res) {
        const user = res.user;
        console.log('User created:', user);
  
        // Create user document in Firestore
        await setDoc(doc(firestore, 'users', user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
        console.log('User successfully saved to Firestore');
  
        sessionStorage.setItem('user', true);
        router.push('/');
      }
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };
  

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c0fe 100%)',
      fontFamily: 'PT Sans, sans-serif', // Applying the font family
      padding: '1rem', // Add padding for mobile
    }}>
      <div style={{
        position: 'absolute',
        top: '2vw',
        left: '2.5vw',
        zIndex: '2'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}> {/* Remove underline */}
          <h1 style={{
            color: '#151045',
            fontSize: '2rem',
            fontWeight: '700',
            textDecoration: 'none', // Ensure no underline
            fontFamily: 'PT Sans, sans-serif',
            cursor: 'pointer'
          }}>
            My Pantry Tracker
          </h1>
        </Link>
      </div>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '30rem', // Restrict max width for larger screens
        position: 'relative',
        zIndex: '1'
      }}>
        <h1 style={{
          color: '#13023d',
          fontSize: '1.75rem',
          marginBottom: '1.5rem',
          fontWeight: '700',
          fontFamily: 'PT Sans, sans-serif'
        }}>
          Sign Up
        </h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            color: '#111827',
            fontFamily: 'PT Sans, sans-serif'
          }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            color: '#111827',
            fontFamily: 'PT Sans, sans-serif'
          }}
        />
        <button 
          onClick={handleSignUp}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ec4899',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#ffffff',
            cursor: 'pointer',
            fontFamily: 'PT Sans, sans-serif',
            fontWeight: '600',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#db2777';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#ec4899';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300%',
            height: '300%',
            background: 'rgba(255, 255, 255, 0.1)',
            transition: 'transform 0.3s ease',
            transform: 'translate(-50%, -50%) scale(0)',
            zIndex: '0',
          }} />
        </button>
        {error && (
          <p style={{
            color: '#dc2626',
            marginTop: '1rem',
            fontSize: '0.875rem',
          }}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
