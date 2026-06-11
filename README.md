# AI Resume Builder

A full-stack, AI-powered resume builder web application that helps users create professional, ATS-friendly resumes with AI assistance.

## Features

### Frontend Features
- 🎨 Modern, responsive UI with light and dark mode
- 📱 Mobile-friendly design
- 🎯 Interactive form with real-time resume preview
- 📄 Multiple resume templates (3+ options)
- 🖼️ Profile photo upload
- 📊 Resume completion progress bar
- ⭐ Resume score calculator

### Resume Features
- Real-time preview of resume
- Download as PDF
- Download as DOCX
- Print-friendly format
- Edit and update anytime
- Multiple resumes per user
- Copy-to-clipboard functionality

### AI Features
- 🤖 AI-generated career objective
- 💡 AI skill suggestions based on field
- ✨ AI improvement suggestions for project descriptions
- 📝 AI-generated professional summaries
- 🔍 ATS keyword optimization
- 📈 ATS compatibility checker

### Additional Features
- 🔐 User authentication (Sign Up, Login, Logout)
- 👤 User profile management
- 🌙 Dark mode toggle
- 📧 Email verification
- 📤 Resume sharing with unique links
- 📋 Cover letter generator
- 💾 Secure password hashing

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API
- LocalStorage

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password hashing)

### Libraries
- PDFKit (PDF generation)
- DOCX (Word document generation)
- Axios (HTTP client)
- Nodemailer (Email service)

## Project Structure

```
ai-resume-builder/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── CoverLetter.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resume.js
│   │   ├── user.js
│   │   ├── ai.js
│   │   └── export.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── aiController.js
│   │   └── exportController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── pdfGenerator.js
│   │   ├── docxGenerator.js
│   │   ├── atsChecker.js
│   │   └── aiService.js
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── dark-mode.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   ├── resume.js
│   │   ├── templates.js
│   │   ├── ai.js
│   │   ├── export.js
│   │   ├── utils.js
│   │   └── api.js
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── pages/
│       ├── home.html
│       ├── builder.html
│       ├── templates.html
│       ├── profile.html
│       └── about.html
├── tests/
│   ├── auth.test.js
│   ├── resume.test.js
│   └── ai.test.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. Make sure MongoDB is running

6. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

### Frontend Setup

1. Open `frontend/index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # or using Node.js
   npx http-server frontend -p 3000
   ```

2. Access the application at `http://localhost:3000` (or your configured port)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify token

### Resume Management
- `GET /api/resume` - Get all resumes for user
- `POST /api/resume` - Create new resume
- `GET /api/resume/:id` - Get specific resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `GET /api/resume/:id/share` - Get shareable link

### AI Features
- `POST /api/ai/career-objective` - Generate career objective
- `POST /api/ai/skills-suggestion` - Get skill suggestions
- `POST /api/ai/project-improvement` - Improve project description
- `POST /api/ai/summary` - Generate professional summary
- `POST /api/ai/ats-check` - Check ATS compatibility

### Export
- `GET /api/export/:id/pdf` - Download resume as PDF
- `GET /api/export/:id/docx` - Download resume as DOCX
- `GET /api/export/:id/print` - Get print-friendly version

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/upload-photo` - Upload profile photo

## Usage

### Creating a Resume

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your dashboard
3. **Create Resume**: Click "Create New Resume" and start filling in details
4. **Fill Information**: Complete all sections:
   - Personal Information
   - Education
   - Experience/Internships
   - Skills
   - Projects
   - Certifications
   - Languages
   - Achievements
5. **Use AI Features**: Get suggestions for:
   - Career objectives
   - Skills matching your field
   - Improved project descriptions
   - Professional summaries
6. **Choose Template**: Select from multiple professional templates
7. **Preview**: See real-time preview in right panel
8. **Download**: Export as PDF or DOCX
9. **Share**: Generate unique shareable link

### Dark Mode
- Click the moon/sun icon in the navigation bar to toggle dark mode
- Preference is saved in localStorage

### ATS Checker
- Click "ATS Check" to analyze resume compatibility
- Get suggestions for improvement
- Score out of 100

## Sample Data

The application includes sample data for testing. After registering, you can:
1. Load sample resume data from the dashboard
2. Use it as a template for your own resume
3. Modify and customize as needed

## Configuration

### Database Configuration
Edit `backend/config/database.js` to customize:
- MongoDB connection settings
- Connection pool size
- Timeout values

### AI Service Configuration
Edit `backend/utils/aiService.js` to:
- Configure AI providers (OpenAI, HuggingFace, etc.)
- Set API keys
- Adjust model parameters

## Error Handling

The application includes comprehensive error handling:
- Form validation on frontend and backend
- Try-catch blocks in async operations
- Custom error messages
- Logging for debugging

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Helmet.js for HTTP headers
- ✅ Input validation and sanitization
- ✅ Secure file uploads
- ✅ Protected API routes

## Performance Optimization

- Lazy loading of components
- Image compression
- CSS/JS minification (in production)
- Database indexing
- Caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
- Check FRONTEND_URL in `.env`
- Ensure backend CORS is configured correctly

### PDF Generation Issues
- Install required system fonts
- Check write permissions in upload folder

## Future Enhancements

- [ ] Collaboration features
- [ ] Resume versioning
- [ ] Integration with job boards
- [ ] Video introduction support
- [ ] Multi-language support
- [ ] Cover letter templates
- [ ] Social media integration
- [ ] Advanced analytics

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@airesumerbuilder.com or open an issue on GitHub.

## Changelog

### Version 1.0.0
- Initial release
- Core resume building functionality
- AI features integration
- PDF/DOCX export
- User authentication
- Multiple templates

---

**Made with ❤️ by Bindu Madhavi**
