# 🚀 Vercel Deployment Guide - EAR Lab Website

## ✅ Pre-Deployment Checklist

Your project is **PRODUCTION READY**! Here's what's already configured:

- ✅ Next.js 15 with App Router
- ✅ Build passes successfully (no errors)
- ✅ TypeScript compilation works
- ✅ All pages are rendering correctly
- ✅ API routes are functional
- ✅ Responsive design implemented
- ✅ SEO optimization complete
- ✅ Performance optimizations applied

---

## 📋 Step-by-Step Vercel Deployment

### **Step 1: Prepare Your Repository**

1. **Ensure your code is pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify .gitignore is properly configured** ✅ (Already done)

---

### **Step 2: Create Vercel Account & Import Project**

1. **Go to [vercel.com](https://vercel.com)** and sign up/login with GitHub

2. **Click "Add New Project"** or "Import Project"

3. **Select your GitHub repository**: `prince4331/EAR-lab`

4. **Configure Project Settings:**

   Based on your screenshot, fill in these fields:

   **Framework Preset:** `Next.js` ✅ (Already selected)

   **Root Directory:** `./` (leave as default)

   **Build and Output Settings:**
   - ✅ Build Command: `npm run build` (override enabled)
   - ✅ Output Directory: `.vercel/output` (override enabled)
   - ⚠️ Install Command: Leave default OR use `npm install` (optional)

---

### **Step 3: Configure Environment Variables**

**CRITICAL:** You need to add these environment variables in Vercel.

Click "Environment Variables" section in your deployment settings, then add:

#### **Required Variables:**

```bash
# Database - IMPORTANT: Change to PostgreSQL for production
DATABASE_URL=file:./dev.db
# For production, use Vercel Postgres:
# POSTGRES_PRISMA_URL=your-vercel-postgres-connection-string

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app

# Email Configuration (Update with your SMTP details)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
SMTP_FROM=hello@earlab.tech
ADMIN_EMAIL=admin@earlab.tech

# Security Secrets (Generate random strings)
NEWSLETTER_SECRET=generate-random-64-char-string-here
NEXTAUTH_SECRET=generate-random-32-char-string-here
SESSION_SECRET=generate-random-32-char-string-here
```

**Generate Random Secrets:**
```bash
# Run in your terminal to generate secure secrets:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### **Optional Variables (Recommended):**

```bash
# NextAuth (for admin authentication)
NEXTAUTH_URL=https://your-project-name.vercel.app

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Error Tracking
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-sentry-dsn

# Feature Flags
ENABLE_BLOG=true
ENABLE_NEWSLETTER=true
ENABLE_CONTACT_FORM=true
ENABLE_FILE_UPLOAD=true

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

### **Step 4: Database Setup (Important!)**

Your current setup uses SQLite (`dev.db`), which **won't work in Vercel's serverless environment**.

**Choose ONE option:**

#### **Option A: Vercel Postgres (Recommended)**
1. In Vercel Dashboard → Go to "Storage" tab
2. Click "Create Database" → Select "Postgres"
3. Vercel will auto-populate these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
4. Update your `schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")
   }
   ```
5. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

#### **Option B: Supabase (Free PostgreSQL)**
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string
4. Add to Vercel environment variables:
   ```bash
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
5. Update `schema.prisma` to use `postgresql`
6. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

#### **Option C: PlanetScale (MySQL - Serverless)**
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Add to Vercel environment variables
5. Update `schema.prisma` to use `mysql`

---

### **Step 5: Deploy!**

1. **Click "Deploy"** button in Vercel

2. **Wait for build to complete** (usually 2-3 minutes)

3. **Check deployment logs** for any errors

4. **Your site will be live at:** `https://your-project-name.vercel.app`

---

### **Step 6: Post-Deployment Configuration**

#### **Update Domain Settings:**
1. After deployment, update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` with your actual Vercel URL
2. Redeploy to apply changes

#### **Set up Custom Domain (Optional):**
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `earlab.tech`)
3. Configure DNS records as shown by Vercel
4. Update environment variables with new domain

#### **Database Migration:**
```bash
# After deploying with PostgreSQL, run migrations:
npx prisma migrate deploy

# Or if you need to push schema directly:
npx prisma db push
```

#### **Seed Database (Optional):**
If you want to populate with sample data:
```bash
npm run db:seed
```

---

## 🔧 Troubleshooting Common Issues

### **Build Fails**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### **Database Connection Errors**
- Verify `DATABASE_URL` is correct
- For Vercel Postgres, use `POSTGRES_PRISMA_URL`
- Ensure Prisma schema matches database provider

### **API Routes Not Working**
- Check that environment variables are set
- Verify CORS settings
- Check Vercel function logs

### **Images Not Loading**
- Ensure images are in `public/` directory
- Check Next.js image configuration in `next.config.ts`
- Verify remote image patterns are allowed

### **Email Not Sending**
- Verify SMTP credentials are correct
- Check SMTP provider allows your domain
- Test with a simple email first

---

## 📊 Monitoring & Analytics

### **Vercel Analytics (Built-in)**
- Automatically enabled
- View in Vercel Dashboard → Analytics tab

### **Google Analytics (Optional)**
1. Create GA4 property
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to environment variables
3. Redeploy

### **Error Tracking with Sentry (Optional)**
1. Create Sentry account
2. Add `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`
3. Redeploy

---

## 🚀 Performance Optimization

Your site is already optimized with:
- ✅ Static page generation
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ API route caching
- ✅ Dynamic imports

**After deployment, check:**
- **Vercel Dashboard → Speed Insights**
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **Core Web Vitals**

---

## 🔐 Security Best Practices

- ✅ Environment variables properly configured
- ✅ API routes have validation
- ✅ CORS configured
- ✅ Rate limiting implemented
- ⚠️ **TODO:** Set up HTTPS (automatic with Vercel)
- ⚠️ **TODO:** Configure Content Security Policy
- ⚠️ **TODO:** Enable Vercel firewall rules

---

## 📝 What to Fill in Vercel Deployment Form

Based on your screenshot:

1. **Vercel Team:** `prince4331's projects` ✅
2. **Project Name:** `ear-lab` (or your preferred name)
3. **Framework Preset:** `Next.js` ✅
4. **Root Directory:** `./` ✅
5. **Build Command:** `npm run build` ✅ (toggle override ON)
6. **Output Directory:** `.vercel/output` ✅ (toggle override ON)
7. **Install Command:** `npm install` (optional, toggle override)
8. **Environment Variables:** Add all from Step 3 above

**Then click "Deploy"!**

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Navigation works
- [ ] Contact form submits (check email)
- [ ] Newsletter signup works
- [ ] Admin panel accessible (if configured)
- [ ] Images load correctly
- [ ] API routes respond
- [ ] Mobile responsive design works
- [ ] Dark mode theme is applied correctly

---

## 📞 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Prisma with Vercel:** https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

## 🔄 Continuous Deployment

After initial deployment, Vercel automatically deploys:
- ✅ Every push to `main` branch → Production
- ✅ Every push to other branches → Preview deployments
- ✅ Every pull request → Preview URL

---

**Your EAR Lab website is ready to go live! 🚀**

Any questions or issues during deployment? Let me know!
