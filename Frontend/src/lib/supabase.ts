import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are not set!');
  console.error('Please create a .env file in the Frontend directory with:');
  console.error('VITE_SUPABASE_URL=your_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_key');
  console.error('See ENV_CONFIGURATION.md for details.');
}

// Create client with fallback to prevent crashes
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Database types
export type UserRole = 'driver' | 'house_owner';

export interface UserProfile {
  id: string;
  user_id: string;
  role: UserRole[]; // Changed to array to support multiple roles
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
  // Driver specific fields
  vehicle_type?: string;
  vehicle_plate?: string;
  // House Owner specific fields
  business_name?: string;
  property_type?: string;
  property_address?: string;
  property_description?: string;
  total_spaces?: number;
}



