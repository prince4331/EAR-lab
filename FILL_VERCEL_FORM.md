# 📝 EXACT VERCEL FORM FIELD VALUES

## Copy-Paste Ready Values for Your Deployment Form

---

## 🎯 **SECTION 1: Import Settings**

**Importing from GitHub**
```
✅ Repository: prince4331/EAR-lab
✅ Branch: main (default)
```

---

## 🎯 **SECTION 2: Configure Project**

### **Vercel Team**
```
prince4331's projects
```
*OR select "Hobby" if you don't have a team*

### **Project Name**
```
ear-lab
```
*This becomes your URL: https://ear-lab.vercel.app*  
*You can change this to any name you prefer*

---

## 🎯 **SECTION 3: Framework Preset**

```
Next.js
```
✅ Should be auto-detected (N icon visible)

---

## 🎯 **SECTION 4: Root Directory**

```
./
```
✅ Leave as default (just click the directory field and select the root)

---

## 🎯 **SECTION 5: Build and Output Settings**

⚠️ **Important:** Click the "Build and Output Settings" dropdown to expand it

### **Build Command**
1. Toggle the override switch to **ON** (blue) ✅
2. Enter:
```
npm run build
```

### **Output Directory**
1. Toggle the override switch to **ON** (blue) ✅
2. Enter:
```
.vercel/output
```

### **Install Command**
1. Leave toggle **OFF** (gray) ⚪
2. Will use default: `npm install`

---

## 🎯 **SECTION 6: Environment Variables**

⚠️ **Important:** Click "Environment Variables" dropdown to expand

Click the "+ Add More" or input fields to add these variables:

### **How to add:**
1. In "Key" field, type the variable name (e.g., `NODE_ENV`)
2. In "Value" field, paste the value (e.g., `production`)
3. Select which environments: `Production`, `Preview`, `Development` (select all 3)
4. Click "+ Add More" to add the next variable

---

### **COPY THESE EXACT VALUES:**

#### **Variable 1:**
```
Key: NODE_ENV
Value: production
Environments: Production, Preview, Development
```

#### **Variable 2:**
```
Key: NEXT_PUBLIC_APP_URL
Value: https://ear-lab.vercel.app
Environments: Production, Preview, Development
```

#### **Variable 3:**
```
Key: DATABASE_URL
Value: file:./dev.db
Environments: Production, Preview, Development
```

#### **Variable 4:**
```
Key: NEWSLETTER_SECRET
Value: dHAWLkmQs/lgxhpNvSpb8TZK6AbXY1Nm7YxaT6Yw/I0=
Environments: Production, Preview, Development
```

#### **Variable 5:**
```
Key: NEXTAUTH_SECRET
Value: kdamlaRKzXAbtSP+nDK9tPOlh6Bcrj55od5Tk7FiDRw=
Environments: Production, Preview, Development
```

#### **Variable 6:**
```
Key: SESSION_SECRET
Value: sgAsXDHNKqLXE80rgS63DOFk1plqNR1GzAdQZpyJ8zA=
Environments: Production, Preview, Development
```

#### **Variable 7:**
```
Key: NEXTAUTH_URL
Value: https://ear-lab.vercel.app
Environments: Production, Preview, Development
```

#### **Variable 8:**
```
Key: ENABLE_BLOG
Value: true
Environments: Production, Preview, Development
```

#### **Variable 9:**
```
Key: ENABLE_NEWSLETTER
Value: true
Environments: Production, Preview, Development
```

#### **Variable 10:**
```
Key: ENABLE_CONTACT_FORM
Value: true
Environments: Production, Preview, Development
```

#### **Variable 11:**
```
Key: ENABLE_FILE_UPLOAD
Value: true
Environments: Production, Preview, Development
```

#### **Variable 12:**
```
Key: CORS_ALLOWED_ORIGINS
Value: https://ear-lab.vercel.app
Environments: Production, Preview, Development
```

#### **Variable 13:**
```
Key: RATE_LIMIT_WINDOW_MS
Value: 60000
Environments: Production, Preview, Development
```

#### **Variable 14:**
```
Key: RATE_LIMIT_MAX_REQUESTS
Value: 100
Environments: Production, Preview, Development
```

---

### **EMAIL VARIABLES (Optional - Update Later)**

*These are for email functionality. You can add them now or later.*

#### **Variable 15:**
```
Key: SMTP_HOST
Value: smtp.mailgun.org
Environments: Production, Preview, Development
```

#### **Variable 16:**
```
Key: SMTP_PORT
Value: 587
Environments: Production, Preview, Development
```

#### **Variable 17:**
```
Key: SMTP_USER
Value: postmaster@your-domain.com
Environments: Production, Preview, Development
```

#### **Variable 18:**
```
Key: SMTP_PASS
Value: your-mailgun-password
Environments: Production, Preview, Development
```

#### **Variable 19:**
```
Key: SMTP_FROM
Value: hello@earlab.tech
Environments: Production, Preview, Development
```

#### **Variable 20:**
```
Key: ADMIN_EMAIL
Value: admin@earlab.tech
Environments: Production, Preview, Development
```

---

## 🎯 **FINAL STEP: Deploy**

After adding all variables, scroll down and click:

```
[ Deploy ]  ← Click this button!
```

---

## ⏱️ **What to Expect**

1. **Initializing**: 5-10 seconds
2. **Building**: 2-3 minutes
   - Installing dependencies
   - Running `npm run build`
   - Optimizing output
3. **Deploying**: 20-30 seconds
4. **Ready**: Your site is live! 🎉

You'll see a **"Visit"** button to view your deployed site.

---

## 🔄 **After First Deployment**

### **CRITICAL: Update URLs**

1. **Copy your actual Vercel URL** (e.g., `https://ear-lab-abc123.vercel.app`)

2. **Go to:** Project Settings → Environment Variables

3. **Update these 3 variables:**

   **Update Variable:** `NEXT_PUBLIC_APP_URL`
   ```
   Old: https://ear-lab.vercel.app
   New: https://ear-lab-abc123.vercel.app (your actual URL)
   ```

   **Update Variable:** `NEXTAUTH_URL`
   ```
   Old: https://ear-lab.vercel.app
   New: https://ear-lab-abc123.vercel.app (your actual URL)
   ```

   **Update Variable:** `CORS_ALLOWED_ORIGINS`
   ```
   Old: https://ear-lab.vercel.app
   New: https://ear-lab-abc123.vercel.app (your actual URL)
   ```

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click three dots (...) on your deployment
   - Click "Redeploy"

---

## 🗄️ **Database Setup (REQUIRED for Production)**

⚠️ **SQLite won't work in production!** Follow these steps:

### **Option 1: Vercel Postgres (Easiest)**

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Name it (e.g., `ear-lab-db`)
5. Click **"Create"**

Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

6. **Update environment variable:**
   - Go to Settings → Environment Variables
   - Find `DATABASE_URL`
   - Change value to: `${POSTGRES_PRISMA_URL}`
   - Save

7. **Update Prisma schema locally:**
   ```powershell
   cp prisma/schema.production.prisma prisma/schema.prisma
   git add prisma/schema.prisma
   git commit -m "Switch to PostgreSQL for production"
   git push origin main
   ```

8. **After automatic redeployment, run migrations:**
   ```powershell
   npx prisma migrate deploy
   ```

---

## ✅ **Verification Checklist**

After deployment and database setup:

- [ ] Visit your site URL
- [ ] Check homepage loads with dark theme
- [ ] Test navigation to all pages
- [ ] Try contact form (after email setup)
- [ ] Test newsletter signup (after email setup)
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit (aim for 90+)

---

## 🆘 **Troubleshooting**

### **Build Fails:**
- Check Vercel build logs
- Ensure all environment variables are added
- Verify `npm run build` works locally

### **Site loads but looks broken:**
- Check if dark theme variables are loading
- Look at browser console for errors
- Verify all environment variables starting with `NEXT_PUBLIC_` are set

### **Database errors:**
- Make sure you've switched to PostgreSQL
- Verify `DATABASE_URL` or `POSTGRES_PRISMA_URL` is set correctly
- Run `npx prisma generate` and `npx prisma migrate deploy`

### **Images missing:**
- Normal for first deployment
- Add images to `public/projects/` and `public/blog/`
- Push to GitHub

---

## 🎉 **Success!**

Your site should be live at:
```
https://ear-lab.vercel.app
```
(or your custom URL)

**Next steps:**
1. Set up database (Vercel Postgres)
2. Configure email service (for contact form)
3. Add actual project/blog images
4. Set up custom domain (optional)
5. Configure Google Analytics (optional)

---

## 📚 **Additional Help**

- **Detailed Guide:** See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Deployment Status:** See `DEPLOYMENT_READY.md`
- **Checklist:** See `deployment-checklist.json`

---

**You're all set! Follow these steps and you'll be deployed in 5 minutes! 🚀**
