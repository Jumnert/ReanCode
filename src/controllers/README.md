# MVC Controllers

This directory contains all MVC controllers for the Rean2Code-Web application. Controllers act as an intermediary layer between routes/API handlers and services, providing standardized error handling and response formatting.

## Architecture

```
Route/API Handler → Controller → Service → Database
```

All controllers follow these principles:
- **Class-based** with static methods
- **Standardized responses**: `{ success: boolean, data?: any, error?: string }`
- **Comprehensive error handling**: try/catch blocks with detailed logging
- **Input validation**: Check for required parameters before calling services
- **Type-safe**: Uses Prisma types for data operations

## Available Controllers

### 1. CourseController (`course.controller.ts`)

Manages course-related operations.

**Methods:**
```typescript
// Get all courses (with optional category filter)
static async getAllCourses(category?: string): Promise<ControllerResponse>

// Get a single course by slug
static async getCourseBySlug(slug: string): Promise<ControllerResponse>

// Create a new course (admin only)
static async createCourse(data: Prisma.CourseCreateInput): Promise<ControllerResponse>

// Update an existing course (admin only)
static async updateCourse(id: string, data: Prisma.CourseUpdateInput): Promise<ControllerResponse>

// Delete a course (admin only)
static async deleteCourse(id: string): Promise<ControllerResponse>

// Get all course categories
static async getCategories(): Promise<ControllerResponse>
```

**Example Usage:**
```typescript
import { CourseController } from '@/controllers';

// In your API route or handler
const result = await CourseController.getAllCourses('javascript');
if (result.success) {
  return Response.json(result.data);
} else {
  return Response.json({ error: result.error }, { status: 500 });
}
```

### 2. LessonController (`lesson.controller.ts`)

Manages lesson-related operations.

**Methods:**
```typescript
// Get a lesson by course slug and lesson slug
static async getLesson(courseSlug: string, lessonSlug: string): Promise<ControllerResponse>

// Create a new lesson (admin only)
static async createLesson(data: Prisma.LessonCreateInput): Promise<ControllerResponse>

// Update an existing lesson (admin only)
static async updateLesson(id: string, data: Prisma.LessonUpdateInput): Promise<ControllerResponse>

// Delete a lesson (admin only)
static async deleteLesson(id: string): Promise<ControllerResponse>

// Get adjacent lessons (previous and next)
static async getAdjacentLessons(courseId: string, currentOrder: number): Promise<ControllerResponse>
```

**Example Usage:**
```typescript
import { LessonController } from '@/controllers';

const result = await LessonController.getLesson('javascript-basics', 'variables');
if (result.success) {
  const lesson = result.data;
  // ... use lesson data
}
```

### 3. ProgressController (`progress.controller.ts`)

Manages user progress tracking.

**Methods:**
```typescript
// Track user progress for a lesson
static async trackProgress(
  userId: string,
  lessonId: string,
  data: ProgressData
): Promise<ControllerResponse>

// Get user's overall progress summary
static async getUserProgress(userId: string): Promise<ControllerResponse>

// Get user's progress for a specific course
static async getCourseProgress(userId: string, courseId: string): Promise<ControllerResponse>

// Get user's learning streak
static async getUserStreak(userId: string): Promise<ControllerResponse>
```

**ProgressData Type:**
```typescript
type ProgressData = {
  completed?: boolean;
  timeSpent?: number;
  score?: number;
};
```

**Example Usage:**
```typescript
import { ProgressController } from '@/controllers';

// Track that a user completed a lesson
const result = await ProgressController.trackProgress(
  'user-123',
  'lesson-456',
  { completed: true, timeSpent: 1800 }
);

// Get user's overall progress
const progressResult = await ProgressController.getUserProgress('user-123');
if (progressResult.success) {
  console.log('Completion rate:', progressResult.data.completionRate);
}
```

### 4. BookController (`book.controller.ts`)

Manages e-book operations.

**Methods:**
```typescript
// Get all books (with optional category filter)
static async getAllBooks(category?: string): Promise<ControllerResponse>

// Get a single book by slug
static async getBookBySlug(slug: string): Promise<ControllerResponse>

// Track book download for a user
static async downloadBook(userId: string, bookId: string): Promise<ControllerResponse>

// Get user's downloaded books
static async getUserDownloads(userId: string): Promise<ControllerResponse>

// Get all book categories
static async getCategories(): Promise<ControllerResponse>

// Search books by query
static async searchBooks(query: string): Promise<ControllerResponse>
```

**Example Usage:**
```typescript
import { BookController } from '@/controllers';

// Download a book
const result = await BookController.downloadBook('user-123', 'book-456');
if (result.success) {
  const { pdfUrl, alreadyDownloaded } = result.data;
  // ... provide download link
}

// Search books
const searchResult = await BookController.searchBooks('react hooks');
```

## Response Format

All controller methods return a standardized `ControllerResponse`:

**Success Response:**
```typescript
{
  success: true,
  data: <result data>
}
```

**Error Response:**
```typescript
{
  success: false,
  error: "Error message"
}
```

## Error Handling

Each controller method:
1. Wraps operations in try/catch blocks
2. Validates required parameters before processing
3. Logs errors to console with context
4. Returns user-friendly error messages
5. Never exposes sensitive error details

## Integration with API Routes

### Next.js App Router (Recommended)

```typescript
// app/api/courses/route.ts
import { CourseController } from '@/controllers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category') || undefined;
  const result = await CourseController.getAllCourses(category);
  
  if (!result.success) {
    return Response.json(
      { error: result.error },
      { status: 500 }
    );
  }
  
  return Response.json(result.data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await CourseController.createCourse(body);
    
    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    return Response.json(result.data, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
```

### Server Actions

```typescript
// app/actions/courses.ts
'use server';

import { CourseController } from '@/controllers';
import { revalidatePath } from 'next/cache';

export async function getCourses(category?: string) {
  const result = await CourseController.getAllCourses(category);
  return result;
}

export async function createCourse(formData: FormData) {
  // Extract and validate form data
  const courseData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    // ... other fields
  };
  
  const result = await CourseController.createCourse(courseData);
  
  if (result.success) {
    revalidatePath('/admin/courses');
  }
  
  return result;
}
```

## Best Practices

1. **Always check `result.success`** before accessing `result.data`
2. **Validate user input** in API routes before calling controllers
3. **Handle authentication** in routes/middleware, not in controllers
4. **Log errors** at the controller level for debugging
5. **Use TypeScript types** from Prisma for type safety
6. **Keep controllers thin** - business logic belongs in services

## Adding New Controllers

When adding a new controller:

1. Create the controller file: `<name>.controller.ts`
2. Follow the existing pattern (class with static methods)
3. Implement standardized error handling
4. Return `ControllerResponse` type
5. Add JSDoc comments for all methods
6. Export the controller in `index.ts`

Example template:
```typescript
import { ServiceName } from '@/services/<name>.service';

type ControllerResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export class NewController {
  static async methodName(params: any): Promise<ControllerResponse> {
    try {
      const result = await ServiceName.methodName(params);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error in methodName:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Operation failed',
      };
    }
  }
}
```

## Testing

Controllers can be tested independently:

```typescript
// __tests__/controllers/course.controller.test.ts
import { CourseController } from '@/controllers';
import { CourseService } from '@/services/course.service';

jest.mock('@/services/course.service');

describe('CourseController', () => {
  it('should return courses successfully', async () => {
    const mockCourses = [{ id: '1', title: 'Test Course' }];
    (CourseService.getAll as jest.Mock).mockResolvedValue(mockCourses);
    
    const result = await CourseController.getAllCourses();
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockCourses);
  });
  
  it('should handle errors gracefully', async () => {
    (CourseService.getAll as jest.Mock).mockRejectedValue(new Error('DB Error'));
    
    const result = await CourseController.getAllCourses();
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('DB Error');
  });
});
```

## Notes

- Controllers are **stateless** - no instance properties
- All methods are **async** since they interact with services
- Controllers **don't handle authentication** - use middleware
- Controllers **don't perform authorization** checks - delegate to services or middleware
- Use controllers in **API routes, Server Actions, and Server Components**

## Related Documentation

- [Services Documentation](../services/README.md)
- [API Routes](../../app/api/README.md)
- [Prisma Schema](../../prisma/schema.prisma)
