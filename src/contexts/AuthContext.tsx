
'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext<any>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const lastAuthAttempt = useRef<number>(0);

  useEffect(() => {
    // Listen for auth changes — handles initial session too
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Get initial session — handle invalid/expired refresh tokens and rate limits gracefully
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        const errCode = (error as any).code || '';
        const errMsg = error.message || '';
        if (errCode === 'refresh_token_not_found' || errMsg.includes('refresh_token_not_found')) {
          supabase.auth.signOut().catch(() => {});
        }
        // For rate limit or other errors, just clear loading — onAuthStateChange will handle state
        setSession(null);
        setUser(null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Email/Password Sign Up
  const signUp = async (email: string, password: string, metadata: { fullName?: string; avatarUrl?: string } = {}) => {
    const now = Date.now();
    if (now - lastAuthAttempt.current < 3000) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    lastAuthAttempt.current = now;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata?.fullName || '',
          avatar_url: metadata?.avatarUrl || ''
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      if (error.message?.toLowerCase().includes('rate limit') || error.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw error;
    }
    return data;
  };

  // Email/Password Sign In
  const signIn = async (email: string, password: string) => {
    const now = Date.now();
    if (now - lastAuthAttempt.current < 3000) {
      throw new Error('Too many login attempts. Please wait a moment and try again.');
    }
    lastAuthAttempt.current = now;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      if (error.message?.toLowerCase().includes('rate limit') || error.status === 429) {
        throw new Error('Too many login attempts. Please wait a moment and try again.');
      }
      throw error;
    }
    return data;
  };

  // Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Get Current User
  const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  };

  // Check if Email is Verified
  const isEmailVerified = () => {
    return user?.email_confirmed_at !== null;
  };

  // Get User Profile from Database
  const getUserProfile = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error) throw error;
    return data;
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isEmailVerified,
    getUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
