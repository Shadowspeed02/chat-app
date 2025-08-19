# Chat App

A full-stack real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chat-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp server/env.example server/.env
   cp client/env.example client/.env
   
   # Edit the .env files with your configuration
   # See ENVIRONMENT_SETUP.md for detailed instructions
   ```

4. **Start both servers simultaneously**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both client and server in development mode (using concurrently) |
| `npm run dev:simple` | Start both servers using Windows start command |
| `npm run dev:server` | Start only the server in development mode |
| `npm run dev:client` | Start only the client in development mode |
| `npm run server` | Start the server (alias for dev:server) |
| `npm run client` | Start the client (alias for dev:client) |
| `npm run build` | Build the client for production |
| `npm run install:all` | Install dependencies for all packages |
| `npm run start` | Start the server in production mode |
| `npm run lint` | Run ESLint on the client code |
| `npm run preview` | Preview the built client |

### Alternative Startup Methods

#### Windows Batch File
```bash
# Double-click or run from command line
start-dev.bat
```

#### PowerShell Script
```powershell
# Run PowerShell script
.\start-dev.ps1
```

### Individual Package Scripts

#### Client Scripts
```bash
cd client
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

#### Server Scripts
```bash
cd server
npm run server   # Start with nodemon
npm start        # Start in production mode
```

## 🏗️ Project Structure

```
chat-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── lib/           # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── lib/              # Utility functions
│   └── package.json
├── package.json          # Root package.json with concurrency scripts
├── .gitignore           # Git ignore rules
├── env.example          # Environment variables template
└── README.md           # This file
```

## 🔧 Development

### Running in Development Mode

The easiest way to develop is using the concurrency script:

```bash
npm run dev
```

This will start:
- **Client**: React dev server on `http://localhost:3000`
- **Server**: Node.js server on `http://localhost:5000`

### Running Individual Services

If you need to run only one service:

```bash
# Run only the server
npm run dev:server

# Run only the client
npm run dev:client
```

### Environment Variables

Make sure to set up your environment variables:

1. Copy the example files:
   ```bash
   cp server/env.example server/.env
   cp client/env.example client/.env
   ```

2. Update the values in both `.env` files
3. See `ENVIRONMENT_SETUP.md` for detailed configuration

## 🚀 Production Deployment

### Building for Production

```bash
# Build the client
npm run build

# Start the server in production mode
npm start
```

### Environment Setup for Production

1. Set `NODE_ENV=production` in `server/.env`
2. Update all URLs to production domains
3. Use production MongoDB Atlas connection string
4. Configure proper CORS origins
5. Set up SSL certificates

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - File uploads

## 📝 Environment Variables

See `ENVIRONMENT_SETUP.md` for complete environment variable documentation.

### Required Variables

**Server:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

**Client:**
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - WebSocket server URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   - Check if ports 3000 or 5000 are already occupied
   - Kill the processes or change ports in environment variables

2. **MongoDB connection issues**
   - Verify your MongoDB URI in `server/.env`
   - Check network connectivity
   - Ensure MongoDB service is running

3. **CORS errors**
   - Verify `CORS_ORIGIN` in `server/.env` matches your frontend URL
   - Check that both servers are running

4. **Environment variables not loading**
   - Ensure `.env` files exist in both `client/` and `server/` directories
   - Restart the development servers after changing environment variables

5. **Concurrency script errors**
   - If `npm run dev` fails, try `npm run dev:simple` instead
   - Ensure `concurrently` is installed: `npm install concurrently --save-dev`
   - Use alternative startup methods: `start-dev.bat` or `start-dev.ps1`

### Getting Help

- Check the `ENVIRONMENT_SETUP.md` file for detailed configuration
- Review the console output for error messages
- Ensure all dependencies are installed with `npm run install:all`
