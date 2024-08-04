'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/myfirebase/firebase';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    const userQuery = query(
        collection(firestore, 'users'),
        where('email', '==', email)
    );
      
    const querySnapshot = await getDocs(userQuery);
  
    if (querySnapshot.empty) {
      setModalMessage('You are not registered. Please sign up.');
      setOpen(true);
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(email, password);
        if (!userCredential || !userCredential.user) {
          throw new Error('Sign-in failed.');
        }
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/home');
      } catch (e) {
        console.error('Error during sign-in:', e);
        setModalMessage('Sign-in failed. Please check your credentials.');
        setOpen(true);
      }
      
    }

  };

  const handleModalClose = () => setOpen(false);

  const handleSignUpRedirect = () => router.push('/sign-up');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c0fe 100%)',
      fontFamily: 'PT Sans, sans-serif',
      padding: '1rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '2',
        textAlign: 'center',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            color: '#151045',
            fontSize: '2rem',
            fontWeight: '700',
            textDecoration: 'none',
            fontFamily: 'PT Sans, sans-serif',
            cursor: 'pointer',
            margin: 0,
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
        maxWidth: '30rem',
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
          Sign In
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
          onClick={handleSignIn}
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
          {loading ? 'Signing In...' : 'Sign In'}
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
            fontSize: '0.875rem'
          }}>
            {error.message}
          </p>
        )}
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#0b0e33',
          padding: '1rem',
          borderRadius: '0.75rem',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
          width: '95%',
          maxWidth: '30rem',
          height: '19rem',
          textAlign: 'center',
          zIndex: '3'
        }}>
          <h2 style={{
            marginTop: '4rem',
            color: '#ffffff',
            marginBottom: '3rem',
            fontFamily: 'PT Sans, sans-serif'
          }}>
            {modalMessage}
          </h2>
          {modalMessage.includes('sign up') && (
            <button
              onClick={handleSignUpRedirect}
              style={{
                backgroundColor: '#df4390',
                color: '#ffffff',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                marginRight: '2rem',
                fontFamily: 'PT Sans, sans-serif'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b53675'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#df4390'}
            >
              Sign Up
            </button>
          )}
          <button
            onClick={handleModalClose}
            style={{
              backgroundColor: '#df4390',
              color: '#ffffff',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontFamily: 'PT Sans, sans-serif'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b53675'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#df4390'}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
