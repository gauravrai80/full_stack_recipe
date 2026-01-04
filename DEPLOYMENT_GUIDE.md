# Full-Stack Recipe App - Deployment Guide

Complete guide to deploy your application on **Netlify** (Frontend) and **Render** (Backend).

---

## 📋 Prerequisites

- GitHub account with your code pushed to: https://github.com/gauravrai80/full_stack_recipe.git
- MongoDB Atlas account (for cloud database)
- Netlify account (free tier)
- Render account (free tier)

---

## Part 1: MongoDB Atlas Setup (Database)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select a cloud provider and region (choose closest to you)
6. Click **"Create Cluster"**

### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set username and password (save these!)
5. Set privileges to **"Read and write to any database"**
6. Click **"Add User"**

### Step 3: Whitelist IP Address

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your actual credentials
5. Add database name before the `?`: 
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipes?retryWrites=true&w=majority
   ```

---

## Part 2: Deploy Backend on Render

### Step 1: Sign Up for Render

1. Go to [Render](https://render.com/)
2. Sign up using your GitHub account
3. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `gauravrai80/full_stack_recipe`
3. Configure the service:

   **Basic Settings:**
   - **Name:** `recipe-app-backend` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

   **Instance Type:**
   - Select **Free** tier

### Step 3: Add Environment Variables

In the **Environment Variables** section, add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipes?retryWrites=true&w=majority
CORS_ORIGIN=https://your-app-name.netlify.app
```

> **Note:** Replace `MONGODB_URI` with your actual MongoDB connection string. We'll update `CORS_ORIGIN` after deploying the frontend.

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL:
   ```
   https://recipe-app-backend.onrender.com
   ```

### Step 5: Test Backend

Visit: `https://recipe-app-backend.onrender.com/api/recipes`

You should see an empty array `[]` or your recipes.

---

## Part 3: Deploy Frontend on Netlify

### Step 1: Update Frontend Environment Variable

1. Open `frontend/.env` file
2. Update the API URL to your Render backend URL:
   ```env
   VITE_API_URL=https://recipe-app-backend.onrender.com/api
   ```

### Step 2: Commit and Push Changes

```bash
cd c:\Users\hp\OneDrive\Desktop\full-stack_recipie
git add frontend/.env
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Sign Up for Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up using your GitHub account
3. Authorize Netlify to access your repositories

### Step 4: Create New Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your repository: `gauravrai80/full_stack_recipe`
4. Configure build settings:

   **Build Settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Branch to deploy:** `main`

### Step 5: Add Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add:
   ```
   Key: VITE_API_URL
   Value: https://recipe-app-backend.onrender.com/api
   ```

### Step 6: Deploy

1. Click **"Deploy site"**
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://gleaming-unicorn-abc123.netlify.app
   ```

### Step 7: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to add your domain

---

## Part 4: Update Backend CORS

Now that you have your Netlify URL, update the backend:

### Step 1: Update Render Environment Variables

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://gleaming-unicorn-abc123.netlify.app
   ```
   (Replace with your actual Netlify URL)

### Step 2: Redeploy Backend

1. Go to **Manual Deploy** → **"Deploy latest commit"**
2. Wait for redeployment

---

## Part 5: Verify Deployment

### Test Your Application

1. Visit your Netlify URL: `https://your-app.netlify.app`
2. Try creating a new recipe
3. Try viewing, editing, and deleting recipes
4. Check if all features work correctly

### Troubleshooting

**If recipes don't load:**
- Check browser console for errors
- Verify `VITE_API_URL` in Netlify environment variables
- Verify `CORS_ORIGIN` in Render environment variables
- Check Render logs for backend errors

**If you get CORS errors:**
- Make sure `CORS_ORIGIN` in Render matches your Netlify URL exactly
- Redeploy backend after updating CORS_ORIGIN

**If backend is slow (first load):**
- Render free tier spins down after inactivity
- First request may take 30-60 seconds to wake up
- Subsequent requests will be faster

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- 750 hours/month free
- Slower cold starts

**Netlify Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS

**MongoDB Atlas Free Tier:**
- 512MB storage
- Shared RAM
- No backup

### Environment Variables Summary

**Backend (Render):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://your-app.netlify.app
```

**Frontend (Netlify):**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🔄 Continuous Deployment

Both Netlify and Render are configured for automatic deployment:

- Push to `main` branch → Automatic deployment
- No manual intervention needed
- Check deployment status in respective dashboards

---

## 🎉 You're Done!

Your full-stack recipe app is now live and accessible worldwide!

**Frontend:** https://your-app.netlify.app  
**Backend:** https://your-backend.onrender.com

Share your app with friends and family! 🚀
