import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type LocalUser = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    role?: 'admin' | 'teacher' | 'student' | 'representative';
  };
};

interface AuthContextType {
  user: LocalUser | null;
  session: null;
  userRole: 'admin' | 'teacher' | 'student' | 'representative' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string, role?: AuthContextType['userRole']) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [session] = useState<null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'representative' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const raw = localStorage.getItem('techos_local_user');
      if (raw) {
        const parsed = JSON.parse(raw) as LocalUser & { role?: AuthContextType['userRole'] };
        setUser({ id: parsed.id, email: parsed.email, user_metadata: { full_name: parsed.user_metadata?.full_name, role: parsed.user_metadata?.role } });
        setUserRole((parsed.user_metadata?.role as AuthContextType['userRole']) || null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, _password: string) => {
    const id = localStorage.getItem('techos_local_user_id') || crypto.randomUUID();
    const fullName = (localStorage.getItem('techos_local_user_name') || 'Usuario Local');
    const role = (localStorage.getItem('techos_local_user_role') as AuthContextType['userRole']) || 'student';
    const localUser: LocalUser = { id, email, user_metadata: { full_name: fullName, role } };
    localStorage.setItem('techos_local_user', JSON.stringify(localUser));
    localStorage.setItem('techos_local_user_id', id);
    setUser(localUser);
    setUserRole(role);
  };

  const register = async (email: string, _password: string, firstName?: string, lastName?: string, role?: AuthContextType['userRole']) => {
    const id = crypto.randomUUID();
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Usuario Local';
    const userRoleLocal = role || 'student';
    const localUser: LocalUser = { id, email, user_metadata: { full_name: fullName, role: userRoleLocal } };
    localStorage.setItem('techos_local_user', JSON.stringify(localUser));
    localStorage.setItem('techos_local_user_id', id);
    localStorage.setItem('techos_local_user_name', fullName);
    localStorage.setItem('techos_local_user_role', userRoleLocal);
    setUser(localUser);
    setUserRole(userRoleLocal);
  };

  const signOut = async () => {
    localStorage.removeItem('techos_local_user');
    localStorage.removeItem('techos_local_user_id');
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, userRole, loading, signIn, register, signOut }}>
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
