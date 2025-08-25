# Deployment Guide for Chat App

## Prerequisites
- A MongoDB Atlas account (already set up)
- A Cloudinary account (already set up)
- A hosting platform account (recommended: Render.com)

## Backend Deployment (Server)

1. Create a new `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Update your `server.js` to use process.env.PORT
3. Make sure your CORS settings in server.js allow your frontend domain

## Frontend Deployment (Client)

1. Create a `.env` file in the client directory with:
```
VITE_BACKEND_URL=https://your-backend-url.com
```

## Deployment Steps

### Backend Deployment (on Render.com)

1. Go to render.com and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: chat-app-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Select appropriate instance type
5. Add the environment variables from your `.env` file
6. Click "Create Web Service"

### Frontend Deployment (on Render.com)

1. Click "New +" and select "Static Site"
2. Connect your GitHub repository
3. Configure the build:
   - Name: chat-app-frontend
   - Build Command: `npm install && npm run build`
   - Publish directory: `dist`
4. Add the environment variable:
   - VITE_BACKEND_URL: Your backend URL from the previous step
5. Click "Create Static Site"

## Important Notes

1. Update CORS settings in your backend to allow requests from your frontend domain
2. Ensure all environment variables are properly set in your deployment platform
3. Make sure your MongoDB Atlas cluster is accessible from anywhere (Network Access settings)
4. Verify Cloudinary credentials are working in production

## Testing the Deployment

1. Visit your frontend URL
2. Try to:
   - Register a new user
   - Login
   - Send messages
   - Upload images
   
If any issues occur, check:
- Backend logs in Render dashboard
- Frontend console for any errors
- Environment variables are correctly set
- Network requests in browser developer tools

## Security Considerations

1. Never commit `.env` files to your repository
2. Use secure values for JWT_SECRET in production
3. Set up proper CORS policies
4. Enable rate limiting for your API endpoints
5. Keep your dependencies updated

## Monitoring

1. Set up monitoring in Render dashboard
2. Monitor MongoDB Atlas metrics
3. Set up Cloudinary usage alerts
