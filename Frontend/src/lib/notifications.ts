import { supabase } from './supabase';

export type NotificationType =
    | 'booking'
    | 'payment'
    | 'system'
    | 'security'
    | 'booking_request'
    | 'earnings'
    | 'space_verification';

export interface CreateNotificationParams {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    actionRequired?: boolean;
    metadata?: any;
}

export const createNotification = async ({
    userId,
    title,
    message,
    type,
    actionRequired = false,
    metadata = {}
}: CreateNotificationParams) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .insert([
                {
                    user_id: userId,
                    title,
                    message,
                    type,
                    action_required: actionRequired,
                    metadata: metadata,
                    is_read: false
                }
            ]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating notification:', error);
        // Silent fail to not break the main flow, but log it
        return null;
    }
};
