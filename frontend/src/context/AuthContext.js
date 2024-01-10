import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const authToken = cookies.AuthToken;
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      setIsAuthenticated(false);
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [authToken, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
