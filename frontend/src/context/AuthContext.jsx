import { createContext, useContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const authToken = cookies.AuthToken;
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    } else {
      dispatch({ type: 'LOGIN' });
    }
  }, [authToken, router.asPath]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};