# 💻 Laptop Tracker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)
![Node](https://img.shields.io/badge/node-v18.x-brightgreen)
![React](https://img.shields.io/badge/react-18.x-blue)
![MongoDB](https://img.shields.io/badge/mongodb-Atlas-green)

A **full-stack MERN application** for managing and tracking laptops 📦.  
Built with **MongoDB, Express.js, React, and Node.js**, it provides a simple yet powerful interface for handling laptop inventory with CRUD operations, search, filtering, and admin controls.

---

## ✨ Features
- ✅ **Laptop Management** – Add, edit, update, delete laptops  
- ✅ **Search & Filters** – Search by name, status, pagination support  
- ✅ **Admin Tools** – Toggle availability, delete with confirmation  
- ✅ **Authentication Ready** – JWT & bcrypt (backend prepared)  
- ✅ **Responsive UI** – Clean React interface  

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Context API  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication:** JWT, bcryptjs  
- **Utilities:** dotenv, morgan, cors, cookie-parser  

---

## 📸 Screenshots
> _(Add your project screenshots here for better showcase)_  

Example:  
![App Screenshot](https://via.placeholder.com/800x400.png?text=Laptop+Tracker+UI)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/laptop-tracker.git
cd laptop-tracker
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev    # Runs server with nodemon
```

Create a `.env` file inside **backend/**:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm start
```

Now open 👉 `http://localhost:3000` in your browser.

---

## 📂 Folder Structure
```
laptop-tracker/
 ├── backend/        # Node.js + Express + MongoDB
 │   ├── models/     # Mongoose schemas
 │   ├── routes/     # API routes
 │   ├── controllers # Business logic
 │   └── server.js   # Entry point
 │
 ├── frontend/       # React app
 │   ├── src/
 │   │   ├── components/  # Reusable UI components
 │   │   ├── pages/       # React pages
 │   │   └── App.js
 │
 ├── .gitignore
 ├── README.md
 └── package.json
```

---

## 🌟 Future Improvements
- Role-based access control (Admin/User)  
- Advanced analytics dashboard 📊  
- Cloud deployment (Heroku, Vercel, MongoDB Atlas)  
- Unit & integration testing  
- Dark mode support 🌙  

---

### 👨‍💻 Author
**Your Name Here**  
🔗 [GitHub](https://github.com/NimeshHasaranga) | 💼 [LinkedIn](https://linkedin.com/in/your-profile)
