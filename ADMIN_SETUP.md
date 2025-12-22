# Admin Panel Setup Guide

## Overview

The admin panel uses simple password-based authentication. Anyone with the admin password can access the dashboard.

## Setup

### 1. Set Admin Password

Add the `ADMIN_PASSWORD` environment variable to your `.env.local` file:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**Security Tips:**
- Use a strong, unique password
- Don't commit this password to version control
- Change it periodically
- Share it only with authorized personnel

### 2. Access Admin Panel

1. Navigate to `/admin` (or `/{locale}/admin` like `/en/admin`)
2. You'll be redirected to the login page
3. Enter the admin password
4. Click "Access Admin Panel"

### 3. Session Duration

- Admin sessions last **24 hours**
- After 24 hours, you'll need to log in again
- You can manually logout using the "Logout" button in the sidebar

## Features

The admin dashboard provides access to:

- **Dashboard**: Overview stats and quick actions
- **Site Content**: Manage site-wide content and copy
- **Senior Centers**: Add and manage partner senior centers
- **Gift Deliveries**: Track Buy One, Gift One donations
- **Replacement Requests**: Process Fresh Swap Guarantee requests
- **Support Requests**: Handle customer support tickets

## Security Notes

- Sessions are stored in HTTP-only cookies
- Cookies are marked as secure in production
- Password comparison is done server-side
- No database user accounts required
- Simple and effective for small teams

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add `ADMIN_PASSWORD` to your environment variables in the deployment platform
2. Use a strong password (at least 16 characters, mix of letters, numbers, symbols)
3. Keep the password in a password manager
4. Consider rotating it periodically

## Troubleshooting

### "Invalid password" error
- Double-check the password in your `.env.local` file
- Ensure no extra spaces or line breaks
- Restart your development server after changing `.env.local`

### Redirecting to login repeatedly
- Check browser cookies are enabled
- Clear cookies and try again
- Ensure `NEXTAUTH_SECRET` is set (used for cookie signing)

### "Admin authentication not configured"
- `ADMIN_PASSWORD` environment variable is missing
- Add it to your `.env.local` file and restart the server

