import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: 'admin' | 'teacher' | 'student' | 'representative' | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'representative' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Auth state change handler
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user role if session exists
        if (session?.user) {
          try {
            const { data: profile, error } = await db
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error && error.code === 'PGRST116') {
              setUserRole(null);
              // Only redirect if not already on complete registration page
              if (window.location.pathname !== '/complete-registration') {
                window.location.href = '/complete-registration';
              }
              return;
            }

            if (error) {
              console.error('Error fetching user role:', error);
              throw error;
            }
            
            setUserRole(profile?.role || null);
          } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole(null);
          }
        } else {
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Limpiar estado
      setUser(null);
      setSession(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error en signOut:', error);
      // Aún así, limpiar el estado local
      setUser(null);
      setSession(null);
      setUserRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, userRole, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
