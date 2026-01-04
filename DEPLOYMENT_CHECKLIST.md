# Quick Deployment Checklist

## Before You Start

- [ ] MongoDB Atlas account created
- [ ] Database connection string ready
- [ ] Render account created (sign up with GitHub)
- [ ] Netlify account created (sign up with GitHub)

---

## Step-by-Step Deployment

### 1️⃣ MongoDB Atlas (5 minutes)
- [ ] Create free cluster
- [ ] Create database user (save username & password!)
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Add database name to connection string: `/recipes?`

**Your MongoDB URI:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/recipes?retryWrites=true&w=majority
```

---

### 2️⃣ Deploy Backend on Render (10 minutes)

**Settings:**
- Name: `recipe-app-backend`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance: Free

**Environment Variables:**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-uri>
CORS_ORIGIN=https://your-app.netlify.app
```

- [ ] Backend deployed
- [ ] Copy backend URL: `https://________.onrender.com`
- [ ] Test: Visit `https://________.onrender.com/api/recipes`

---

### 3️⃣ Update Frontend Config (2 minutes)

Update `frontend/.env`:
```env
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
```

Commit and push:
```bash
git add frontend/.env
git commit -m "Update API URL for production"
git push origin main
```

- [ ] .env updated
- [ ] Changes pushed to GitHub

---

### 4️⃣ Deploy Frontend on Netlify (5 minutes)

**Settings:**
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

**Environment Variable:**
```
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
```

- [ ] Frontend deployed
- [ ] Copy Netlify URL: `https://________.netlify.app`

---

### 5️⃣ Update Backend CORS (2 minutes)

Go back to Render → Environment Variables:
```
CORS_ORIGIN=https://YOUR-APP.netlify.app
```

- [ ] CORS_ORIGIN updated
- [ ] Backend redeployed

---

### 6️⃣ Test Your App! 🎉

- [ ] Visit your Netlify URL
- [ ] Create a recipe
- [ ] View recipes
- [ ] Edit a recipe
- [ ] Delete a recipe

---

## 🔗 Your Live URLs

**Frontend (Netlify):** ___________________________

**Backend (Render):** ___________________________

**MongoDB Atlas:** ___________________________

---

## ⚠️ Common Issues

**Problem:** Recipes not loading  
**Solution:** Check VITE_API_URL in Netlify matches your Render URL

**Problem:** CORS errors  
**Solution:** Check CORS_ORIGIN in Render matches your Netlify URL exactly

**Problem:** Backend slow on first load  
**Solution:** Normal! Render free tier spins down. Wait 30-60 seconds.

---

## 📱 Share Your App!

Once everything works, share your Netlify URL with friends and family!

Your recipe app is now live on the internet! 🚀
