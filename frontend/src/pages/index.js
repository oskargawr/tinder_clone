// App.js
import React from 'react';
import HomePage from './Home';
import DashboardPage from './dashboard';
import Boarding from './boarding';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Import useAuth
import { useRouter } from 'next/router';
import '../style/index.scss';

function App() {
  const { isAuthenticated } = useAuth();
  const router = useRouter(); // Dodaj router tutaj, aby był dostępny w całej funkcji.
  let Component;

  switch (router.pathname) {
    case '/':
      Component = HomePage;
      break;
    case '/dashboard':
      Component = isAuthenticated ? DashboardPage : HomePage;
      break;
    case '/boarding':
      Component = isAuthenticated ? Boarding : HomePage;
      break;
    default:
      Component = HomePage;
  }

  return <Component />;
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
