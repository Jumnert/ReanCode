# API Routes Summary

## Created Routes

All routes follow the MVC pattern and use the standardized ApiResponse helper.

### ✅ Courses API
- `GET /api/courses` - Get all courses (optional category filter)
- `POST /api/courses` 🔒 - Create course (admin only)
- `GET /api/courses/[slug]` - Get single course by slug

**Files:**
- `app/api/courses/route.ts`
- `app/api/courses/[slug]/route.ts`

---

### ✅ Lessons API
- `GET /api/lessons/[courseSlug]/[lessonSlug]` - Get specific lesson

**Files:**
- `app/api/lessons/[courseSlug]/[lessonSlug]/route.ts`

---

### ✅ Progress API
- `POST /api/progress` 🔒 - Track lesson progress (auth required)
- `GET /api/progress` 🔒 - Get user progress (auth required)

**Files:**
- `app/api/progress/route.ts`

---

### ✅ Books API
- `GET /api/books` - Get all books (optional category filter)
- `GET /api/books/[slug]` - Get single book by slug
- `POST /api/books/[slug]/download` 🔒 - Download book (auth required)

**Files:**
- `app/api/books/route.ts`
- `app/api/books/[slug]/route.ts`
- `app/api/books/[slug]/download/route.ts`

---

## Implementation Details

### Pattern Used
All routes follow this consistent pattern:

```typescript
import { NextRequest } from "next/server";
import { ControllerName } from "@/controllers";
import { requireAuth/requireAdmin } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    // 1. Authentication (if required)
    // 2. Extract params/query
    // 3. Validate input
    // 4. Call controller
    // 5. Return standardized response
  } catch (error) {
    return ApiResponse.serverError();
  }
}
```

### Controllers Used
- ✅ `CourseController` - Course operations
- ✅ `LessonController` - Lesson operations  
- ✅ `ProgressController` - Progress tracking
- ✅ `BookController` - Book operations

### Middleware Used
- ✅ `requireAuth()` - Requires authenticated user
- ✅ `requireAdmin()` - Requires admin role

### Response Helpers
- ✅ `ApiResponse.success(data)` - 200 OK
- ✅ `ApiResponse.created(data)` - 201 Created
- ✅ `ApiResponse.validationError(message)` - 400 Bad Request
- ✅ `ApiResponse.unauthorized()` - 401 Unauthorized
- ✅ `ApiResponse.forbidden()` - 403 Forbidden
- ✅ `ApiResponse.notFound()` - 404 Not Found
- ✅ `ApiResponse.serverError()` - 500 Internal Server Error

## Next.js 15+ Features

All routes use the new Next.js 15+ patterns:

```typescript
// Async params (must be awaited)
context: { params: Promise<{ slug: string }> }
const params = await context.params;

// Query parameters
const { searchParams } = new URL(req.url);
const category = searchParams.get("category");
```

## Testing Commands

```bash
# Get all courses
curl http://localhost:3000/api/courses

# Get courses by category
curl http://localhost:3000/api/courses?category=javascript

# Get specific course
curl http://localhost:3000/api/courses/javascript-basics

# Get lesson
curl http://localhost:3000/api/lessons/javascript-basics/variables

# Get all books
curl http://localhost:3000/api/books

# Get specific book
curl http://localhost:3000/api/books/clean-code

# Get user progress (requires auth cookie)
curl -H "Cookie: auth-token=YOUR_TOKEN" http://localhost:3000/api/progress

# Track progress (requires auth cookie)
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{"lessonId":"lesson-id","completed":true,"timeSpent":300,"score":85}'

# Download book (requires auth cookie)
curl -X POST http://localhost:3000/api/books/clean-code/download \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Create course (requires admin auth cookie)
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_ADMIN_TOKEN" \
  -d '{"title":"New Course","slug":"new-course","description":"Course description"}'
```

## Security

🔒 Protected routes verify authentication using Better Auth:
- Session cookie: `auth-token`
- Middleware: `requireAuth()` or `requireAdmin()`
- User info available: `user.id`, `user.email`, `user.name`, `user.role`

## Error Handling

All routes:
- ✅ Use try-catch blocks
- ✅ Validate required parameters
- ✅ Return consistent error responses
- ✅ Log errors to console
- ✅ Handle "not found" cases explicitly

## Documentation

See `README.md` in this directory for complete API documentation with examples.
