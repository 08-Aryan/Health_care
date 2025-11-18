# Healthcare Wellness Portal - Setup Guide

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

   Or manually:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Configure Environment Variables:**

   **Backend (.env):**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

   **Frontend (.env):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Start the Application:**

   **Option 1: Start both servers together (requires concurrently)**
   ```bash
   npm install -g concurrently
   npm run dev
   ```

   **Option 2: Start servers separately**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Application:**
   - Frontend: http://localhost:5173 (or another port if 5173 is in use)
   - Backend API: http://localhost:5000/api

## Current Status

 **Backend Server**: Running on port 5000
 **Frontend Server**: Running on port 5174
 **Database**: Connected to MongoDB Atlas
 **API Endpoints**: Configured and working

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get logged in user (requires auth)

### Patient Routes
- GET `/api/patient/dashboard` - Get patient dashboard (requires auth + patient role)
- GET `/api/patient/profile` - Get patient profile (requires auth + patient role)
- PUT `/api/patient/profile` - Update patient profile (requires auth + patient role)

### Goals
- POST `/api/goals` - Create new goal (requires auth + patient role)
- GET `/api/goals` - Get user's goals (requires auth)
- GET `/api/goals/patient/:patientId` - Get patient goals by ID (requires auth + provider role)

### Reminders
- POST `/api/reminders` - Create reminder (requires auth)
- GET `/api/reminders` - Get user's reminders (requires auth)
- DELETE `/api/reminders/:id` - Delete reminder (requires auth)

### Provider Routes
- GET `/api/provider/patients` - Get all patients with compliance (requires auth + provider role)
- GET `/api/provider/patients/:id/progress` - Get patient progress (requires auth + provider role)

### Public Routes
- GET `/api/public/articles` - Get public health articles (no auth required)

## Testing the API

Use the provided test script:
```bash
./test_backend.sh
```

Or test manually with curl:

**Register a Patient:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient",
    "consentGiven": true
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Public Articles:**
```bash
curl http://localhost:5000/api/public/articles
```

## Project Structure

```
healthcare/
 backend/
 src/   
 config/       # Database and environment config      
 controllers/  # Request handlers      
 middlewares/  # Auth, RBAC, error handling      
 models/       # Mongoose schemas      
 routes/       # API routes      
 utils/        # Utility functions      
 app.js        # Express app setup      
 server.js     # Server entry point      
 .env              # Backend environment variables   
 package.json   

 frontend/
 src/   
 api/          # API client      
 components/   # React components      
 context/      # React context (Auth)      
 pages/        # Page components      
 utils/        # Utility functions      
 App.jsx       # Main app component      
 main.jsx      # Entry point      
 .env              # Frontend environment variables   
 package.json   

 package.json          # Root package.json with scripts
 Readme.md            # Project documentation
 SETUP.md             # This file

```

## Features Implemented

### Patient Features
-  Register & Login with JWT Authentication
-  View personal dashboard
-  Track wellness goals (steps, water intake, sleep)
-  View and manage reminders
-  Update personal profile
-  View public health information

### Provider Features
-  Dedicated provider login
-  View list of all patients
-  See patient wellness goal compliance
-  View individual patient progress

### Security Features
-  JWT-based authentication
-  Role-based access control (RBAC)
-  Password hashing with bcrypt
-  Environment-based configuration

## Troubleshooting

### Port Already in Use
If you see "Port 5000 is in use" or "Port 5173 is in use", either:
1. Stop the existing process using that port
2. Change the PORT in .env file
3. The servers will automatically try another port

### MongoDB Connection Issues
- Verify your MONGO_URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure network access is configured

### Module Not Found Errors
Run `npm install` in both backend and frontend directories:
```bash
cd backend && npm install
cd ../frontend && npm install
```

## Next Steps

1. Create seed data for testing
2. Add more comprehensive error handling
3. Implement refresh token rotation
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Deploy to production (Vercel/Netlify for frontend, Render/Railway for backend)

## Support

For issues or questions, please refer to the main Readme.md file or check the project repository.
