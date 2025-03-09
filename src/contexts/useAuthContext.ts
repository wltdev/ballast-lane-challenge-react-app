import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => useContext(AuthContext);
