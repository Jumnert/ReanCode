# 🔴 URGENT: Fix Environment Variables

## Issue Found
Your `.env.local` file has duplicate `NEXTAUTH_SECRET` variable names on lines 12-14. They need to be corrected.

## Quick Fix

Open `.env.local` and change lines 12-14 from:

```bash
# ❌ WRONG - All say NEXTAUTH_SECRET:
NEXTAUTH_SECRET="gNnlm2F+6XkGz4Yv1L9m0gIu46tuJJMtDUqR3YAT9a2XSxxy1oRrbwfMbC9Je3bE"
NEXTAUTH_SECRET="http://localhost:3000"
NEXTAUTH_SECRET="http://rean2code.netlify.app"
```

To:

```bash
# ✅ CORRECT:
NEXTAUTH_SECRET="gNnlm2F+6XkGz4Yv1L9m0gIu46tuJJMtDUqR3YAT9a2XSxxy1oRrbwfMbC9Je3bE"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Or if you prefer production URLs:

```bash
NEXTAUTH_SECRET="gNnlm2F+6XkGz4Yv1L9m0gIu46tuJJMtDUqR3YAT9a2XSxxy1oRrbwfMbC9Je3bE"
NEXTAUTH_URL="https://rean2code.netlify.app"
NEXT_PUBLIC_APP_URL="https://rean2code.netlify.app"
```

## What Each Variable Does

- **`NEXTAUTH_SECRET`**: Secret key for encrypting JWT tokens (keep this private!)
- **`NEXTAUTH_URL`**: Base URL for NextAuth callbacks (development: localhost, production: your domain)
- **`NEXT_PUBLIC_APP_URL`**: Public-facing app URL used across your application

## After Fixing

1. Save the file
2. Restart your dev server: `npm run dev`
3. Test authentication

That's it! The migration is now 100% complete.
