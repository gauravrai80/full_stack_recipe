# Recipes App - Full-Stack Application

A complete, production-ready recipe management application with a REST API backend and modern React frontend.

## 🌟 Overview

This project consists of two main parts:
- **Backend**: RESTful API built with Node.js, Express, and MongoDB
- **Frontend**: Modern React application with Tailwind CSS and shadcn-ui

## 📸 Features

### Backend Features
- ✅ Complete CRUD operations for recipes
- ✅ MongoDB database with Mongoose ODM
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ RESTful API design
- ✅ CORS enabled
- ✅ Environment-based configuration

### Frontend Features
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ shadcn-ui component library
- ✅ Recipe listing with grid layout
- ✅ Detailed recipe view
- ✅ Create and edit recipes
- ✅ Delete with confirmation
- ✅ Loading states and skeletons
- ✅ Empty states
- ✅ Error handling
- ✅ Form validation
- ✅ Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Update .env with your MongoDB URI

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Update .env with backend API URL

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
full-stack_recipie/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── recipeController.js
│   ├── models/
│   │   └── recipeModel.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── POSTMAN_COLLECTION.json
├── netlify.toml
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv
- **CORS**: cors

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get recipe by ID |
| POST | `/api/recipes` | Create new recipe |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |

## 📝 Recipe Schema

```javascript
{
  title: String (required),
  ingredients: [String] (required),
  instructions: String (required),
  cookingTime: Number (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🧪 Testing with Postman

Import the `POSTMAN_COLLECTION.json` file into Postman to test all API endpoints with pre-configured requests and examples.

## 🚢 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
   - `NODE_ENV`: production

### Frontend Deployment (Netlify/Vercel)

**Netlify:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variable: `VITE_API_BASE_URL=your_backend_url`

**Vercel:**
1. Import project from GitHub
2. Framework preset: Vite
3. Add environment variable: `VITE_API_BASE_URL=your_backend_url`

## 📚 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation
- [Postman Collection](./POSTMAN_COLLECTION.json) - API testing collection

## 🎨 Design Features

- **Modern UI**: Clean and intuitive interface
- **Responsive Design**: Mobile-first approach
- **Premium Components**: shadcn-ui component library
- **Accessibility**: Keyboard navigation, ARIA labels
- **Tailwind CSS**: Utility-first styling

## 🔒 Security Features

- Environment variables for sensitive data
- CORS configuration
- Input validation
- MongoDB injection prevention
- Error message sanitization

## 📄 License

MIT

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for hot reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Production Build
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 🤝 Contributing

This is an open-source project. Feel free to fork, modify, and use it for your own purposes.

## 📞 Support

For issues or questions:
1. Check the README files in backend and frontend directories
2. Review the Postman collection for API examples
3. Ensure all environment variables are correctly configured

---

**Built with ❤️ using the MERN stack**

*A production-ready full-stack application demonstrating modern web development practices*

