# Housekeeping SaaS

A modern housekeeping SaaS tool with Kanban UI, built with Angular, Node/Express backend, and Firebase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-17-red.svg)
![Node](https://img.shields.io/badge/Node-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)

## 🚀 Features

- **Kanban Board Interface** - Intuitive drag-and-drop task management
- **Real-time Updates** - Firebase integration for instant synchronization
- **User Authentication** - Secure Firebase authentication with role-based access
- **Task Management** - Create, update, delete, and organize tasks
- **Priority & Status Tracking** - Manage task priorities and workflow stages
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **RESTful API** - Clean and documented API endpoints
- **TypeScript** - Type-safe development across the stack

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Documentation](#-documentation)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Technology Stack

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **SCSS** - Advanced styling
- **Firebase SDK** - Authentication and Firestore

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Firebase Admin SDK** - Server-side Firebase integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database & Authentication
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication service

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
housekeeping-saas/
├── frontend/                    # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # UI components
│   │   │   │   ├── kanban-board/
│   │   │   │   ├── task-card/
│   │   │   │   ├── navbar/
│   │   │   │   └── auth/
│   │   │   ├── services/       # Business logic services
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   ├── environments/       # Environment configs
│   │   └── styles/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── backend/                     # Express API server
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth & validation
│   │   ├── config/             # Configuration
│   │   ├── models/             # Data models
│   │   └── server.ts           # Entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── docs/                        # Documentation
│   ├── API.md                  # API documentation
│   ├── SETUP.md                # Setup guide
│   └── ARCHITECTURE.md         # Architecture details
├── README.md
├── .gitignore
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/housekeeping-saas.git
   cd housekeeping-saas
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Download service account credentials

3. **Set up Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your Firebase credentials
   npm run dev
   ```

4. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   # Edit src/environments/environment.ts with your Firebase config
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:4200
   - Backend: http://localhost:3000
   - Health check: http://localhost:3000/health

### Docker Setup

```bash
docker-compose up --build
```

For detailed setup instructions, see [SETUP.md](./docs/SETUP.md).

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation and configuration
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Create user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/user/:userId` - Get user's tasks

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

For complete API documentation, see [API.md](./docs/API.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Firebase for authentication and database services
- Express.js community for the robust backend framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Angular, Express, and Firebase**
