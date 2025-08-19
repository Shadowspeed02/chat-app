# Environment Setup Guide

This guide will help you set up the environment variables for your chat app project.

## Quick Setup

1. **Copy the example files:**
   ```bash
   # For server
   cp server/env.example server/.env
   
   # For client
   cp client/env.example client/.env
   ```

2. **Update the values** in both `.env` files with your actual configuration.

## Server Environment Variables

### Required Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRE`: JWT token expiration time
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `CORS_ORIGIN`: Frontend URL for CORS

### Optional Variables

- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`: For email functionality
- `MAX_FILE_SIZE`: Maximum file upload size in bytes
- `UPLOAD_PATH`: Directory for file uploads
- `BCRYPT_ROUNDS`: Number of rounds for password hashing
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window

## Client Environment Variables

### Required Variables

- `VITE_API_URL`: Backend API URL
- `VITE_SOCKET_URL`: WebSocket server URL

### Optional Variables

- `VITE_GOOGLE_ANALYTICS_ID`: Google Analytics ID
- `VITE_SENTRY_DSN`: Sentry error tracking DSN
- `VITE_ENABLE_NOTIFICATIONS`: Enable/disable notifications
- `VITE_ENABLE_FILE_UPLOAD`: Enable/disable file uploads
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for client-side uploads
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset

## Getting Required API Keys

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string from the cluster dashboard

### Cloudinary
1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your cloud name, API key, and API secret from the dashboard

### JWT Secret
Generate a strong random string for JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong, unique secrets** for JWT_SECRET
3. **Keep API keys secure** and rotate them regularly
4. **Use different values** for development and production
5. **Validate environment variables** in your application startup

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use production MongoDB Atlas connection string
3. Update CORS_ORIGIN to your production frontend URL
4. Use strong JWT secrets
5. Configure proper SSL certificates
6. Set up proper rate limiting

## Troubleshooting

- **Connection errors**: Check MongoDB URI and network connectivity
- **CORS errors**: Verify CORS_ORIGIN matches your frontend URL
- **JWT errors**: Ensure JWT_SECRET is set and consistent
- **File upload errors**: Check Cloudinary credentials and upload limits
