# Propat Backend API

Express.js backend API for the Propat chocolate customization platform with MongoDB database and JWT authentication.

## Features

- User registration and authentication
- Google and Facebook OAuth integration
- User profile management
- Order history tracking
- JWT token-based security
- MongoDB data persistence

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
   - Set up MongoDB connection string
   - Add JWT secret key
   - Configure Google OAuth credentials
   - Configure Facebook OAuth credentials

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/facebook` - Facebook OAuth login

### User Management
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)

### Orders
- `GET /api/orders/history` - Get user order history (authenticated)
- `POST /api/orders` - Create new order (authenticated)
- `GET /api/orders/:orderId` - Get specific order (authenticated)

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### User Model
- Personal information (name, email, phone, address)
- Account type (client/enterprise)
- Social login integration (Google/Facebook)
- Newsletter subscription preference

### Order Model
- Order items and quantities
- Total amount and status tracking
- Shipping address information
- User relationship

## OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure Valid OAuth Redirect URIs: `http://localhost:5000/api/auth/facebook/callback`

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Secure session handling

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and descriptive error messages in French.

## Frontend Integration

The backend is designed to work with the React frontend. Make sure to:
1. Start the backend server on port 5000
2. Start the frontend on port 3000
3. CORS is configured to allow frontend requests

## Development Notes

- Use `nodemon` for automatic server restarts during development
- MongoDB connection is handled with mongoose
- All routes are prefixed with `/api`
- Passwords are never returned in API responses
- JWT tokens expire after 24 hours