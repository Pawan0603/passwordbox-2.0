'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, initialUser }) {
  // Server se aaya hua data initial state ban jayega
  const [user, setUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);