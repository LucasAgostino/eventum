"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const UserSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching user session:', error);
      } else {
        setUser(data?.user ?? null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserSessionContext.Provider value={{ user, setUser }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => useContext(UserSessionContext);
