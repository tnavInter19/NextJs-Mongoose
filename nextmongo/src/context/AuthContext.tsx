import { ReactNode, createContext, useContext, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Define the type for the AuthContext
type AuthContextType = {
  isAuthenticated: boolean;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

interface AuthProviderProps {
 children: ReactNode;
}


// Create the AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

// Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);
