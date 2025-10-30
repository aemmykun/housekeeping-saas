require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { initializeFirebase } = require('./config/firebase.config');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Import routes
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');

// Initialize Firebase
initializeFirebase();

// Create Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Housekeeping SaaS API'
  });
});

// API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'Housekeeping SaaS API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      tasks: '/api/tasks',
      auth: '/api/auth'
    }
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║   Housekeeping SaaS API Server                ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
  ║   Port: ${PORT}                                  ║
  ║   CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:4200'}  ║
  ╚═══════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
