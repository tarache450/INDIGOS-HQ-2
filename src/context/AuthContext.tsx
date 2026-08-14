import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  users: User[];
  hasPermission: (module: string) => boolean;
  login: (email: string) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_SUPER_ADMIN: User = {
  id: 'usr_super_admin',
  email: 'tarache450@gmail.com',
  displayName: 'Tarache (Super Admin)',
  role: 'SUPER_ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Executive Direction & Label Head',
  createdAt: '2025-01-01T00:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('indigo_hq_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_SUPER_ADMIN;
  });
  const [users, setUsers] = useState<User[]>([DEFAULT_SUPER_ADMIN]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        }
      })
      .catch(err => console.warn('Could not load users from API:', err));
  }, []);

  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role) || {
      ...DEFAULT_SUPER_ADMIN,
      role,
      displayName: `Indigo Staff (${role})`
    };
    setCurrentUser(targetUser);
    localStorage.setItem('indigo_hq_user', JSON.stringify(targetUser));
  };

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('indigo_hq_user', JSON.stringify(data.user));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (module: string): boolean => {
    if (currentUser.role === 'SUPER_ADMIN') return true;
    if (currentUser.role === 'LABEL_MANAGER') {
      return module !== 'system_settings';
    }
    if (currentUser.role === 'FINANCE') {
      return ['dashboard', 'finance', 'royalties', 'contracts', 'releases', 'analytics', 'tasks', 'calendar'].includes(module);
    }
    if (currentUser.role === 'A_AND_R') {
      return ['dashboard', 'ar', 'artists', 'releases', 'catalog', 'contacts', 'tasks', 'calendar', 'ai'].includes(module);
    }
    if (currentUser.role === 'MARKETING') {
      return ['dashboard', 'marketing', 'campaigns', 'releases', 'artists', 'contacts', 'assets', 'calendar', 'tasks', 'ai'].includes(module);
    }
    if (currentUser.role === 'ARTIST') {
      // ARTIST role has strict authorization: only their own releases, tracks, calendar, assets, and shared profile
      return ['dashboard', 'artists', 'releases', 'calendar', 'assets', 'tasks'].includes(module);
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, users, hasPermission, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
