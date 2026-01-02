import { supabase, UserProfile, UserRole } from './supabase';
import { toast } from 'sonner';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  // Driver specific
  vehicleType?: string;
  vehiclePlate?: string;
  // House Owner specific
  businessName?: string;
  propertyType?: string;
  propertyAddress?: string;
  propertyDescription?: string;
  totalSpaces?: number;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Sign up a new user with role-based profile creation
 */
export async function signUp(data: SignUpData): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    // 1. Create auth user
    // 1. Create auth user with full metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role,
          phone: data.phone,
          // Include role-specific fields in metadata so trigger can save them
          vehicle_type: data.vehicleType,
          vehicle_plate: data.vehiclePlate,
          business_name: data.businessName,
          property_type: data.propertyType,
          property_address: data.propertyAddress,
          property_description: data.propertyDescription,
          total_spaces: data.totalSpaces,
        }
      }
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' };
    }

    // 2. Prepare profile data for explicit sync
    const profileData: Partial<UserProfile> = {
      user_id: authData.user.id,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      role: [data.role], // Wrap in array for multi-role support
      phone: data.phone,
    };

    // Add role-specific fields
    if (data.role === 'driver') {
      profileData.vehicle_type = data.vehicleType || undefined;
      profileData.vehicle_plate = data.vehiclePlate || undefined;
    } else if (data.role === 'house_owner') {
      profileData.business_name = data.businessName || undefined;
      profileData.property_type = data.propertyType || undefined;
      profileData.property_address = data.propertyAddress || undefined;
      profileData.property_description = data.propertyDescription || undefined;
      profileData.total_spaces = data.totalSpaces ? parseInt(data.totalSpaces.toString()) : undefined;
    }

    // 3. Insert/Update the profile explicitly (using upsert with onConflict for reliability)
    const { error: insertError } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'user_id' });

    if (insertError) {
      console.error('Profile creation error:', insertError);
      // We don't block here because the trigger might have already succeeded
      console.warn('Explicit profile update failed, but trigger may have succeeded.');
    }

    toast.success('Account created successfully! Please check your email to verify your account.');
    return { success: true, user: authData.user };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(data: SignInData): Promise<{ success: boolean; error?: string; user?: any; role?: UserRole }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to sign in' };
    }

    // Fetch user profile to get role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', authData.user.id)
      .single();

    console.log('SignIn - Profile fetched:', profile);
    let userRole: UserRole | undefined = profile?.role?.[0] as UserRole; // Get first role from array

    // Fallback & Self-Heal: Check user metadata if profile logic failed
    if (authData.user.user_metadata?.role && (!profile || !userRole)) {
      console.log('Profile missing or incomplete, attempting self-heal from metadata...');

      const meta = authData.user.user_metadata;
      userRole = meta.role as UserRole;

      // Construct profile from metadata
      const newProfile: Partial<UserProfile> = {
        user_id: authData.user.id,
        email: authData.user.email || '',
        first_name: meta.first_name || '',
        last_name: meta.last_name || '',
        role: [meta.role], // Wrap in array
        phone: meta.phone || '',
      };

      // Insert the missing profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .upsert(newProfile);

      if (!insertError) {
        console.log('Self-healing successful: Profile created.');
      } else {
        console.error('Self-healing failed:', insertError);
      }
    }

    if (!userRole) {
      console.error('Could not determine user role');
      // Still allow login, but logic will likely default to driver in UI
      return { success: true, user: authData.user };
    }

    console.log('SignIn - Final role being returned:', userRole);
    toast.success('Signed in successfully!');
    return {
      success: true,
      user: authData.user,
      role: userRole
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    toast.success('Signed out successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Get session error:', error);
      return null;
    }
    return session?.user || null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Get current user profile with role
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return null;
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Get profile error:', error);
      return null;
    }

    return profile as UserProfile;
  } catch (error) {
    console.error('Get current user profile error:', error);
    return null;
  }
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    toast.success('Password reset email sent! Please check your inbox.');
    return { success: true };
  } catch (error: any) {
    console.error('Reset password error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}






