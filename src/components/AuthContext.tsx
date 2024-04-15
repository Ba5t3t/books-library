import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { login } from "../api/api";

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as unknown as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      try {
        await login(username, password);

        const userData = { username, password };

        setUser(userData);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({ user, login: handleLogin, logout }),
    [user, logout, handleLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
