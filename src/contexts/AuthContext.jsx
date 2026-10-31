import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Simulated user storage using localStorage
const USERS_KEY = 'cpc_users';
const SESSION_KEY = 'cpc_session';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const getSession = () => JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
const saveSession = (user) => localStorage.setItem(SESSION_KEY, JSON.stringify(user));
const clearSession = () => localStorage.removeItem(SESSION_KEY);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const users = getUsers();
    const found = users.find((u) => u.email === email);
    if (!found) {
      setLoading(false);
      throw new Error('NOT_FOUND');
    }
    if (found.password !== password) {
      setLoading(false);
      throw new Error('WRONG_PASSWORD');
    }
    const session = {
      id: found.id,
      name: found.name,
      email: found.email,
      onboarded: found.onboarded,
      prefs: found.prefs,
    };
    saveSession(session);
    setUser(session);
    setLoading(false);
    return session;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      setLoading(false);
      throw new Error('EXISTS');
    }
    const newUser = { id: Date.now().toString(), name, email, password, onboarded: false };
    saveUsers([...users, newUser]);
    const session = { id: newUser.id, name, email, onboarded: false };
    saveSession(session);
    setUser(session);
    setLoading(false);
    return session;
  };

  const completeOnboarding = (prefs) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], onboarded: true, prefs };
      saveUsers(users);
    }
    const updated = { ...user, onboarded: true, prefs };
    saveSession(updated);
    setUser(updated);
  };

  const updatePrefs = (prefs) => {
    if (!user) return;
    const updated = { ...user, prefs: { ...user.prefs, ...prefs } };
    const users = getUsers();
    const idx = users.findIndex((item) => item.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], prefs: updated.prefs };
      saveUsers(users);
    }
    saveSession(updated);
    setUser(updated);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, completeOnboarding, updatePrefs }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
