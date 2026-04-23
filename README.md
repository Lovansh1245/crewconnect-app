# Student Team Members Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing student team members. Add, view, and explore detailed profiles of each team member with profile photo upload support.

---

## 📋 Project Description

This application allows teams to manage their student members through a clean, modern interface. Users can:
- Add new team members with name, role, email, contact, and a profile photo
- Browse all registered members in a responsive card grid
- View detailed profiles for each member

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, React Router DOM, Axios |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB (via Mongoose)            |
| File Upload| Multer                            |
| Styling    | Vanilla CSS                       |

---

## 📁 Project Structure

```
fsd-assignment/
├── backend/
│   ├── models/
│   │   └── Member.js          # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js    # API routes
│   ├── uploads/               # Uploaded profile images
│   ├── server.js              # Express server entry point
│   ├── .env                   # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── AddMember.js
│   │   │   ├── ViewMembers.js
│   │   │   └── MemberDetails.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017)
- npm (comes with Node.js)

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fsd-assignment
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (if not already present):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_team_db
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ How to Run

### Start MongoDB
Make sure your local MongoDB instance is running:
```bash
mongod
```
> Or use MongoDB Compass to start a connection to `mongodb://127.0.0.1:27017`

### Start the Backend (Terminal 1)

```bash
cd backend
npm start
```
Server runs at: **http://localhost:5000**

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm start
```
App runs at: **http://localhost:3000**

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                  | Body / Params              |
|--------|----------------------|------------------------------|----------------------------|
| GET    | `/api/members`       | Fetch all team members       | —                          |
| POST   | `/api/members`       | Add a new member             | `multipart/form-data` (name, role, email, contact, image) |
| GET    | `/api/members/:id`   | Fetch a single member by ID  | `:id` — MongoDB ObjectId   |

### Example Response — GET `/api/members`

```json
[
  {
    "_id": "664abc123...",
    "name": "Ritul Shekhar",
    "role": "Team Lead",
    "email": "ritul@example.com",
    "contact": "+91 9876543210",
    "image": "1716000000000.jpg",
    "createdAt": "2024-05-18T10:00:00.000Z"
  }
]
```

---

## 🖼 Image Handling

- Images are uploaded via `multipart/form-data` (field name: `image`)
- Stored in `backend/uploads/` with a timestamp-based filename
- Served statically at: `http://localhost:5000/uploads/<filename>`

---

## 📌 Notes

- Ensure MongoDB is running before starting the backend
- The `uploads/` folder is excluded from Git (images are not tracked)
- `.env` is excluded from Git for security

---

## 👥 Team

Built as part of a Full Stack Development (FSD) assignment.
