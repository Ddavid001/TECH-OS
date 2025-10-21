import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: 'admin' | 'teacher' | 'student' | 'representative' | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  userRole: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'representative' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Configurando listener de autenticación...'); // TODO: Remover en producción
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email); // TODO: Remover en producción
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user role if session exists
        if (session?.user) {
          // Check if user has a profile, if not, they need to complete registration
          try {
            const { data: profile, error } = await db
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error && error.code === 'PGRST116') {
              // User doesn't have a profile yet (new Google user)
              console.log('Usuario sin perfil, redirigiendo a completar registro'); // TODO: Remover en producción
              setUserRole(null);
              setLoading(false);
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
            
            console.log('Rol de usuario obtenido:', profile?.role); // TODO: Remover en producción
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

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Sesión existente:', session?.user?.email); // TODO: Remover en producción
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      console.log('Limpiando listener de autenticación'); // TODO: Remover en producción
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      console.log('Obteniendo rol para usuario:', userId); // TODO: Remover en producción
      
      const { data, error } = await db
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error obteniendo rol de usuario:', error);
        throw error;
      }
      
      console.log('Rol obtenido:', data?.role); // TODO: Remover en producción
      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Cerrando sesión...'); // TODO: Remover en producción
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
      }
      
      console.log('Sesión cerrada exitosamente'); // TODO: Remover en producción
      
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
