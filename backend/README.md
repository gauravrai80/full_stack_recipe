# Recipes API - Backend

A production-ready REST API for managing recipes, built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv
- **CORS**: cors

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── recipeController.js # Business logic
├── models/
│   └── recipeModel.js      # Mongoose schema
├── routes/
│   └── recipeRoutes.js     # API routes
├── app.js                  # Express app setup
├── server.js               # Server entry point
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update the `.env` file with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/recipes-app
   # For MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/recipes-app
   
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/recipes
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recipes` | Create a new recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get recipe by ID |
| PUT | `/api/recipes/:id` | Update recipe by ID |
| DELETE | `/api/recipes/:id` | Delete recipe by ID |

### Recipe Schema

```javascript
{
  title: String (required, max 100 chars),
  ingredients: [String] (required, non-empty array),
  instructions: String (required),
  cookingTime: Number (optional, 1-1440 minutes),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 📝 API Examples

### Create Recipe
```bash
POST /api/recipes
Content-Type: application/json

{
  "title": "Chocolate Chip Cookies",
  "ingredients": [
    "2 cups flour",
    "1 cup butter",
    "1 cup sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": "Mix ingredients and bake at 350°F for 12 minutes.",
  "cookingTime": 30
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Chocolate Chip Cookies",
    "ingredients": [...],
    "instructions": "...",
    "cookingTime": 30,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Recipes
```bash
GET /api/recipes
```

**Response (200)**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Get Recipe by ID
```bash
GET /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
```

### Update Recipe
```bash
PUT /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
Content-Type: application/json

{
  "title": "Updated Recipe Title",
  "cookingTime": 45
}
```

### Delete Recipe
```bash
DELETE /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (200)**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {...}
}
```

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid ID)
- `404` - Not Found
- `500` - Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🚢 Deployment

### Deploy to Render

1. **Create a new Web Service on Render**

2. **Connect your GitHub repository**

3. **Configure build settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add environment variables**
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=your_frontend_url
   ```

5. **Deploy**

### MongoDB Atlas Setup


1. Get your connection string


## 🔒 Security Best Practices

- Environment variables for sensitive data
- CORS configured for specific origins in production
- Input validation on all endpoints
- Mongoose schema validation
- Error messages don't expose sensitive information

