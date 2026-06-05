# NextAuth Migration Checklist

## ✅ Completed by Agent

- [x] Replaced Better Auth config with NextAuth config (`src/config/auth.ts`)
- [x] Updated auth client hooks (`lib/auth-client.ts`)
- [x] Updated environment variable names (`src/config/env.ts`)
- [x] Created NextAuth API route (`app/api/auth/[...nextauth]/route.ts`)
- [x] Updated Prisma schema for NextAuth v5 (added password field)
- [x] Added TypeScript type definitions (`types/auth.d.ts`)
- [x] Wrapped app with SessionProvider (`app/providers.tsx`)
- [x] Updated Navbar component (`components/Navbar.tsx`)
- [x] Updated Login page (`app/login/page.tsx`)
- [x] Updated Signup page (`app/signup/page.tsx`)
- [x] Created Signup API route (`app/api/signup/route.ts`)
- [x] Installed and configured bcrypt for password hashing
- [x] Removed Better Auth dependency from package.json
- [x] Updated Prisma config (`prisma.config.ts`)

## 🔴 Required: You Must Do

### 1. Update Environment Variables (CRITICAL)
```bash
# Edit .env.local and rename:
BETTER_AUTH_SECRET="xxx" → NEXTAUTH_SECRET="xxx"
BETTER_AUTH_URL="xxx" → NEXTAUTH_URL="xxx"

# Generate new secret if needed:
openssl rand -base64 32
```

### 2. Run Database Migration (CRITICAL)
```bash
npx prisma migrate dev --name migrate-to-nextauth
npx prisma generate
```

### 3. Test Everything
```bash
npm run dev
```
Test: Login, Logout, Google OAuth, GitHub OAuth, Session persistence

## 📄 Optional: Cleanup

- [ ] Remove Better Auth docs from `BACKEND_README.md`
- [ ] Remove Better Auth references from `BACKEND_SETUP_COMPLETE.md`
- [ ] Update `app/api/STRUCTURE.md` with new auth structure
- [ ] Remove `app/api/auth.disabled` folder (if no longer needed)

## 📖 Full Details

See `NEXTAUTH_MIGRATION.md` for complete documentation.
