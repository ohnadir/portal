import React, { useContext } from 'react';

export type User = Record<string, unknown>;

export type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
