# 🎉 Event Booking API

A powerful and modular backend built with **Node.js** and **TypeScript** for managing events, user bookings, and user profiles. Ideal for platforms involving ticketing, event listing, and booking operations.

---

## 🚀 Features

### For Users

- ✅ Register, login, and manage profiles
- ✅ Browse and view events
- ✅ Book events and track booking status
- ✅ View personal bookings

### For Admins

- ✅ Manage events (create, update, delete)
- ✅ View and manage all user bookings
- ✅ Manage users and roles
- ✅ Role-based access (Admin/User)
- ✅ Pagination and filtering

### General

- ✅ JWT Authentication
- ✅ Centralized error handling
- ✅ DTO-based validation
- ✅ Clean modular architecture

---

## 🧾 Tech Stack

- **Runtime:** Node.js  
- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT + bcrypt  
- **Validation:** class-validator  
- **Env Management:** dotenv  
- **Documentation:** Swagger (OpenAPI 3.0)

---

## 📁 Folder Structure

```bash
src/
├── auth/           # Authentication module
├── users/          # User module
├── events/         # Event module
├── bookings/       # Booking module
├── common/         # DTOs, middleware, guards, utilities
├── config/         # App and DB configurations
└── main.ts         # Entry point



---

## 🌐 API Endpoints

### 🔐 Authentication

- `POST /api/auth/signup` - Register a new user  
- `POST /api/auth/login` - User login  
- `POST /api/auth/forgot-password` - Send password reset link  
- `POST /api/auth/reset-password` - Reset user password  

### 👤 User Management

- `GET /api/users` - Get all users (Admin only)  
- `GET /api/users/:id` - Get user details  
- `DELETE /api/users/:id` - Delete user (Admin only)  

### 🛍️ Product Management

- `GET /api/events` - Get all events  
- `POST /api/events` - Add a new event (Admin only)  
- `PUT /api/events/:id` - Update a event (Admin only)  
- `DELETE /api/events/:id` - Delete a event (Admin only)  

### 🛍️ Product Management

- `GET /api/booking` - Get all booking  (Admin only)
- `GET /api/booking/my` - Get all booking  for user 
- `POST /api/bookings` - Add a new booking  
- `patch /api/bookings/:id` - Update a booking 
- `DELETE /api/bookings/:id` - Delete a booking (Admin only)  
---

## For installation and running

- npm install
- npm run build 
- npm run start or npm run dev


## 📚 API Documentation

- OpenAPI 3.0 documentation with Swagger
- Authenticated and public routes supported
- Includes request/response examples

📎 Visit:  127.0.0.01:3000/api-docs
📎 Visit:  https://documenter.getpostman.com/view/39345066/2sAYkKJxaM
---

## 📜 License

This project is licensed under the **ISC License**.

---

## 📫 Contact

For support or inquiries:  
📧 [youssef22772002salah@gmail.com]