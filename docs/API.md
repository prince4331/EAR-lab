# API Documentation - EAR Lab

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most public APIs don't require authentication. Admin APIs (future implementation) will require authentication via NextAuth.js.

## Rate Limiting

All endpoints are rate limited. Rate limit information is returned in response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 2024-11-07T12:00:00.000Z
```

Rate limits by endpoint type:
- **Public read (blog, projects)**: 120 requests/minute
- **Form submissions (contact)**: 5 requests/minute
- **Newsletter subscription**: 3 requests/hour
- **Authentication**: 5 requests/15 minutes

## Response Format

All API responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": {
    "field": ["Validation error 1", "Validation error 2"]
  }
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful with no content
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

---

## Endpoints

### Health Check

Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-11-07T12:00:00.000Z"
  }
}
```

---

### Contact Form

Submit a contact form inquiry.

**Endpoint:** `POST /api/contact`

**Rate Limit:** 5 requests/minute

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "projectDescription": "We need autonomous robots for warehouse operations",
  "budgetRange": "$50k-$100k",
  "timeline": "Q2 2025",
  "fileUrl": "https://example.com/file.pdf" // Optional
}
```

**Validation Rules:**
- `name`: min 2 characters, max 100
- `email`: valid email address
- `company`: optional, max 100 characters
- `projectDescription`: min 10 characters, max 2000
- `budgetRange`: optional
- `timeline`: optional
- `fileUrl`: optional, must be valid URL

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "contactId": "clx123abc..."
  },
  "message": "Thank you for contacting us! We will respond within 2 business days."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email address"],
    "projectDescription": ["Project description must be at least 10 characters"]
  }
}
```

**What Happens:**
1. Contact saved to database
2. Email notification sent to admin
3. Confirmation email sent to user
4. Audit log created

---

### Newsletter Subscription

Subscribe to the EAR Lab newsletter with double opt-in.

**Endpoint:** `POST /api/subscribe`

**Rate Limit:** 3 requests/hour

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "Jane Smith", // Optional
  "role": "Engineer", // Optional
  "company": "Robotics Inc", // Optional
  "source": "website" // Optional, default: "website"
}
```

**Validation Rules:**
- `email`: valid email address (required)
- `name`: min 2 characters, max 100 (optional)
- `role`: max 100 characters (optional)
- `company`: max 100 characters (optional)
- `source`: max 50 characters (optional)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "requiresVerification": true
  },
  "message": "Please check your email to verify your subscription."
}
```

**Already Subscribed (200):**
```json
{
  "success": false,
  "message": "This email is already subscribed to our newsletter."
}
```

**What Happens:**
1. Subscriber created with `isVerified: false`
2. Verification email sent with secure token
3. Token expires in 24 hours

---

### Newsletter Verification

Verify email subscription via token link.

**Endpoint:** `GET /api/newsletter/verify?token={token}`

**Query Parameters:**
- `token`: Verification token from email (required)

**Success:** Redirects to `/subscribe?verified=true`

**Error:** Redirects to `/subscribe?error=verification_failed`

**What Happens:**
1. Token validated and decoded
2. Subscriber marked as verified
3. Welcome email sent
4. Redirect to success page

---

### Newsletter Unsubscribe

Unsubscribe from the newsletter.

**Endpoint:** `POST /api/newsletter/unsubscribe`

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "You have been successfully unsubscribed."
}
```

**Not Found (200):**
```json
{
  "success": false,
  "message": "Email not found in our newsletter list."
}
```

---

### Blog Posts - List

Get published blog posts with pagination and search.

**Endpoint:** `GET /api/v1/blog`

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search in title, excerpt, content (optional)
- `sort`: Sort field (optional)
- `order`: Sort order - "asc" or "desc" (default: "desc")

**Example:**
```
GET /api/v1/blog?page=1&limit=5&search=autonomy
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123...",
      "title": "How to Architect a Modular Autonomy Stack",
      "slug": "modular-autonomy-stack-warehouse-robots",
      "excerpt": "Learn about designing scalable...",
      "tags": ["Autonomy", "Robotics", "Architecture"],
      "status": "published",
      "readingTime": 12,
      "featuredImage": "https://...",
      "publishedAt": "2024-10-15T00:00:00.000Z",
      "createdAt": "2024-10-10T00:00:00.000Z",
      "updatedAt": "2024-10-15T00:00:00.000Z",
      "author": {
        "id": "clx456...",
        "name": "Dr. Sarah Chen",
        "email": "author@earlab.tech"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 25,
    "totalPages": 5
  }
}
```

---

### Blog Posts - Single

Get a single blog post by slug with related posts.

**Endpoint:** `GET /api/v1/blog/:slug`

**Path Parameters:**
- `slug`: URL-friendly post identifier

**Example:**
```
GET /api/v1/blog/modular-autonomy-stack-warehouse-robots
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "post": {
      "id": "clx123...",
      "title": "How to Architect a Modular Autonomy Stack",
      "slug": "modular-autonomy-stack-warehouse-robots",
      "excerpt": "Learn about designing scalable...",
      "contentMarkdown": "# Full markdown content...",
      "tags": ["Autonomy", "Robotics"],
      "status": "published",
      "readingTime": 12,
      "featuredImage": "https://...",
      "publishedAt": "2024-10-15T00:00:00.000Z",
      "createdAt": "2024-10-10T00:00:00.000Z",
      "updatedAt": "2024-10-15T00:00:00.000Z",
      "author": {
        "id": "clx456...",
        "name": "Dr. Sarah Chen",
        "email": "author@earlab.tech"
      }
    },
    "relatedPosts": [
      {
        "id": "clx789...",
        "title": "Related Post 1",
        "slug": "related-post-1",
        "excerpt": "...",
        "tags": ["Autonomy"],
        "readingTime": 10,
        "publishedAt": "2024-11-01T00:00:00.000Z"
      }
    ]
  }
}
```

**Not Found (404):**
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

---

### Projects - List

Get public projects with pagination, search, and category filtering.

**Endpoint:** `GET /api/v1/projects`

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search in title, summary, content (optional)
- `category`: Filter by category - "embedded", "autonomy", "sensors", or "power" (optional)
- `sort`: Sort field (optional)
- `order`: Sort order - "asc" or "desc" (default: "desc")

**Example:**
```
GET /api/v1/projects?page=1&limit=10&category=autonomy
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123...",
      "title": "Autonomous Warehouse AMR Fleet",
      "slug": "autonomous-warehouse-amr-fleet",
      "summary": "Complete autonomy stack for 20 warehouse robots...",
      "techTags": ["ROS2", "Python", "SLAM", "Fleet Management"],
      "featuredImage": "https://...",
      "startDate": "2023-06-01T00:00:00.000Z",
      "endDate": "2024-03-01T00:00:00.000Z",
      "clientName": "LogiTech Solutions",
      "isPublic": true,
      "category": "autonomy",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2024-03-01T00:00:00.000Z",
      "caseStudy": {
        "id": "clx789...",
        "pdfUrl": "https://...",
        "createdAt": "2024-03-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

### Projects - Single

Get a single project by slug.

**Endpoint:** `GET /api/v1/projects/:slug`

**Path Parameters:**
- `slug`: URL-friendly project identifier

**Example:**
```
GET /api/v1/projects/autonomous-warehouse-amr-fleet
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "clx123...",
      "title": "Autonomous Warehouse AMR Fleet",
      "slug": "autonomous-warehouse-amr-fleet",
      "summary": "Complete autonomy stack...",
      "contentMarkdown": "# Full markdown content...",
      "techTags": ["ROS2", "Python", "SLAM"],
      "featuredImage": "https://...",
      "startDate": "2023-06-01T00:00:00.000Z",
      "endDate": "2024-03-01T00:00:00.000Z",
      "clientName": "LogiTech Solutions",
      "isPublic": true,
      "category": "autonomy",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2024-03-01T00:00:00.000Z",
      "caseStudy": {
        "id": "clx789...",
        "pdfUrl": "https://example.com/case-study.pdf",
        "createdAt": "2024-03-01T00:00:00.000Z"
      }
    }
  }
}
```

**Not Found (404):**
```json
{
  "success": false,
  "error": "Project not found"
}
```

---

## Error Handling

### Validation Errors (400)

When request data fails validation:

```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email address"],
    "name": ["Name must be at least 2 characters"],
    "projectDescription": ["Project description must be at least 10 characters"]
  }
}
```

### Rate Limit Exceeded (429)

When too many requests are made:

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

Headers:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2024-11-07T12:05:00.000Z
```

### Server Error (500)

When an unexpected error occurs:

```json
{
  "success": false,
  "error": "Internal server error"
}
```

In development mode, you'll also see:
```json
{
  "success": false,
  "error": "Detailed error message",
  "stack": "Error stack trace..."
}
```

---

## Code Examples

### JavaScript/TypeScript (fetch)

```typescript
// Contact form submission
const submitContact = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Contact submitted:', result.data.contactId);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Newsletter subscription
const subscribe = async (email, name) => {
  const response = await fetch('http://localhost:3000/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });
  
  const result = await response.json();
  return result;
};

// Fetch blog posts
const fetchBlogPosts = async (page = 1, search = '') => {
  const params = new URLSearchParams({ page, limit: 10, search });
  const response = await fetch(`http://localhost:3000/api/v1/blog?${params}`);
  const result = await response.json();
  return result.data; // Array of posts
};
```

### Python (requests)

```python
import requests

# Contact form submission
def submit_contact(data):
    response = requests.post(
        'http://localhost:3000/api/contact',
        json=data
    )
    return response.json()

# Newsletter subscription
def subscribe(email, name):
    response = requests.post(
        'http://localhost:3000/api/subscribe',
        json={'email': email, 'name': name}
    )
    return response.json()

# Fetch blog posts
def fetch_blog_posts(page=1, search=''):
    response = requests.get(
        'http://localhost:3000/api/v1/blog',
        params={'page': page, 'limit': 10, 'search': search}
    )
    return response.json()['data']
```

### cURL

```bash
# Contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","projectDescription":"Need warehouse robots"}'

# Newsletter subscription
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@example.com","name":"Jane"}'

# Fetch blog posts
curl "http://localhost:3000/api/v1/blog?page=1&limit=5"

# Fetch single post
curl "http://localhost:3000/api/v1/blog/modular-autonomy-stack-warehouse-robots"

# Fetch projects
curl "http://localhost:3000/api/v1/projects?category=autonomy"
```

---

## Testing

Use the provided examples to test all endpoints. For development, you can use:

- **Postman** - Import the endpoints and test
- **Thunder Client** (VS Code) - Lightweight API testing
- **curl** - Command line testing
- **Browser DevTools** - For GET requests

---

## Changelog

### v0.1.0 (Current)
- Initial API implementation
- Contact form endpoint
- Newsletter with double opt-in
- Blog posts API (list, single)
- Projects API (list, single)
- Health check endpoint
- Rate limiting
- Input validation
- Standard response format

---

For more information, see:
- `ARCHITECTURE.md` - System architecture
- `PROJECT_COMPLETION_SUMMARY.md` - Implementation details
- `QUICKSTART.md` - Quick setup guide
