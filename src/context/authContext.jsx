import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authState, setAuthState] = useState(false); // Add authState to track changes

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
    setAuthState(prev => !prev); // Update authState
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setAuthState(prev => !prev); // Update authState
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
