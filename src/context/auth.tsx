import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// FAKE AUTH PROVIDER

const AuthContext = createContext<{
  user: { name: string } | null;
  login: (name: string) => Promise<{ name: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  login: () => Promise.resolve({ name: "" }),
  logout: () => Promise.resolve(),
  loading: false,
});

type User = { name: string } | null;

export const AuthProvider = (props: { children: ReactNode }) => {
  const existingUser = localStorage.getItem("user");

  const initialUser = (existingUser ? JSON.parse(existingUser) : null) as User;

  const [user, setUser] = useState<User>(initialUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (name: string) => {
    return new Promise<{ name: string }>((resolve) => {
      setLoading(true);
      setTimeout(() => {
        setUser({ name });
        resolve({ name });
        setLoading(false);
      }, 100);
    });
  };

  const logout = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 100);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
