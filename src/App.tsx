import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Dashboard } from './components/Dashboard';
import { isAuthenticated } from './lib/auth';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'dashboard'>('login');

  // Check if user is already logged in on mount
  useEffect(() => {
    if (isAuthenticated()) {
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login 
          onSwitchToSignup={() => setCurrentPage('signup')} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === 'signup' && (
        <SignUp onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
      <Toaster />
    </>
  );
}
