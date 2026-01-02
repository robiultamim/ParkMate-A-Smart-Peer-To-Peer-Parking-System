# Environment Configuration

## Supabase Credentials

Your Supabase project has been set up successfully! Use these credentials in your `.env` file:

### Project Information
- **Project Name**: Parkmate
- **Project ID**: tuogbwilzwsoizxlgfhq
- **Project URL**: https://tuogbwilzwsoizxlgfhq.supabase.co

### Environment Variables

Create a `.env` file in the `Frontend` directory with the following content:

```env
VITE_SUPABASE_URL=https://tuogbwilzwsoizxlgfhq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2did2lsendzb2l6eGxnZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDgwODYsImV4cCI6MjA4MTEyNDA4Nn0.9uBmZAvOjd_CfDr7Yt-qQnYW6yn5FTzxX9YXF3983SM
```

### Alternative: Modern Publishable Key

If you prefer to use the modern publishable key format:

```env
VITE_SUPABASE_URL=https://tuogbwilzwsoizxlgfhq.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_NVfWJ1dSC38JAfC4Q4_DAA_eWPfTLRq
```

## Database Status

✅ **Database Schema Applied Successfully**

The following has been set up:

1. **user_profiles table** - Created with all required columns
2. **Row Level Security (RLS)** - Enabled with 4 security policies
3. **Indexes** - Created for optimal query performance:
   - Primary key index on `id`
   - Unique index on `user_id`
   - Index on `user_id` for lookups
   - Index on `role` for role-based queries
   - Index on `email` for email lookups
4. **Triggers** - Auto-update `updated_at` timestamp
5. **Security Functions** - Configured with proper search_path

## Table Structure

### user_profiles Table

**Common Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users, Unique)
- `role` (TEXT, ENUM: 'driver' | 'house_owner')
- `first_name` (TEXT, Required)
- `last_name` (TEXT, Required)
- `phone` (TEXT, Required)
- `email` (TEXT, Required)
- `created_at` (TIMESTAMP, Auto-generated)
- `updated_at` (TIMESTAMP, Auto-updated)

**Driver-Specific Fields:**
- `vehicle_type` (TEXT, Optional)
- `vehicle_plate` (TEXT, Optional)

**House Owner-Specific Fields:**
- `business_name` (TEXT, Optional)
- `property_type` (TEXT, Optional)
- `property_address` (TEXT, Optional)
- `property_description` (TEXT, Optional)
- `total_spaces` (INTEGER, Optional)

## Security Policies

1. **Users can view own profile** - SELECT policy
2. **Users can update own profile** - UPDATE policy
3. **Users can insert own profile** - INSERT policy
4. **Authenticated users can view other profiles** - SELECT policy for public info

## Next Steps

1. **Create `.env` file** in the `Frontend` directory with the credentials above
2. **Restart your dev server** if it's running:
   ```bash
   npm run dev
   ```
3. **Test the authentication**:
   - Try signing up as a Driver
   - Try signing up as a House Owner
   - Try signing in with created accounts

## Access Your Supabase Dashboard

Visit: https://supabase.com/dashboard/project/tuogbwilzwsoizxlgfhq

From there you can:
- View the database tables
- Monitor authentication
- Check logs
- Manage users
- View API documentation




