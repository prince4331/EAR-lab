# Admin Dashboard - Quick Reference

## Quick Access
🔗 **Admin URL**: http://localhost:3000/admin/login  
👤 **Username**: admin@earlab.com  
🔑 **Password**: admin123

## API Endpoints Quick Reference

### Stats & Overview
```
GET /api/admin/stats
→ Returns dashboard statistics and recent activity
```

### Blog Management
```
GET    /api/admin/blog              # List all posts
GET    /api/admin/blog?status=draft # Filter by status
POST   /api/admin/blog              # Create new post
GET    /api/admin/blog/[id]         # Get single post
PUT    /api/admin/blog/[id]         # Update post
DELETE /api/admin/blog/[id]         # Delete post
```

### Projects Management
```
GET    /api/admin/projects             # List all projects
GET    /api/admin/projects?category=embedded
POST   /api/admin/projects             # Create project
GET    /api/admin/projects/[id]        # Get single project
PUT    /api/admin/projects/[id]        # Update project
DELETE /api/admin/projects/[id]        # Delete project
```

### Contacts Management
```
GET    /api/admin/contacts           # List all contacts
GET    /api/admin/contacts?status=new
PUT    /api/admin/contacts/[id]      # Update status
DELETE /api/admin/contacts/[id]      # Delete contact
```

### Newsletter Management
```
GET    /api/admin/subscribers        # List all subscribers
DELETE /api/admin/subscribers/[id]   # Remove subscriber
```

## Common Tasks

### Create a Blog Post
```typescript
POST /api/admin/blog
{
  "title": "Your Title",
  "excerpt": "Short summary",
  "contentMarkdown": "# Content here",
  "tags": ["tag1", "tag2"],
  "status": "published",
  "readingTime": 5
}
```

### Update Contact Status
```typescript
PUT /api/admin/contacts/[id]
{
  "status": "contacted" // new | contacted | qualified | closed
}
```

### Create a Project
```typescript
POST /api/admin/projects
{
  "title": "Project Name",
  "slug": "project-name",
  "summary": "Short description",
  "contentMarkdown": "Full description",
  "category": "embedded",
  "techTags": ["Arduino", "C++"],
  "startDate": "2025-01-01",
  "isPublic": true
}
```

## Status Values

### Blog Post Status
- `draft` - Not published yet
- `published` - Visible on website

### Contact Status
- `new` - Just received (Blue badge)
- `contacted` - Initial contact made (Yellow badge)
- `qualified` - Lead qualified (Purple badge)
- `closed` - Deal completed (Green badge)

### Project Categories
- `embedded` - Embedded Systems
- `autonomy` - Autonomous Systems
- `sensors` - Sensor Integration
- `power` - Power Systems

## Database Commands

```bash
# View database in browser
npx prisma studio

# Reset database
npx prisma migrate reset

# Reseed with test data
npx tsx scripts/seed-minimal.ts

# Generate Prisma client
npx prisma generate
```

## Features Checklist

### Dashboard Overview ✅
- [x] Real-time statistics
- [x] Recent activity feed
- [x] Color-coded cards
- [x] Auto-refresh capability

### Blog Management ✅
- [x] Create posts
- [x] Edit posts
- [x] Delete posts
- [x] Search posts
- [x] Filter by status
- [x] Tag management
- [x] Markdown support

### Contact Management ✅
- [x] View submissions
- [x] Update status
- [x] Email integration
- [x] Delete contacts
- [x] Status filtering

### Newsletter Management ✅
- [x] View subscribers
- [x] Export to CSV
- [x] Search subscribers
- [x] Verification status
- [x] Delete subscribers

### Projects Management ✅
- [x] View all projects
- [x] Category badges
- [x] Tech tags display
- [x] Delete projects
- [ ] Create/Edit forms (Coming Soon)

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Toggle Sidebar | Click menu button |
| Navigate Tabs | Click tab headers |
| Search | Click search field |
| Close Dialog | ESC key |

## Color Reference

### Status Badges
```css
New Contact:      bg-blue-100 text-blue-800
Contacted:        bg-yellow-100 text-yellow-800
Qualified:        bg-purple-100 text-purple-800
Closed:           bg-green-100 text-green-800

Draft Post:       secondary variant
Published Post:   default variant

Private Project:  secondary variant
Public Project:   default variant
```

### Activity Types
```
Contact:    Green dot
Subscriber: Orange dot
Blog:       Blue dot
```

## Common HTTP Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Operation completed |
| 201 | Created | New resource created |
| 401 | Unauthorized | Login required |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Check server logs |

## Troubleshooting Quick Fixes

### Can't Login
```bash
# Check if admin user exists
npx prisma studio
# Look in User table for admin@earlab.com
```

### Data Not Loading
```bash
# Check server is running
npm run dev

# Check database connection
# Verify DATABASE_URL in .env
```

### API Returns 401
```
# You need to be logged in
# Go to /admin/login first
```

### Changes Not Saving
```
# Check browser console for errors
# Verify form validation passes
# Check network tab for API response
```

## File Locations

```
Admin Components:     src/components/admin/
Admin API Routes:     src/app/api/admin/
Admin Pages:          src/app/admin/
Database Schema:      prisma/schema.prisma
Environment Config:   .env
```

## Export Formats

### CSV Export (Subscribers)
```csv
Email,Name,Role,Company,Verified,Subscribed Date,Source
john@example.com,John Doe,Engineer,ACME,Yes,11/7/2025,website
```

## Security Notes

- All admin routes require authentication
- Only users with role="admin" can access
- Passwords are bcrypt hashed
- Sessions managed by NextAuth.js
- CSRF protection built-in

## Performance Tips

- Use search/filter instead of loading everything
- Export large datasets to CSV for offline analysis
- Pagination keeps pages fast
- Clear browser cache if UI seems slow

## Support Resources

1. Full Documentation: `ADMIN_DASHBOARD.md`
2. API Reference: See "API Endpoints" section above
3. Database Schema: `prisma/schema.prisma`
4. Code Comments: Check component files

---

**Last Updated**: November 7, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
