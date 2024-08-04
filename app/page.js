// pages/index.js
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c0fe 100%)',
      fontFamily: "PT Sans, sans-serif",
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Floating shapes with content */}
      <div style={{
        position: 'absolute',
        top: '5vw',
        left: '10vw',
        width: '10vw',
        height: '10vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(-10deg)',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        
        <div style={{
          fontSize: '3.5vw',
          color: '#ec4899',
          animation: 'rotate 10s linear infinite'
        }}>
          🥕
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '30vw',
        left: '5vw',
        width: '5vw',
        height: '5vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(-10deg)',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '2.5vw',
          color: '#ec4899',
          animation: 'rotate 10s linear infinite',
        }}>
          🍄
        </div>
      </div>


      <div style={{
        position: 'absolute',
        top: '5vw',
        left: '75vw',
        width: '5vw',
        height: '5vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(-10deg)',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '2.5vw',
          color: '#ec4899',
          animation: 'rotate 10s linear infinite',
        }}>
          🍓
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '25vw',
        left: '85vw',
        width: '7vw',
        height: '7vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(-10deg)',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '2.5vw',
          color: '#ec4899',
          animation: 'rotate 10s linear infinite',
        }}>
          🍙
        </div>
      </div>


      <div style={{
        position: 'absolute',
        bottom: '3vw',
        left: '25vw',
        width: '7vw',
        height: '7vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(-10deg)',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '2.5vw',
          color: '#ec4899',
          animation: 'rotate 10s linear infinite',
        }}>
          🥑
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '5vw',
        right: '10vw',
        width: '10vw',
        height: '10vw',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '0',
        transform: 'rotate(10deg)',
        animation: 'float 8s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '3.5vw',
          color: '#6366f1',
          animation: 'rotate 12s linear infinite',
        }}>
          🍎
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: '1',
      }}>
        <h1 style={{
          color: '#13023d',
          fontSize: '3.5rem',
          marginBottom: '1.5rem',
          fontWeight: '700',
          textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
          fontFamily: "PT Sans, sans-serif",
        }}>
          My Pantry Tracker
        </h1>
        <p style={{
          color: '#38011a',
          fontSize: '1.25rem',
          marginTop: '3vw',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          fontWeight: '300',
          maxWidth: '30rem',
          fontFamily: "PT Sans, sans-serif"
        }}>
          Track and manage your pantry with ease and style. Your kitchen companion for a better organized life!
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button 
            onClick={handleSignUp}
            style={{
              marginTop: '2vw',
              padding: '1rem 2.5rem',
              backgroundColor: '#ec4899',
              border: 'none',
              borderRadius: '0.75rem',
              color: '#ffffff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              outline: 'none',
              transform: 'translateY(0)',
              background: 'linear-gradient(145deg, #ec4899, #d63384)',
              filter: 'brightness(0.9)',
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
            Sign Up
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
          <button 
            onClick={handleSignIn}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#6366f1',
              border: 'none',
              borderRadius: '0.75rem',
              color: '#ffffff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              outline: 'none',
              transform: 'translateY(0)',
              background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
              filter: 'brightness(0.9)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Sign In
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
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
