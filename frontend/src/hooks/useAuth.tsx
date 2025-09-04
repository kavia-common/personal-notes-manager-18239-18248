"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiGetCurrentUser, apiLogin, apiLogout, apiSignup } from "@/lib/api";
import { ApiResult, AuthCredentials, User } from "@/lib/types";

interface AuthContextShape {
  user: User | null;
  loading: boolean;
  // PUBLIC_INTERFACE
  login: (payload: AuthCredentials) => Promise<ApiResult<User>>;
  // PUBLIC_INTERFACE
  signup: (payload: AuthCredentials) => Promise<ApiResult<User>>;
  // PUBLIC_INTERFACE
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    apiGetCurrentUser().then((res) => {
      if (!mounted) return;
      setUser(res.data ?? null);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (payload: AuthCredentials) => {
    const res = await apiLogin(payload);
    if (res.ok && res.data) setUser(res.data);
    return res;
  }, []);

  const signup = useCallback(async (payload: AuthCredentials) => {
    const res = await apiSignup(payload);
    if (res.ok && res.data) setUser(res.data);
    return res;
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
