# API Directory Structure

```
app/api/
├── README.md                          # Complete API documentation
├── ROUTES_SUMMARY.md                  # Quick reference guide
├── STRUCTURE.md                       # This file
│
├── auth/
│   └── [...all]/
│       └── route.ts                   # Better Auth handlers (GET, POST)
│
├── courses/
│   ├── route.ts                       # GET (all), POST (create - admin)
│   └── [slug]/
│       └── route.ts                   # GET (single course)
│
├── lessons/
│   └── [courseSlug]/
│       └── [lessonSlug]/
│           └── route.ts               # GET (single lesson)
│
├── progress/
│   └── route.ts                       # POST (track), GET (user progress)
│
└── books/
    ├── route.ts                       # GET (all books)
    └── [slug]/
        ├── route.ts                   # GET (single book)
        └── download/
            └── route.ts               # POST (download - auth)
```

## Route Count
- **Total Routes**: 11 endpoints
- **Public Routes**: 6 (no auth required)
- **Protected Routes**: 5 (auth/admin required)

## HTTP Methods Summary

### GET (7 endpoints)
- `/api/courses` - List courses
- `/api/courses/[slug]` - Single course
- `/api/lessons/[courseSlug]/[lessonSlug]` - Single lesson
- `/api/progress` 🔒 - User progress
- `/api/books` - List books
- `/api/books/[slug]` - Single book
- `/api/auth/[...all]` - Auth handler

### POST (4 endpoints)
- `/api/courses` 🔒🔑 - Create course (admin)
- `/api/progress` 🔒 - Track progress
- `/api/books/[slug]/download` 🔒 - Download book
- `/api/auth/[...all]` - Auth handler

**Legend:**
- 🔒 Requires authentication
- 🔑 Requires admin role

## MVC Architecture Flow

```
Request → Route Handler → Middleware (Auth) → Controller → Service → Database
                                                    ↓
Response ← ApiResponse Helper ← Controller ← Service ← Prisma ORM
```

### Layer Responsibilities

1. **Route Handler** (`app/api/**/route.ts`)
   - Parse request (params, query, body)
   - Call authentication middleware
   - Validate input
   - Call controller methods
   - Format and return response

2. **Middleware** (`src/middleware/auth.middleware.ts`)
   - Verify authentication tokens
   - Check user permissions
   - Attach user data to request
   - Return auth errors if needed

3. **Controller** (`src/controllers/*.controller.ts`)
   - Business logic layer
   - Input validation
   - Call service methods
   - Handle errors
   - Return standardized responses

4. **Service** (`src/services/*.service.ts`)
   - Database operations
   - Data transformation
   - Complex queries
   - Transaction handling

5. **Response Helper** (`src/utils/response.ts`)
   - Standardize API responses
   - HTTP status codes
   - Success/error formatting
   - Type safety

## File Organization Pattern

Each API route follows this pattern:

```typescript
// 1. Imports
import { NextRequest } from "next/server";
import { Controller } from "@/controllers";
import { requireAuth } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";

// 2. HTTP Method Handler(s)
export async function GET(req: NextRequest, context?: { params: Promise<any> }) {
  try {
    // 3. Authentication (if needed)
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;
    const { user } = authResult;

    // 4. Extract Parameters
    const params = await context?.params;
    const { searchParams } = new URL(req.url);
    const body = await req.json(); // for POST/PUT

    // 5. Validate Input
    if (!params.id) {
      return ApiResponse.validationError("ID is required");
    }

    // 6. Call Controller
    const result = await Controller.method(params, user);

    // 7. Handle Response
    if (result.success) {
      return ApiResponse.success(result.data);
    } else if (result.error === "Not found") {
      return ApiResponse.notFound();
    } else {
      return ApiResponse.error(result.error, 500);
    }
  } catch (error) {
    // 8. Error Handling
    console.error("Error:", error);
    return ApiResponse.serverError();
  }
}
```

## Type Safety

All routes are fully typed:

```typescript
// Route with params
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) { ... }

// Route with nested params
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string; lessonSlug: string }> }
) { ... }

// Controller response type
type ControllerResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

## Environment Configuration

Required environment variables for API routes:

```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: OAuth providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Test endpoints**: Use curl, Postman, or browser
3. **Check logs**: Console output in terminal
4. **Debug**: Add console.log in route handlers
5. **TypeScript**: Check types with `npm run type-check`

## Common Patterns

### Query Parameters
```typescript
const { searchParams } = new URL(req.url);
const category = searchParams.get("category") || undefined;
```

### Route Parameters (Next.js 15+)
```typescript
const params = await context.params;
const { slug } = params;
```

### Request Body
```typescript
const body = await req.json();
const { lessonId, completed } = body;
```

### Authentication Check
```typescript
const authResult = await requireAuth(req);
if (authResult instanceof Response) return authResult;
const { user } = authResult;
```

### Admin Check
```typescript
const authResult = await requireAdmin(req);
if (authResult instanceof Response) return authResult;
const { user } = authResult;
```

## Testing

### Manual Testing
```bash
# Start dev server
npm run dev

# Test public endpoint
curl http://localhost:3000/api/courses

# Test protected endpoint (need auth token)
curl -H "Cookie: auth-token=YOUR_TOKEN" http://localhost:3000/api/progress
```

### Automated Testing (Future)
```typescript
// Example Jest test
import { GET } from '@/app/api/courses/route';

describe('/api/courses', () => {
  it('should return courses', async () => {
    const request = new Request('http://localhost:3000/api/courses');
    const response = await GET(request);
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
```

## Performance Considerations

1. **Database Queries**: Controllers use optimized Prisma queries
2. **Response Caching**: Can be added with `revalidate` in route.ts
3. **Rate Limiting**: Can be added with middleware
4. **Pagination**: Supported in controller layer
5. **Filtering**: Efficient category/search filters

## Security Best Practices

✅ **Implemented:**
- Authentication with Better Auth
- Role-based access control (admin routes)
- Input validation at route level
- Error handling without exposing internals
- HTTPS in production (via deployment)

🔄 **Future Enhancements:**
- Rate limiting
- CSRF protection
- Request validation schemas (Zod)
- API versioning
- Request logging
- Audit trails

## Maintenance

### Adding a New Route

1. Create directory: `app/api/resource/`
2. Create `route.ts` with handlers
3. Import controllers from `@/controllers`
4. Use `ApiResponse` helpers
5. Add auth middleware if needed
6. Update this documentation

### Modifying Existing Route

1. Edit `route.ts` file
2. Update controller if logic changes
3. Test with curl/Postman
4. Update API docs (README.md)
5. Check TypeScript types

### Debugging Issues

1. Check console logs in terminal
2. Verify authentication tokens
3. Check database connection
4. Validate request format
5. Review controller/service logic
6. Check Prisma schema matches DB

## Related Documentation

- [API Documentation](./README.md) - Complete endpoint reference
- [Routes Summary](./ROUTES_SUMMARY.md) - Quick reference
- [Controllers](../../src/controllers/README.md) - Business logic
- [Services](../../src/services/README.md) - Database operations
- [Middleware](../../src/middleware/auth.middleware.ts) - Auth layer
