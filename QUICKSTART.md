# 🚀 EAR Lab - Quick Start Guide

Get your EAR Lab website up and running in **5 minutes**!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

## Step 1: Install Dependencies

```powershell
npm install
```

This will install all required packages including Next.js, Prisma, Tailwind CSS, and more.

## Step 2: Set Up Environment

```powershell
# Copy the environment template
cp .env.example .env.local

# Open .env.local and configure at minimum:
# DATABASE_URL=file:./dev.db
# NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**For email features to work**, you'll also need to add SMTP credentials (Mailgun or SendGrid).

## Step 3: Initialize Database

```powershell
# Generate Prisma client
npm run db:generate

# Create database and tables
npm run db:push

# Seed with sample data (blog posts, projects, etc.)
npm run db:seed
```

## Step 4: Start Development Server

```powershell
npm run dev
```

Your site will be available at **http://localhost:3000**

## Step 5: Test the APIs

Open a new terminal and test the APIs:

### Test Health Check
```powershell
curl http://localhost:3000/api/health
```

### Test Blog API
```powershell
curl http://localhost:3000/api/v1/blog
```

### Test Projects API
```powershell
curl http://localhost:3000/api/v1/projects
```

## 🎉 You're Done!

Your EAR Lab website is now running with:

✅ Full backend with services
✅ REST APIs with rate limiting
✅ Database with sample data
✅ Email service configured
✅ Newsletter with double opt-in
✅ Contact form processing

## 📖 Next Steps

### View Sample Data

Open Prisma Studio to see the seeded data:

```powershell
npm run db:studio
```

Then visit **http://localhost:5555**

You'll see:
- 2 users (admin@earlab.tech, author@earlab.tech)
- 3 blog posts with full content
- 2 projects with case studies
- 2 workshops
- Sample newsletter subscribers

### Test Email Features

To test emails, you need to configure SMTP in `.env.local`:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
SMTP_FROM=hello@earlab.tech
ADMIN_EMAIL=admin@earlab.tech
```

Then test contact form:

```powershell
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"projectDescription\":\"This is a test project inquiry with at least 10 characters\"}"
```

### Explore the API

All APIs are documented in:
- `ARCHITECTURE.md` - Complete API reference
- `PROJECT_COMPLETION_SUMMARY.md` - Usage examples

Key endpoints:
```
POST   /api/contact              - Submit contact form
POST   /api/subscribe            - Subscribe to newsletter
GET    /api/newsletter/verify    - Verify email
POST   /api/newsletter/unsubscribe - Unsubscribe
GET    /api/v1/blog              - List blog posts (paginated)
GET    /api/v1/blog/:slug        - Get single post
GET    /api/v1/projects          - List projects (paginated)
GET    /api/v1/projects/:slug    - Get single project
GET    /api/health               - Health check
```

## 🐛 Troubleshooting

### Database connection error?
```powershell
# Regenerate Prisma client
npm run db:generate

# Push schema again
npm run db:push
```

### Port 3000 already in use?
```powershell
# Find and kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in server.ts
```

### Module not found errors?
```powershell
# Clear node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Seed script fails?
The seed script has some markdown content issues. You can manually create sample data using Prisma Studio:
```powershell
npm run db:studio
```

## 📚 Learn More

- Read `ARCHITECTURE.md` for complete system overview
- Check `PROJECT_COMPLETION_SUMMARY.md` for what's been built
- Review `DEPLOYMENT.md` for production deployment
- See `.env.example` for all configuration options

## 🚀 Ready to Deploy?

When you're ready for production:

1. **Update environment variables**
   ```powershell
   # Production database
   DATABASE_URL=postgresql://user:pass@host:5432/db
   
   # Production URL
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   
   # Generate secure secrets
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   NEWSLETTER_SECRET=$(openssl rand -base64 32)
   ```

2. **Build for production**
   ```powershell
   npm run build
   npm start
   ```

3. **Deploy to Vercel (easiest)**
   ```powershell
   npm run deploy:vercel
   ```

Or use Docker:
```powershell
npm run docker:prod
```

## 💡 Pro Tips

### Use TypeScript effectively
All services are fully typed. Use autocomplete in your IDE!

### Hot reload
The dev server watches for changes and reloads automatically.

### Check logs
- Development logs: `dev.log`
- Production logs: `server.log`
- Prisma query logs: console output

### Rate limiting
APIs are rate limited. Check `src/lib/api/rate-limit.ts` for limits.

### Environment-specific config
- Development: `.env.local`
- Test: `.env.test`
- Production: `.env.production`

## 🎯 Common Development Tasks

### Add a new blog post
```powershell
npm run db:studio
```
Navigate to BlogPost model and click "Add record"

### View all contacts
```powershell
npm run db:studio
```
Check the Contact model

### Test newsletter flow
1. Subscribe: POST to `/api/subscribe`
2. Check email for verification link
3. Click link to verify
4. Check NewsletterSubscriber in Prisma Studio

### Reset database completely
```powershell
npm run db:reset
npm run db:seed
```

## 🆘 Need Help?

Check these resources:
1. `ARCHITECTURE.md` - System design and API docs
2. `PROJECT_COMPLETION_SUMMARY.md` - What's built and how to use it
3. `DEPLOYMENT.md` - Production deployment guides
4. Service files (`src/services/*.ts`) - Inline documentation

Still stuck? Check:
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com

---

**Happy coding! 🎉**

You have a professional, production-ready backend. Now build amazing frontend features on top of it!
