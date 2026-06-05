# API Routes Documentation

This directory contains all the API routes for the Rean2Code application following the MVC pattern.

## Architecture

- **Controllers** (`src/controllers/`): Handle business logic
- **Services** (`src/services/`): Handle database operations
- **Middleware** (`src/middleware/`): Handle authentication and authorization
- **Utils** (`src/utils/`): Helper functions and response formatters

## Authentication

Routes that require authentication use the following middleware:
- `requireAuth`: Requires user to be logged in
- `requireAdmin`: Requires user to be logged in with admin role

## API Endpoints

### Courses

#### `GET /api/courses`
Get all courses with optional category filter.

**Query Parameters:**
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "category": "string",
      "level": "string",
      "duration": "number",
      "lessons": []
    }
  ]
}
```

#### `POST /api/courses` 🔒 Admin
Create a new course.

**Headers:**
- `Cookie: auth-token=<token>` (admin role required)

**Body:**
```json
{
  "title": "string",
  "slug": "string",
  "description": "string",
  "category": "string",
  "level": "string",
  "duration": "number"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    ...
  }
}
```

#### `GET /api/courses/[slug]`
Get a single course by slug.

**Parameters:**
- `slug`: Course slug

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "slug": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "duration": "number",
    "lessons": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "order": "number"
      }
    ]
  }
}
```

---

### Lessons

#### `GET /api/lessons/[courseSlug]/[lessonSlug]`
Get a specific lesson.

**Parameters:**
- `courseSlug`: Course slug
- `lessonSlug`: Lesson slug

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "slug": "string",
    "content": "string",
    "order": "number",
    "duration": "number",
    "courseId": "string",
    "course": {
      "id": "string",
      "title": "string",
      "slug": "string"
    }
  }
}
```

---

### Progress

#### `POST /api/progress` 🔒 Auth
Track user progress for a lesson.

**Headers:**
- `Cookie: auth-token=<token>` (authentication required)

**Body:**
```json
{
  "lessonId": "string",
  "completed": "boolean",
  "timeSpent": "number",
  "score": "number"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "lessonId": "string",
    "completed": "boolean",
    "timeSpent": "number",
    "score": "number",
    "updatedAt": "string"
  }
}
```

#### `GET /api/progress` 🔒 Auth
Get user's overall progress.

**Headers:**
- `Cookie: auth-token=<token>` (authentication required)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLessonsCompleted": "number",
    "totalTimeSpent": "number",
    "averageScore": "number",
    "courses": [
      {
        "courseId": "string",
        "courseTitle": "string",
        "lessonsCompleted": "number",
        "totalLessons": "number",
        "progress": "number"
      }
    ]
  }
}
```

---

### Books

#### `GET /api/books`
Get all books with optional category filter.

**Query Parameters:**
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "author": "string",
      "category": "string",
      "coverImage": "string",
      "pdfUrl": "string",
      "pages": "number",
      "publishedYear": "number"
    }
  ]
}
```

#### `GET /api/books/[slug]`
Get a single book by slug.

**Parameters:**
- `slug`: Book slug

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "slug": "string",
    "description": "string",
    "author": "string",
    "category": "string",
    "coverImage": "string",
    "pdfUrl": "string",
    "pages": "number",
    "publishedYear": "number"
  }
}
```

#### `POST /api/books/[slug]/download` 🔒 Auth
Track and initiate book download.

**Headers:**
- `Cookie: auth-token=<token>` (authentication required)

**Parameters:**
- `slug`: Book slug

**Response:**
```json
{
  "success": true,
  "data": {
    "pdfUrl": "string",
    "alreadyDownloaded": "boolean",
    "book": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "category": "string"
    }
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "details": {} // Optional
}
```

### HTTP Status Codes

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request that creates a resource
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Usage Examples

### Fetch all courses
```javascript
const response = await fetch('/api/courses');
const { success, data } = await response.json();
```

### Fetch courses by category
```javascript
const response = await fetch('/api/courses?category=javascript');
const { success, data } = await response.json();
```

### Get a specific course
```javascript
const response = await fetch('/api/courses/javascript-basics');
const { success, data } = await response.json();
```

### Track lesson progress (authenticated)
```javascript
const response = await fetch('/api/progress', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify({
    lessonId: 'lesson-id',
    completed: true,
    timeSpent: 300,
    score: 85
  })
});
const { success, data } = await response.json();
```

### Download a book (authenticated)
```javascript
const response = await fetch('/api/books/clean-code/download', {
  method: 'POST',
  credentials: 'include', // Include cookies
});
const { success, data } = await response.json();

// Redirect to PDF URL or open in new tab
if (success) {
  window.open(data.pdfUrl, '_blank');
}
```

## Testing

You can test these routes using:
- **Postman** or **Insomnia**: Import the endpoints
- **cURL**: Command-line testing
- **Browser DevTools**: Network tab for debugging

### Example cURL Commands

```bash
# Get all courses
curl http://localhost:3000/api/courses

# Get courses by category
curl http://localhost:3000/api/courses?category=javascript

# Get a specific course
curl http://localhost:3000/api/courses/javascript-basics

# Create a course (requires admin auth)
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{"title":"New Course","slug":"new-course","description":"Description"}'

# Track progress (requires auth)
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{"lessonId":"lesson-id","completed":true,"timeSpent":300,"score":85}'
```

## Development Notes

1. **Next.js 15+ Params**: Route parameters are now async and must be awaited
2. **Middleware Pattern**: Auth middleware returns either a Response (error) or user data object
3. **Error Handling**: All routes use try-catch with ApiResponse helpers
4. **Validation**: Input validation happens at the route level before calling controllers
5. **TypeScript**: All routes are fully typed with proper type inference
