
<p align="center">
  <img src="./server/LOGO.png" alt="I-Note Logo" width="240"/>
</p>

<p align="center">
  <b>Modern SaaS Note Management Application built with MERN Stack</b><br/>
  Create, manage, and organize notes with task priorities and secure authentication.
</p>

---

## Badges

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Node](https://img.shields.io/badge/Backend-Node.js-lightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![License](https://img.shields.io/badge/License-MIT-black)
![Status](https://img.shields.io/badge/Project-Active-success)

---

## Overview

I-Note is a SaaS-based note management platform that allows users to create, organize, and manage their notes efficiently with priority levels and secure authentication.

The application is built using the MERN stack and follows a scalable architecture suitable for real-world SaaS products.

Main focus of the project:

* Secure authentication system
* User-based note management
* Priority-based task organization
* Clean dashboard
* Scalable backend architecture
* Protected routes
* SaaS-ready structure

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Cookie-based authentication

### Database

* MongoDB with Mongoose

---

## Features

### Authentication System

* Signup
* Login
* Logout
* JWT Authentication
* HTTP-only cookies
* Protected routes
* Email verification (planned)
* Forgot password (planned)

### Notes Management

* Create notes
* Update notes
* Delete notes
* Drag and drop notes
* Priority levels
* User-specific notes
* Secure CRUD operations

### Dashboard

* Protected dashboard
* Session management
* Responsive interface
* Organized notes display

---

## Project Structure

```
I-Note/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── LOGO.png
│   └── server.js
│
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/i-note.git
cd i-note
```

### 2. Install dependencies

Client

```bash
cd client
npm install
```

Server

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## Run the Application

Start backend

```bash
cd server
npm run dev
```

Start frontend

```bash
cd client
npm start
```

---

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get connection string
5. Add it to `.env`

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inote
```

---

### Backend Deployment (Render)

1. Push project to GitHub
2. Go to Render
3. Create new Web Service
4. Connect GitHub repository
5. Set root directory to:

```
server
```

6. Add environment variables

```
MONGO_URI
JWT_SECRET
CLIENT_URL
NODE_ENV=production
```

7. Start command

```
npm start
```

Backend will be deployed.

---

### Frontend Deployment (Vercel)

1. Go to Vercel
2. Import GitHub repository
3. Select client folder
4. Add environment variable

```
VITE_API_URL=https://your-render-backend-url
```

5. Deploy

Frontend will be live.

---

## Application Flow

1. User creates an account
2. User logs in
3. JWT token stored in HTTP-only cookie
4. Protected dashboard becomes accessible
5. User creates and manages notes
6. Notes are stored in MongoDB
7. Each user manages only their own data

---

## Security

* JWT Authentication
* HTTP-only cookies
* Protected routes
* Environment variables
* Backend validation
* User-specific data isolation

---

## Future Improvements

* Email verification
* Forgot password system
* Notes categories
* Team collaboration
* Notifications
* SaaS subscription system
* Admin dashboard
* Cloud storage
* API rate limiting

---

## Logo

Project logo is located in:

```
server/LOGO.png
```

---

## Author

Ayoub Ameur

Email: [ayoubyameury@gmail.com](mailto:ayoubyameury@gmail.com)
LinkedIn: https://linkedin.com/in/ayoub-ameur-772a70362

---

## License

This project is licensed under the MIT License.

---

## Support

If you find this project useful, consider giving it a star on GitHub.
