```bash
devconnect-api/
│
├── config/
│   └── db.js                # MongoDB connection logic
│
├── controllers/
│   └── authController.js    # Logic for register/login/profile
│
├── middleware/
│   ├── authMiddleware.js    # JWT auth middleware
│   └── errorHandler.js      # Error handler
│
├── models/
│   └── User.js              # Mongoose model for User
│
├── routes/
│   └── authRoutes.js        # Auth-related routes
│
├── .env                     # Environment variables
├── .gitignore               # Ignore node_modules, .env etc
├── package.json
├── server.js                # Main server entry point
```
