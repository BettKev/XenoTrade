import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginContextType } from '../types/LoginTypes';

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };
  
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };
  
  const closeSignupModal = () => setIsSignupModalOpen(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('LoginContext Error:', error.error);
      // You can add additional error handling here
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  try {
    return (
      <LoginContext.Provider value={{ 
        isLoginModalOpen, 
        openLoginModal, 
        closeLoginModal,
        isSignupModalOpen,
        openSignupModal,
        closeSignupModal
      }}>
        {children}
      </LoginContext.Provider>
    );
  } catch (error) {
    console.error('LoginProvider render error:', error);
    return null; // Fallback UI
  }
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
