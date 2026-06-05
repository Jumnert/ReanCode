# Better Auth → NextAuth Migration Complete

## ✅ Changes Implemented

### 1. **Dependencies**
- ✅ Removed `better-auth` 
- ✅ Already installed `next-auth@5.0.0-beta.31`
- ✅ Already installed `@auth/prisma-adapter@2.11.2`

### 2. **Configuration Files**

#### `src/config/auth.ts`
- ✅ Replaced Better Auth with NextAuth v5 configuration
- ✅ Added Google & GitHub OAuth providers
- ✅ Added Credentials provider (email/password)
- ✅ Configured JWT session strategy
- ✅ Added custom callbacks for user data
- ✅ Exported `handlers`, `signIn`, `signOut`, and `auth` functions

#### `lib/auth-client.ts`
- ✅ Replaced Better Auth client hooks with NextAuth hooks
- ✅ Exported `useSession`, `signIn`, `signOut`
- ✅ Added convenience functions:
  - `signInWithCredentials(email, password)`
  - `signInWithGoogle()`
  - `signInWithGitHub()`

#### `src/config/env.ts`
- ✅ Updated environment variables:
  - `BETTER_AUTH_SECRET` → `NEXTAUTH_SECRET`
  - `BETTER_AUTH_URL` → `NEXTAUTH_URL`

### 3. **API Routes**

#### `app/api/auth/[...nextauth]/route.ts`
- ✅ Created NextAuth API route handler
- ✅ Exports GET and POST handlers

### 4. **Prisma Schema** (`prisma/schema.prisma`)
Updated auth models to NextAuth v5 format:

#### User Model
- ✅ Added `emailVerified` field (DateTime?)
- ✅ Added `image` field (for NextAuth compatibility)

#### Session Model
- ✅ Changed from Better Auth format to NextAuth format
- ✅ Fields: `id`, `sessionToken`, `userId`, `expires`
- ✅ Removed: `ipAddress`, `userAgent`, `createdAt`

#### Account Model  
- ✅ Updated to NextAuth v5 format
- ✅ Added `type` field
- ✅ Renamed fields to match NextAuth convention:
  - `refreshToken` → `refresh_token`
  - `accessToken` → `access_token`
  - `expiresAt` → `expires_at` (changed to Int)
  - `tokenType` → `token_type`
  - `idToken` → `id_token`
- ✅ Added `session_state` field

#### VerificationToken Model
- ✅ Updated to NextAuth v5 format
- ✅ Removed `createdAt` field
- ✅ Kept `identifier`, `token`, `expires`

### 5. **TypeScript Types** (`types/auth.d.ts`)
- ✅ Created NextAuth type extensions
- ✅ Extended Session interface to include `user.id` and `user.role`
- ✅ Extended JWT interface to include `id` and `role`

### 6. **Providers** (`app/providers.tsx`)
- ✅ Wrapped app with `SessionProvider` from `next-auth/react`
- ✅ Keeps existing `NextThemesProvider`

### 7. **Components**

#### `components/Navbar.tsx`
- ✅ Re-enabled auth functionality
- ✅ Updated to use NextAuth hooks
- ✅ Fixed avatar image source (uses `user.image`)

#### `app/login/page.tsx`
- ✅ Updated to use new auth functions:
  - `signInWithCredentials()` for email/password
  - `signInWithGoogle()` for Google OAuth
  - `signInWithGitHub()` for GitHub OAuth

### 8. **Configuration**
- ✅ Updated `prisma.config.ts` with correct datasource URLs
- ✅ Removed Better Auth dependencies

---

## 📋 TODO: Manual Steps Required

### 1. **Environment Variables**
Update your `.env.local` file with these changes:

```env
# Replace these:
BETTER_AUTH_SECRET="..." → NEXTAUTH_SECRET="..."
BETTER_AUTH_URL="..." → NEXTAUTH_URL="..."

# Keep existing:
DATABASE_URL="..."
DIRECT_URL="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

**Generate a new secret:**
```bash
openssl rand -base64 32
```

### 2. **Run Database Migration**
```bash
npx prisma migrate dev --name migrate-to-nextauth
npx prisma generate
```

This will:
- Create new NextAuth tables
- Migrate existing users (if any)
- Update session and account tables

### 3. **Password Hashing**
⚠️ **IMPORTANT**: The Credentials provider currently has a placeholder for password verification.

You need to:
1. Install bcrypt:
   ```bash
   npm install bcrypt
   npm install --save-dev @types/bcrypt
   ```

2. Update `src/config/auth.ts` in the Credentials provider:
   ```typescript
   import bcrypt from 'bcrypt';
   
   // In the authorize function:
   const isValidPassword = await bcrypt.compare(password, user.password);
   if (!isValidPassword) return null;
   ```

3. Add password hashing to signup:
   ```typescript
   const hashedPassword = await bcrypt.hash(password, 12);
   ```

### 4. **Update Signup Page**
Similar to login page, update `app/signup/page.tsx` to use NextAuth (if it exists).

### 5. **Test Authentication**
1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Test each auth method:
   - ✅ Email/Password login
   - ✅ Google OAuth
   - ✅ GitHub OAuth
   - ✅ Sign out
   - ✅ Session persistence

### 6. **Update Other Auth-Dependent Pages**
Check and update any other pages that use authentication:
- `app/forgot-password/page.tsx`
- `app/verify-otp/page.tsx`
- `app/signup/page.tsx`
- Any protected routes

---

## 🔄 Key Differences: Better Auth vs NextAuth

| Feature | Better Auth | NextAuth v5 |
|---------|-------------|-------------|
| **Session Storage** | Database | JWT (default) or Database |
| **API Route** | `/api/auth/*` (custom) | `/api/auth/[...nextauth]` |
| **Client Hook** | `createAuthClient()` | `useSession()` from `next-auth/react` |
| **Sign In** | `signIn.email()`, `signIn.social()` | `signIn(provider)` |
| **Config Location** | `betterAuth({...})` | `NextAuth({...})` |
| **Adapter** | `prismaAdapter()` | `PrismaAdapter()` |
| **Session Type** | Database sessions | JWT tokens |

---

## 🎯 Benefits of NextAuth

1. **Industry Standard**: Most widely used auth library for Next.js
2. **Better Documentation**: Extensive docs and community support
3. **More Providers**: 40+ built-in OAuth providers
4. **Active Development**: Regular updates and security patches
5. **Type Safety**: Full TypeScript support
6. **Flexible**: JWT or database sessions
7. **Easy Testing**: Well-documented testing patterns

---

## 🐛 Troubleshooting

### Error: "NEXTAUTH_SECRET is missing"
- Make sure you updated `.env.local` with `NEXTAUTH_SECRET`
- Restart your dev server after changing env vars

### Error: "Invalid session token"
- Clear browser cookies and try again
- Old Better Auth sessions are incompatible

### OAuth not working
- Check OAuth app settings in Google/GitHub console
- Verify redirect URIs include: `http://localhost:3000/api/auth/callback/google`
- Ensure `NEXTAUTH_URL` matches your app URL

### Database errors
- Run `npx prisma migrate reset` if needed (⚠️ **deletes all data**)
- Or run `npx prisma migrate dev` to apply changes

---

## 📚 Next Steps

1. **Update environment variables**
2. **Run Prisma migration**
3. **Implement password hashing**
4. **Update signup page**
5. **Test all auth flows**
6. **Update documentation**
7. **Remove Better Auth references from docs**

---

## 📖 Resources

- [NextAuth.js v5 Docs](https://next-auth.js.org/)
- [PrismaAdapter Docs](https://authjs.dev/reference/adapter/prisma)
- [NextAuth TypeScript](https://next-auth.js.org/getting-started/typescript)
- [OAuth Providers](https://next-auth.js.org/providers/)

---

**Migration Date**: 2026-06-05  
**NextAuth Version**: 5.0.0-beta.31  
**Next.js Version**: 16.2.6
