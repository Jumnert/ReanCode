# Backend Architecture - Learning Platform

## 🏗️ MVC Architecture

```
src/
├── config/          # Configuration (DB, Redis, Auth, Cloudinary)
├── controllers/     # Business logic layer
├── services/        # Data access layer
├── middleware/      # Auth, validation, etc.
├── utils/           # Helpers (response, validation)
└── types/           # TypeScript types

app/api/             # Next.js API routes (thin wrappers)
```

## 📊 Database Schema

**Models**: User, Session, Account, Course, Lesson, CodeExample, Exercise, Quiz, UserProgress, Bookmark, Book, BookDownload, Comment, Solution, CodeSnippet, Achievement

See `prisma/schema.prisma` for full schema.

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in all values (see `.env.example` comments).

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

## 📡 API Routes

### Authentication

- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get session

### Courses

- `GET /api/courses` - List all courses (query: `category`)
- `GET /api/courses/[slug]` - Get single course
- `POST /api/courses` - Create course (admin)
- `PATCH /api/courses/[slug]` - Update course (admin)
- `DELETE /api/courses/[slug]` - Delete course (admin)

### Lessons

- `GET /api/lessons/[courseSlug]/[lessonSlug]` - Get lesson
- `POST /api/lessons` - Create lesson (admin)
- `PATCH /api/lessons/[id]` - Update lesson (admin)

### Progress

- `GET /api/progress` - Get user progress (auth)
- `POST /api/progress` - Track progress (auth)
- `GET /api/progress/course/[courseId]` - Course progress (auth)

### Books

- `GET /api/books` - List books (query: `category`)
- `GET /api/books/[slug]` - Get book details
- `POST /api/books/[slug]/download` - Download book (auth)

### User

- `GET /api/user` - Get current user (auth)
- `PATCH /api/user` - Update profile (auth)
- `GET /api/user/preferences` - Get preferences (auth)
- `PATCH /api/user/preferences` - Update preferences (auth)

See `app/api/README.md` for full API documentation.

## 🎯 MVC Pattern Example

### 1. Service Layer (Data Access)

```typescript
// src/services/course.service.ts
export class CourseService {
  static async getAll(category?: string) {
    return prisma.course.findMany({
      where: { published: true, ...(category && { category }) },
    });
  }
}
```

### 2. Controller Layer (Business Logic)

```typescript
// src/controllers/course.controller.ts
export class CourseController {
  static async getAllCourses(category?: string) {
    try {
      const courses = await CourseService.getAll(category);
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error: "Failed to fetch courses" };
    }
  }
}
```

### 3. API Route (HTTP Handler)

```typescript
// app/api/courses/route.ts
export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const result = await CourseController.getAllCourses(category);
  
  if (result.success) {
    return ApiResponse.success(result.data);
  }
  return ApiResponse.error(result.error);
}
```

## 🔐 Authentication

Using **Better Auth** with:
- Email/password
- Google OAuth
- GitHub OAuth

### Protect Routes

```typescript
import { requireAuth } from "@/middleware/auth.middleware";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if (authResult instanceof NextResponse) return authResult;
  
  const { user } = authResult;
  // Use user.id, user.email, user.role
}
```

### Require Admin

```typescript
import { requireAdmin } from "@/middleware/auth.middleware";

export async function DELETE(req: NextRequest) {
  const authResult = await requireAdmin(req);
  if (authResult instanceof NextResponse) return authResult;
  
  // Admin-only logic
}
```

## 💾 Caching Strategy

Using **Redis (Upstash)** for:

- Lesson content (1 hour TTL)
- Course lists (1 hour TTL)
- User progress (5 min TTL)
- View counts (aggregated batch updates)
- Learning streaks
- Leaderboards

### Cache Example

```typescript
const cacheKey = CacheKeys.lesson(slug);
const cached = await redis.get(cacheKey);

if (cached) return JSON.parse(cached);

const data = await prisma.lesson.findUnique({ ... });
await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(data));
```

## 📧 Email Service

Using **Nodemailer + Gmail SMTP**:

```typescript
import EmailService from "@/services/email.service";

await EmailService.sendWelcome(email, name);
await EmailService.sendVerification(email, token);
await EmailService.sendPasswordReset(email, token);
await EmailService.sendCourseCompletion(email, courseName);
```

## ☁️ File Uploads

Using **Cloudinary** for:
- User avatars (400x400)
- Profile banners (1200x300)
- Book covers (400x600)
- PDF books (raw upload)

### Upload Example

```typescript
import { uploadAvatar } from "@/config/cloudinary";

const result = await uploadAvatar(file, userId);
const avatarUrl = result.secure_url;
```

## 🧪 Testing Routes

### With curl

```bash
# Get courses
curl http://localhost:3000/api/courses

# Get specific course
curl http://localhost:3000/api/courses/html-basics

# Track progress (requires auth token)
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{"lessonId":"lesson_123","completed":true,"timeSpent":300}'
```

### With Postman/Insomnia

Import `postman_collection.json` (create this for your team).

## 🚀 Deployment

### Environment Variables

Set all env vars in:
- **Vercel**: Project Settings → Environment Variables
- **Railway**: Variables tab
- **Render**: Environment section

### Database Migrations

```bash
# Production migration
npx prisma migrate deploy
```

### Build

```bash
npm run build
```

## 📁 Project Structure

```
Rean2Code-Web/
├── app/
│   ├── api/              # API routes
│   ├── (auth)/           # Auth pages
│   ├── (learn)/          # Learning pages
│   └── (marketing)/      # Landing pages
├── src/
│   ├── config/           # Config files
│   │   ├── env.ts
│   │   ├── prisma.ts
│   │   ├── redis.ts
│   │   ├── auth.ts
│   │   └── cloudinary.ts
│   ├── controllers/      # Controllers
│   │   ├── course.controller.ts
│   │   ├── lesson.controller.ts
│   │   ├── progress.controller.ts
│   │   ├── book.controller.ts
│   │   └── user.controller.ts
│   ├── services/         # Services
│   │   ├── course.service.ts
│   │   ├── lesson.service.ts
│   │   ├── progress.service.ts
│   │   ├── book.service.ts
│   │   ├── user.service.ts
│   │   └── email.service.ts
│   ├── middleware/       # Middleware
│   │   └── auth.middleware.ts
│   ├── utils/            # Utilities
│   │   ├── response.ts
│   │   └── validation.ts
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── .env.example          # Environment template
└── BACKEND_README.md     # This file
```

## 🔍 Debugging

### Check Database Connection

```bash
npx prisma studio
```

### Check Redis Connection

```typescript
import { redis } from "@/config/redis";
await redis.ping(); // Should return "PONG"
```

### View Logs

```bash
# Development
npm run dev

# Check Prisma queries
# Set: log: ["query"] in prisma.ts
```

## 🤝 Contributing

1. Follow MVC pattern
2. Add JSDoc comments to controllers
3. Use TypeScript strictly
4. Test API routes before committing
5. Update this README when adding features

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Better Auth Docs](https://better-auth.com)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Upstash Redis](https://upstash.com/docs/redis)
- [Cloudinary API](https://cloudinary.com/documentation)

---

**Note**: This is an open-source project. Clean code and clear documentation is essential.
