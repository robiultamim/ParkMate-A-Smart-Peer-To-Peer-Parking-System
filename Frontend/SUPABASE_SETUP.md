# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the ParkMate application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - Name: ParkMate (or your preferred name)
   - Database Password: Choose a strong password (save it!)
   - Region: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Set Up Environment Variables

1. In the `Frontend` directory, create a `.env` file (copy from `.env.example` if it exists)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Example:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
```

## Step 4: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL script
5. Verify the table was created by going to **Table Editor** → you should see `user_profiles` table

## Step 5: Configure Authentication Settings

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under "Site URL", add your development URL: `http://localhost:5173` (or your Vite dev server port)
3. Under "Redirect URLs", add:
   - `http://localhost:5173/**` (for development)
   - Your production URL (when deploying)

## Step 6: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if needed (optional)

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the signup page
3. Try creating a new account:
   - **Driver**: Fill in the driver signup form
   - **House Owner**: Fill in the owner signup form

4. Check your email for the verification link (if email confirmation is enabled)
5. Try logging in with your new credentials

## Database Schema Overview

The `user_profiles` table stores:
- **Common fields**: id, user_id, role, first_name, last_name, phone, email
- **Driver fields**: vehicle_type, vehicle_plate
- **House Owner fields**: business_name, property_type, property_address, property_description, total_spaces

## Row Level Security (RLS)

The schema includes RLS policies that:
- Allow users to view and update their own profile
- Allow authenticated users to view other profiles (for public information)
- Prevent unauthorized access to user data

## Troubleshooting

### "Invalid API key" error
- Check that your `.env` file has the correct values
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### "Table does not exist" error
- Make sure you ran the SQL schema script in Supabase SQL Editor
- Check that the table name is `user_profiles` (lowercase)

### "Email already registered" error
- This is normal - the email is already in use
- Try logging in instead, or use a different email

### Authentication not persisting
- Check that cookies are enabled in your browser
- Verify that `persistSession: true` is set in `lib/supabase.ts`

## Next Steps

After setting up authentication, you can:
1. Add password reset functionality
2. Add social authentication (Google, Facebook, etc.)
3. Add email verification
4. Add profile picture uploads
5. Add additional user fields as needed

## Support

For more information, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)






