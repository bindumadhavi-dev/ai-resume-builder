# AI Resume Builder - Complete Setup Guide

## Quick Start (5 minutes)

### 1. Install Node.js
Download and install from https://nodejs.org/ (LTS version recommended)

### 2. Install MongoDB
- **Option A (Local)**: Download from https://www.mongodb.com/try/download/community
- **Option B (Cloud)**: Use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

### 3. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/bindumadhavi-dev/ai-resume-builder.git
cd ai-resume-builder

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### 4. Configure .env
Edit `.env` file with your settings:
```
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_random_secret_key_here
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_key_if_using_openai
```

### 5. Start MongoDB
```bash
# If installed locally
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 6. Start Backend Server
```bash
# In terminal 1 (from project root)
npm run dev
# Server runs on http://localhost:5000
```

### 7. Start Frontend Server
```bash
# In terminal 2 (from project root)
npx http-server frontend -p 3000
# Frontend runs on http://localhost:3000
```

### 8. Access the Application
Open http://localhost:3000 in your browser

---

## Detailed Setup Instructions

### Backend Setup

#### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **pdfkit**: PDF generation
- **docx**: Word document generation

#### Step 2: Database Setup

**Using Local MongoDB:**
1. Install MongoDB Community Edition
2. Start the MongoDB service
3. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   ```

**Using MongoDB Atlas (Cloud):**
1. Create account at https://mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder?retryWrites=true&w=majority
   ```

#### Step 3: Environment Configuration

Create `.env` file:
```bash
cp .env.example .env
```

Required variables:
```
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# AI APIs (optional for basic features)
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Step 4: Start Backend

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

### Frontend Setup

#### Step 1: Navigate to Frontend
```bash
cd frontend
```

#### Step 2: Start Development Server

**Option A: Using http-server**
```bash
npx http-server . -p 3000
```

**Option B: Using Python**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**Option C: Using Node.js**
```bash
npx serve -l 3000
```

#### Step 3: Access Frontend
Open http://localhost:3000 in your browser

### Verification

✅ **Backend Check:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status": "ok"}
```

✅ **Frontend Check:**
Open http://localhost:3000 - should display the application homepage

✅ **Database Check:**
- Signup should create user in database
- Can view collections in MongoDB Compass

---

## Testing the Application

### 1. User Registration
1. Click "Sign Up" on home page
2. Enter:
   - Email: test@example.com
   - Password: Test@123
   - Name: John Doe
3. Click "Register"

### 2. Login
1. Use credentials from signup
2. Should redirect to dashboard

### 3. Create Resume
1. Click "Create New Resume"
2. Enter personal information
3. Fill other sections
4. See real-time preview

### 4. Use AI Features
1. Click "AI Generate" buttons
2. Get AI suggestions
3. Accept or modify

### 5. Download Resume
1. Click "Download PDF" or "Download DOCX"
2. File should download to computer

### 6. Dark Mode
1. Click moon icon in navbar
2. Theme should toggle

---

## Project Structure Explanation

```
backend/
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── controllers/         # Business logic
├── middleware/          # Auth, validation, error handling
├── utils/               # Helper functions (PDF, ATS, AI)
├── config/              # Configuration files
└── server.js            # Main server file

frontend/
├── index.html           # Main HTML file
├── css/                 # Stylesheets
│   ├── style.css        # Main styles
│   ├── responsive.css   # Mobile responsive
│   └── dark-mode.css    # Dark theme
├── js/                  # JavaScript files
│   ├── main.js          # Main logic
│   ├── auth.js          # Auth functions
│   ├── resume.js        # Resume management
│   ├── api.js           # API calls
│   └── utils.js         # Utility functions
├── pages/               # HTML pages
│   ├── builder.html     # Resume builder
│   ├── templates.html   # Template selection
│   └── profile.html     # User profile
└── assets/              # Images and icons
```

---

## Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install`

### Issue: "MongoDB connection refused"
**Solution:** 
- Start MongoDB service
- Check MONGODB_URI in .env
- Verify MongoDB is running: `mongosh`

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "CORS error when accessing frontend"
**Solution:** Check FRONTEND_URL in .env matches your frontend URL

### Issue: "PDF generation fails"
**Solution:** 
- Ensure write permissions in upload folder
- Check disk space
- Install required fonts on system

### Issue: "Cannot login after signup"
**Solution:**
- Check database connection
- Verify password hashing works
- Check JWT_SECRET is set

---

## Production Deployment

### Backend (Node.js on Heroku/Railway/Render)

1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables:
   ```
   MONGODB_URI=your_production_db
   JWT_SECRET=production_secret
   NODE_ENV=production
   ```
4. Deploy

### Frontend (Vercel/Netlify)

1. Update API_BASE_URL in frontend/js/api.js to production backend
2. Deploy frontend folder
3. Configure custom domain

### Database (MongoDB Atlas)

1. Create production cluster
2. Enable authentication
3. Whitelist production server IP
4. Use connection string in backend

---

## Performance Tips

1. **Enable Compression**
   ```javascript
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use(express.static('frontend', { maxAge: '1d' }));
   ```

3. **Database Indexing**
   ```javascript
   userSchema.index({ email: 1 });
   resumeSchema.index({ userId: 1, createdAt: -1 });
   ```

4. **Implement Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   ```

---

## Security Checklist

- [ ] Change JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Use strong passwords for database
- [ ] Enable MongoDB authentication
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use helmet.js
- [ ] Keep dependencies updated

---

## Support & Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/

---

**Happy Building! 🚀**
