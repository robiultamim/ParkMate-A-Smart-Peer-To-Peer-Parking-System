import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, UserProfile, UserRole } from '../lib/supabase';
import { signIn, signUp, signOut as authSignOut, getCurrentUserProfile } from '../lib/auth';
import { SignUpData, SignInData } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase not configured. Please check your .env file.');
      setLoading(false);
      return;
    }

    let profileLoaded = false;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      console.log('Initial session check:', session?.user ? 'User found' : 'No user');
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id).then(() => {
          profileLoaded = true;
        });
      } else {
        setLoading(false);
        profileLoaded = true;
      }
    }).catch((error) => {
      console.error('Failed to get session:', error);
      setLoading(false);
      profileLoaded = true;
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user ? 'User present' : 'No user');
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile(session.user.id);
        profileLoaded = true;
      } else {
        setProfile(null);
        setLoading(false);
        profileLoaded = true;
      }
    });

    // Safety timeout to prevent infinite loading - increased to 10 seconds
    const timer = setTimeout(() => {
      if (!profileLoaded) {
        console.warn('Auth loading timed out after 10s, forcing completion');
        setLoading(false);
      }
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const loadProfile = async (userId: string, retryCount = 0) => {
    try {
      console.log('Loading profile for user:', userId, retryCount > 0 ? `(retry ${retryCount})` : '');

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), 5000);
      });

      // Race between the query and timeout
      const queryPromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      const { data: profileData, error } = await Promise.race([
        queryPromise,
        timeoutPromise
      ]) as any;

      if (error) {
        console.error('Error fetching profile:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));

        // Retry once if it's a timeout or network error
        if (retryCount < 1) {
          console.log('Retrying profile load...');
          setTimeout(() => loadProfile(userId, retryCount + 1), 1000);
          return; // Don't set loading to false yet
        }

        // Final failure - set loading to false
        setLoading(false);
      } else if (profileData) {
        console.log('Profile loaded successfully:', profileData);
        setProfile(profileData as UserProfile);
        setLoading(false);
      } else {
        // No data and no error - shouldn't happen but handle it
        console.warn('No profile data returned');
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Error in loadProfile:', error.message || error);

      // Retry once on timeout
      if (error.message === 'Query timeout' && retryCount < 1) {
        console.log('Query timed out, retrying...');
        setTimeout(() => loadProfile(userId, retryCount + 1), 1000);
        return; // Don't set loading to false yet
      }

      // Final failure - set loading to false
      setLoading(false);
    }
  };

  const handleSignIn = async (data: SignInData) => {
    const result = await signIn(data);
    if (result.success && result.user) {
      await loadProfile(result.user.id);
    }
    return result;
  };

  const handleSignUp = async (data: SignUpData) => {
    const result = await signUp(data);
    if (result.success && result.user) {
      await loadProfile(result.user.id);
    }
    return result;
  };

  const handleSignOut = async () => {
    try {
      // Attempt sign out with a timeout to prevent hanging
      await Promise.race([
        authSignOut(),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      // Always clear local state
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



