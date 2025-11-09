# 🎯 QUICK START: Fill Vercel Deployment Form

## Based on your screenshot, here's exactly what to fill in:

---

## 📝 **Project Configuration**

### **1. Import from GitHub**
- Repository: `prince4331/EAR-lab` ✅
- Branch: `main` ✅

---

### **2. Configure Project**

#### **Vercel Team**
```
prince4331's projects
```
*(Or select "Hobby" if you don't have a team)*

#### **Project Name**
```
ear-lab
```
*(Or any name you prefer - this will be part of your URL: ear-lab.vercel.app)*

---

### **3. Framework Preset**
```
Next.js ✅ (Already detected)
```

---

### **4. Root Directory**
```
./
```
*(Leave as default - your project is in the root)*

---

### **5. Build and Output Settings**

#### **Build Command** (Toggle Override: ON ✅)
```
npm run build
```

#### **Output Directory** (Toggle Override: ON ✅)
```
.vercel/output
```

#### **Install Command** (Optional - Toggle Override: OFF)
```
(Leave default or use: npm install)
```

---

### **6. Environment Variables** ⚠️ CRITICAL

Click "Add Environment Variables" and add these:

#### **Copy these EXACT values:**

```bash
# === REQUIRED ===
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://ear-lab.vercel.app
DATABASE_URL=file:./dev.db

# === GENERATED SECRETS (from previous terminal output) ===
NEWSLETTER_SECRET=dHAWLkmQs/lgxhpNvSpb8TZK6AbXY1Nm7YxaT6Yw/I0=
NEXTAUTH_SECRET=kdamlaRKzXAbtSP+nDK9tPOlh6Bcrj55od5Tk7FiDRw=
SESSION_SECRET=sgAsXDHNKqLXE80rgS63DOFk1plqNR1GzAdQZpyJ8zA=

# === EMAIL CONFIGURATION (Update with YOUR credentials) ===
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
SMTP_FROM=hello@earlab.tech
ADMIN_EMAIL=admin@earlab.tech

# === NEXTAUTH ===
NEXTAUTH_URL=https://ear-lab.vercel.app

# === FEATURE FLAGS ===
ENABLE_BLOG=true
ENABLE_NEWSLETTER=true
ENABLE_CONTACT_FORM=true
ENABLE_FILE_UPLOAD=true

# === SECURITY ===
CORS_ALLOWED_ORIGINS=https://ear-lab.vercel.app
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

**How to add each variable:**
1. Key: `NODE_ENV` | Value: `production` | Environment: `Production, Preview, Development`
2. Key: `NEXT_PUBLIC_APP_URL` | Value: `https://ear-lab.vercel.app` | Environment: `Production, Preview, Development`
3. *(Continue for all variables above)*

---

### **7. Click "Deploy"** 🚀

---

## ⚠️ IMPORTANT POST-DEPLOYMENT STEPS

### **After First Deployment:**

1. **Get your actual Vercel URL** (e.g., `ear-lab-abc123.vercel.app`)

2. **Update these environment variables in Vercel Dashboard:**
   - Go to: Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` to your actual URL
   - Update `NEXTAUTH_URL` to your actual URL
   - Update `CORS_ALLOWED_ORIGINS` to your actual URL

3. **Redeploy** (Vercel → Deployments → Three dots → Redeploy)

---

## 🗄️ DATABASE SETUP (CRITICAL FOR PRODUCTION)

**⚠️ SQLite (`file:./dev.db`) will NOT work in production!**

### **Option 1: Vercel Postgres (Recommended)**
1. In Vercel Dashboard → Storage → Create Database → Postgres
2. Vercel automatically adds:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
3. Update `DATABASE_URL` environment variable to use `POSTGRES_PRISMA_URL`
4. Change Prisma schema:
   ```bash
   # Backup your current schema
   cp prisma/schema.prisma prisma/schema.sqlite.prisma
   
   # Use production schema
   cp prisma/schema.production.prisma prisma/schema.prisma
   ```
5. Deploy migrations:
   ```bash
   npx prisma migrate deploy
   ```

### **Option 2: Supabase (Free PostgreSQL)**
1. Create account at [supabase.com](https://supabase.com)
2. Create project → Get connection string
3. In Vercel, update `DATABASE_URL`:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
4. Update Prisma schema to PostgreSQL
5. Run migrations

---

## ✅ **Verification Checklist**

After deployment, test:

- [ ] Homepage loads: `https://your-url.vercel.app/`
- [ ] Services page: `/services`
- [ ] Projects page: `/projects`
- [ ] Blog page: `/blog`
- [ ] Contact form: `/contact`
- [ ] Newsletter signup: `/subscribe`
- [ ] Dark theme is applied ✨
- [ ] Mobile responsive
- [ ] Contact form sends email
- [ ] Newsletter signup works

---

## 🎨 Your Vercel Form Should Look Like:

```
┌─────────────────────────────────────────────────┐
│ Importing from GitHub                           │
│ 📦 prince4331/EAR-lab  🔀 main                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Vercel Team: prince4331's projects              │
│ Project Name: ear-lab                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Framework Preset: N Next.js                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Root Directory: ./                   [Edit]     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ ▼ Build and Output Settings                     │
│                                                  │
│ Build Command: npm run build        [✓ ON]     │
│ Output Directory: .vercel/output    [✓ ON]     │
│ Install Command: (default)          [  OFF]    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ ▼ Environment Variables                         │
│                                                  │
│ [Add environment variables here]                │
│ NODE_ENV = production                           │
│ NEXT_PUBLIC_APP_URL = https://...               │
│ ... (all others from above)                     │
└─────────────────────────────────────────────────┘

        [ Deploy ] ← Click this!
```

---

## 🆘 Need Help?

**Common Issues:**

1. **Build fails:** Check Vercel logs, ensure all dependencies in package.json
2. **Database errors:** Make sure you're using PostgreSQL, not SQLite
3. **API not working:** Verify environment variables are set
4. **Images missing:** Ensure images are in `public/` folder

**Resources:**
- Full Guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Deployment Checklist: `deployment-checklist.json`
- Environment Template: `.env.production`

---

## 🎉 After Successful Deployment

Your site will be live at: `https://ear-lab.vercel.app` (or your custom URL)

**Next steps:**
1. Set up custom domain (optional)
2. Configure email service
3. Set up database properly (Vercel Postgres/Supabase)
4. Add Google Analytics (optional)
5. Monitor with Vercel Analytics

---

**You're ready to deploy! 🚀**

Any questions? Refer to `VERCEL_DEPLOYMENT_GUIDE.md` for detailed explanations.
