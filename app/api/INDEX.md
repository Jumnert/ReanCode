# API Documentation Index

Welcome to the Rean2Code API documentation! This directory contains comprehensive documentation for all API routes.

## 📚 Documentation Files

### 1. [README.md](./README.md) - Complete API Reference
**What it contains:**
- Detailed endpoint documentation
- Request/response examples
- Query parameters and body schemas
- HTTP status codes
- Authentication requirements
- Usage examples with JavaScript
- cURL command examples

**Use this when:** You need complete information about any endpoint, including examples and all available options.

---

### 2. [ROUTES_SUMMARY.md](./ROUTES_SUMMARY.md) - Quick Reference
**What it contains:**
- All available routes at a glance
- Implementation patterns
- Controllers and middleware used
- Testing commands
- Security overview
- Error handling patterns

**Use this when:** You need a quick overview of all routes or want to understand the architecture at a high level.

---

### 3. [STRUCTURE.md](./STRUCTURE.md) - Architecture Deep Dive
**What it contains:**
- Directory structure visualization
- MVC architecture flow diagrams
- Layer responsibilities
- File organization patterns
- Type safety examples
- Development workflow
- Common patterns and best practices
- Performance and security considerations
- Maintenance guides

**Use this when:** You need to understand the architecture, add new routes, or debug complex issues.

---

## 🚀 Quick Start

### For Frontend Developers
Start with **[README.md](./README.md)** to understand how to call each endpoint.

```javascript
// Example: Fetch all courses
const response = await fetch('/api/courses');
const { success, data } = await response.json();
```

### For Backend Developers
Read **[STRUCTURE.md](./STRUCTURE.md)** to understand the MVC architecture and how to add new routes.

```typescript
// Example: New route pattern
export async function GET(req: NextRequest) {
  const result = await Controller.method();
  return ApiResponse.success(result.data);
}
```

### For Testing/QA
Use **[ROUTES_SUMMARY.md](./ROUTES_SUMMARY.md)** for quick testing commands.

```bash
curl http://localhost:3000/api/courses
```

---

## 📋 API Overview

### Available Endpoints

| Category | Endpoints | Public | Protected | Admin |
|----------|-----------|---------|-----------|-------|
| **Courses** | 3 | 2 | 0 | 1 |
| **Lessons** | 1 | 1 | 0 | 0 |
| **Progress** | 2 | 0 | 2 | 0 |
| **Books** | 3 | 2 | 1 | 0 |
| **Auth** | 2 | 2 | 0 | 0 |
| **Total** | **11** | **7** | **3** | **1** |

### Endpoint Summary

#### 📚 Courses
- `GET /api/courses` - List all courses (with optional category filter)
- `GET /api/courses/[slug]` - Get single course details
- `POST /api/courses` 🔑 - Create new course (admin only)

#### 📖 Lessons  
- `GET /api/lessons/[courseSlug]/[lessonSlug]` - Get lesson content

#### 📊 Progress
- `GET /api/progress` 🔒 - Get user progress summary
- `POST /api/progress` 🔒 - Track lesson completion

#### 📚 Books
- `GET /api/books` - List all books (with optional category filter)
- `GET /api/books/[slug]` - Get single book details
- `POST /api/books/[slug]/download` 🔒 - Download book PDF

#### 🔐 Authentication
- `GET /api/auth/[...all]` - Better Auth handlers
- `POST /api/auth/[...all]` - Better Auth handlers

**Legend:**
- 🔒 Requires user authentication
- 🔑 Requires admin role

---

## 🏗️ Architecture Stack

```
┌─────────────────────────────────────┐
│         API Routes (Next.js)        │  ← You are here
├─────────────────────────────────────┤
│      Controllers (Business Logic)   │
├─────────────────────────────────────┤
│      Services (Data Layer)          │
├─────────────────────────────────────┤
│      Prisma ORM                     │
├─────────────────────────────────────┤
│      PostgreSQL Database            │
└─────────────────────────────────────┘
```

### Technology Used
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Better Auth
- **Language**: TypeScript
- **API Pattern**: RESTful + MVC

---

## 🔧 Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Test API endpoints**
   ```bash
   curl http://localhost:3000/api/courses
   ```

---

## 📝 Common Tasks

### Testing an Endpoint
```bash
# Public endpoint
curl http://localhost:3000/api/courses

# Protected endpoint (need auth cookie)
curl -H "Cookie: auth-token=YOUR_TOKEN" \
     http://localhost:3000/api/progress
```

### Adding a New Route
1. Read [STRUCTURE.md](./STRUCTURE.md) → "Maintenance" section
2. Create route file: `app/api/your-route/route.ts`
3. Import controller and use ApiResponse helpers
4. Test with curl or Postman
5. Update documentation

### Debugging Issues
1. Check terminal logs (console.log output)
2. Verify request format matches docs
3. Check authentication token validity
4. Review controller and service logic
5. Inspect database with Prisma Studio: `npx prisma studio`

---

## 🔐 Authentication

### How It Works
- Uses **Better Auth** for session management
- Session stored in `auth-token` cookie
- Middleware validates tokens on protected routes
- Role-based access control (user/admin)

### Getting an Auth Token
1. Sign up: `POST /api/auth/sign-up`
2. Sign in: `POST /api/auth/sign-in`
3. Token automatically stored in cookie
4. Include cookie in subsequent requests

### Using Protected Endpoints
```javascript
// Browser (automatic with credentials)
fetch('/api/progress', {
  credentials: 'include'
})

// Node.js/cURL (manual cookie)
curl -H "Cookie: auth-token=YOUR_TOKEN" \
     http://localhost:3000/api/progress
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Your data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {} // Optional
}
```

### HTTP Status Codes
- `200` OK - Success
- `201` Created - Resource created
- `400` Bad Request - Validation error
- `401` Unauthorized - Not authenticated
- `403` Forbidden - Not authorized
- `404` Not Found - Resource not found
- `500` Server Error - Internal error

---

## 🆘 Need Help?

### For API Usage Questions
→ See [README.md](./README.md) for complete endpoint documentation

### For Architecture Questions  
→ See [STRUCTURE.md](./STRUCTURE.md) for MVC pattern details

### For Quick Reference
→ See [ROUTES_SUMMARY.md](./ROUTES_SUMMARY.md) for testing commands

### For Code Issues
- Check terminal logs for errors
- Review TypeScript errors in editor
- Test with Postman/cURL first
- Verify database schema with `npx prisma studio`

---

## 📚 Related Documentation

- **Controllers**: `src/controllers/README.md`
- **Services**: `src/services/README.md`
- **Middleware**: `src/middleware/auth.middleware.ts`
- **Database Schema**: `prisma/schema.prisma`
- **Project README**: `README.md` (root)

---

## 🎯 Best Practices

✅ **Always:**
- Use TypeScript for type safety
- Validate input at route level
- Use ApiResponse helpers for consistency
- Handle errors with try-catch
- Log errors to console
- Check authentication when needed
- Test with curl before frontend integration

❌ **Never:**
- Return raw database errors to client
- Hardcode secrets or API keys
- Skip input validation
- Ignore TypeScript errors
- Expose admin routes without auth
- Return sensitive user data

---

**Last Updated**: 2026-06-05  
**API Version**: 1.0  
**Next.js Version**: 15+
