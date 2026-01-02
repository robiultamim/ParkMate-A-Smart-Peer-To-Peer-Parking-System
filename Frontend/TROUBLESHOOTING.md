# Troubleshooting Guide

## Issue: Page loads but nothing shows

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for any red error messages
4. Share the error messages if you see any

### Step 2: Verify .env File Exists
1. Navigate to: `ParkMate-A-Smart-Peer-To-Peer-Parking-System\Frontend\`
2. Check if `.env` file exists (it should be in the same folder as `package.json`)
3. If it doesn't exist, create it with this content:

```env
VITE_SUPABASE_URL=https://tuogbwilzwsoizxlgfhq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2did2lsendzb2l6eGxnZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDgwODYsImV4cCI6MjA4MTEyNDA4Nn0.9uBmZAvOjd_CfDr7Yt-qQnYW6yn5FTzxX9YXF3983SM
```

### Step 3: Restart Dev Server
After creating/updating `.env` file:
1. Stop the dev server (Ctrl+C)
2. Start it again: `npm run dev`
3. **Important**: Environment variables are only loaded when the server starts

### Step 4: Check What You See
The app should now show one of these:

**✅ Working**: Landing page with ParkMate branding

**⚠️ Configuration Error**: A message saying "Configuration Required" with instructions

**❌ Error Boundary**: A red error message with details

## Common Issues

### Issue: "Supabase environment variables are not set"
**Solution**: Create the `.env` file as shown in Step 2 above

### Issue: "Failed to fetch" or network errors
**Solution**: 
- Check your internet connection
- Verify the Supabase URL is correct
- Check if Supabase project is active

### Issue: White screen / blank page
**Solution**:
1. Check browser console for errors
2. Verify `.env` file exists and has correct values
3. Restart dev server
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Cannot read property of undefined"
**Solution**: This usually means a component is trying to access data before it's loaded. Check the browser console for the exact line.

## Quick Fix Commands

### Windows PowerShell (in Frontend directory):
```powershell
# Create .env file
@"
VITE_SUPABASE_URL=https://tuogbwilzwsoizxlgfhq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2did2lsendzb2l6eGxnZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDgwODYsImV4cCI6MjA4MTEyNDA4Nn0.9uBmZAvOjd_CfDr7Yt-qQnYW6yn5FTzxX9YXF3983SM
"@ | Out-File -FilePath .env -Encoding utf8
```

### Verify .env file was created:
```powershell
Get-Content .env
```

## Still Not Working?

1. **Check Node version**: Should be Node.js 18+
   ```bash
   node --version
   ```

2. **Reinstall dependencies**:
   ```bash
   npm install
   ```

3. **Clear Vite cache**:
   ```bash
   rm -rf node_modules/.vite
   # or on Windows:
   rmdir /s /q node_modules\.vite
   ```

4. **Check if port is in use**:
   - Default port is 5173
   - If occupied, Vite will use the next available port
   - Check the terminal output for the actual URL

## Getting Help

If the issue persists:
1. Check browser console for errors
2. Check terminal/command prompt for build errors
3. Share the error messages you see




