import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { useLogin } from '../contexts/LoginContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoginModalOpen, closeLoginModal, isSignupModalOpen, closeSignupModal } = useLogin();

  const handleLogin = (username: string, password: string) => {
    // TODO: Implement login logic
    console.log('Login attempted with:', username, password);
    closeLoginModal();
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // TODO: Implement signup logic
    console.log('Signup attempted with:', { email, password, name });
    closeSignupModal();
  };

  return (
    <>
      <div className={`${(isLoginModalOpen || isSignupModalOpen) ? 'fixed inset-0 bg-black bg-opacity-50' : ''}`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        onSignup={handleSignup}
      />
    </>
  );
};

export default Layout;
