import { supabase, UserRole } from './supabase';
import { toast } from 'sonner';

/**
 * Add a new role to the current user's profile
 */
export async function addRoleToProfile(newRole: UserRole): Promise<{ success: boolean; error?: string }> {
    try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        // Get current profile
        const { data: profile, error: fetchError } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

        if (fetchError) {
            return { success: false, error: 'Failed to fetch profile: ' + fetchError.message };
        }

        // Check if user already has this role
        if (profile.role.includes(newRole)) {
            return { success: false, error: `You already have the ${newRole === 'driver' ? 'Driver' : 'Space Owner'} role` };
        }

        // Add the new role to the array
        const updatedRoles = [...profile.role, newRole];

        // Update the profile
        const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ role: updatedRoles })
            .eq('user_id', session.user.id);

        if (updateError) {
            return { success: false, error: 'Failed to add role: ' + updateError.message };
        }

        toast.success(`Successfully added ${newRole === 'driver' ? 'Driver' : 'Space Owner'} role!`);
        return { success: true };
    } catch (error: any) {
        console.error('Add role error:', error);
        return { success: false, error: error.message || 'An unexpected error occurred' };
    }
}
