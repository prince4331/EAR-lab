# 📤 How to Import Environment Variables to Vercel

## ✅ Quick Method: Upload .env File

Since Vercel's new interface uses "Import .env" instead of manual entry, I've created a ready-to-use file for you.

---

## 🎯 **Step-by-Step Instructions**

### **Step 1: Locate the File**
In your project folder, you'll find:
```
vercel.env
```
This file contains all your environment variables with the correct values.

### **Step 2: In Vercel Deployment Form**

1. Scroll down to the **"Environment Variables"** section
2. Click the **dropdown arrow** to expand it (▼)
3. You'll see: **"Import .env"** button
4. Click **"Import .env"**

### **Step 3: Upload the File**

1. A file picker will open
2. Navigate to your project folder: `D:\Website making\EAR\`
3. Select the file: **`vercel.env`**
4. Click **"Open"**

### **Step 4: Verify**

Vercel will automatically parse the file and show all variables. You should see:
- ✅ NODE_ENV
- ✅ NEXT_PUBLIC_APP_URL
- ✅ DATABASE_URL
- ✅ NEWSLETTER_SECRET
- ✅ NEXTAUTH_SECRET
- ✅ SESSION_SECRET
- ✅ NEXTAUTH_URL
- ✅ ENABLE_BLOG
- ✅ ENABLE_NEWSLETTER
- ✅ ENABLE_CONTACT_FORM
- ✅ ENABLE_FILE_UPLOAD
- ✅ CORS_ALLOWED_ORIGINS
- ✅ RATE_LIMIT_WINDOW_MS
- ✅ RATE_LIMIT_MAX_REQUESTS
- ✅ SMTP_HOST
- ✅ SMTP_PORT
- ✅ SMTP_USER
- ✅ SMTP_PASS
- ✅ SMTP_FROM
- ✅ ADMIN_EMAIL

**Total: 20 environment variables**

---

## 📝 **Alternative: Paste Method**

If you prefer to paste instead of upload:

1. Open `vercel.env` in VS Code
2. **Select All** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. In Vercel, click "Import .env" button
5. Look for **"or paste the .env contents above"** text
6. Click in the text area and **Paste** (Ctrl+V)
7. Vercel will auto-parse the content

---

## ⚠️ **Important Notes**

### **Email Configuration**
The file includes placeholder email settings:
```
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
```

**These will work for deployment, but you'll need to update them later to enable:**
- Contact form email notifications
- Newsletter confirmation emails

**To update later:**
1. Get credentials from [Mailgun](https://mailgun.com) or [SendGrid](https://sendgrid.com)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Edit SMTP_USER and SMTP_PASS
4. Redeploy

### **URLs Will Change**
The file uses placeholder URLs:
```
NEXT_PUBLIC_APP_URL=https://ear-lab.vercel.app
```

**After first deployment, you'll need to update 3 variables:**
1. `NEXT_PUBLIC_APP_URL` → Your actual Vercel URL
2. `NEXTAUTH_URL` → Your actual Vercel URL
3. `CORS_ALLOWED_ORIGINS` → Your actual Vercel URL

**How to update:**
1. Deploy and get your actual URL (e.g., `https://ear-lab-abc123.vercel.app`)
2. Go to: Settings → Environment Variables
3. Edit the 3 variables above
4. Click: Deployments → ... → Redeploy

---

## 🎯 **What Each Variable Does**

| Variable | Purpose | Can Update Later? |
|----------|---------|-------------------|
| NODE_ENV | Sets production mode | No |
| NEXT_PUBLIC_APP_URL | Your site URL (public) | Yes (after deployment) |
| DATABASE_URL | Database connection | Yes (after DB setup) |
| NEWSLETTER_SECRET | Newsletter security | No |
| NEXTAUTH_SECRET | Auth security | No |
| SESSION_SECRET | Session security | No |
| NEXTAUTH_URL | Auth callback URL | Yes (after deployment) |
| ENABLE_* | Feature toggles | Yes |
| CORS_ALLOWED_ORIGINS | Security origins | Yes (after deployment) |
| RATE_LIMIT_* | API protection | Yes |
| SMTP_* | Email service | Yes (when ready) |

---

## ✅ **Full Deployment Flow**

### **1. Fill Vercel Form**
```
Project Name: ear-lab
Framework: Next.js
Root Directory: ./
Build Command: npm run build (override ON)
Output Directory: .vercel/output (override ON)
```

### **2. Import Environment Variables**
- Click "Import .env"
- Upload `vercel.env` file
- Verify all 20 variables appear

### **3. Deploy**
- Click "Deploy" button
- Wait 2-3 minutes

### **4. Post-Deployment** (Critical!)
- Get your actual Vercel URL
- Update 3 environment variables (URLs)
- Set up Vercel Postgres database
- Redeploy

---

## 🗄️ **Database Setup (After Deployment)**

Your current `DATABASE_URL` uses SQLite which won't work in production.

### **Setup Vercel Postgres:**

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Name it: `ear-lab-db`
   - Click "Create"

2. **Vercel auto-adds these variables:**
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

3. **Update DATABASE_URL:**
   - Go to Settings → Environment Variables
   - Find `DATABASE_URL`
   - Edit value to: `${POSTGRES_PRISMA_URL}`
   - Save

4. **Update your code:**
   ```powershell
   cp prisma/schema.production.prisma prisma/schema.prisma
   git add prisma/schema.prisma
   git commit -m "Switch to PostgreSQL"
   git push origin main
   ```

5. **After auto-redeploy, run:**
   ```powershell
   npx prisma migrate deploy
   ```

---

## 📋 **Quick Checklist**

- [ ] `vercel.env` file located in project folder
- [ ] Vercel form filled (project name, build settings)
- [ ] Clicked "Import .env" in Environment Variables section
- [ ] Uploaded or pasted `vercel.env` content
- [ ] Verified all 20 variables imported correctly
- [ ] Clicked "Deploy" button
- [ ] Waited for deployment to complete
- [ ] Noted actual Vercel URL
- [ ] Updated 3 URL variables in Settings
- [ ] Set up Vercel Postgres database
- [ ] Redeployed with database

---

## 🎉 **You're Ready!**

1. Find the `vercel.env` file in your project
2. Go to Vercel deployment form
3. Expand "Environment Variables" section
4. Click "Import .env"
5. Upload `vercel.env`
6. Click "Deploy"

**Your site will be live in 5 minutes!** 🚀

---

## 🆘 **Still Having Issues?**

If the "Import .env" button doesn't work:

**Option 1: Manual Entry**
- Click "+ Add More" button
- Add each variable one by one
- Copy values from `vercel.env` file

**Option 2: After Deployment**
- Deploy without environment variables first
- Go to Settings → Environment Variables
- Import or add variables there
- Redeploy

Both options work fine, just takes a bit longer.

---

**Need help? Check other guides:**
- `START_HERE.md` - Complete overview
- `FILL_VERCEL_FORM.md` - All form values
- `VERCEL_DEPLOYMENT_GUIDE.md` - Detailed reference
