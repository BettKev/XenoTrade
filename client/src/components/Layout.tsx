import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LoginModal } from './LoginModal';
import { useLogin } from '../contexts/LoginContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoginModalOpen, closeLoginModal } = useLogin();

  const handleLogin = (username: string, password: string) => {
    // TODO: Implement login logic
    console.log('Login attempted with:', username, password);
    closeLoginModal();
  };

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Layout;
