# 💻 Laptop Tracker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)
![Node](https://img.shields.io/badge/node-v18.x-brightgreen)
![React](https://img.shields.io/badge/react-19.x-blue)
![MongoDB](https://img.shields.io/badge/mongodb-Atlas-green)

A **comprehensive full-stack MERN application** for managing and tracking laptops 📦.  
Built with **MongoDB, Express.js, React, and Node.js**, it provides a powerful interface for handling laptop inventory with advanced analytics, role-based access control, and comprehensive audit trails.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- ✅ **Role-based Access Control** - Admin and Staff roles with different permissions
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **User Management** - Admin can create, activate/deactivate users
- ✅ **Secure Password Hashing** - bcryptjs for password security

### 💻 **Laptop Management**
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete laptops
- ✅ **Advanced Search & Filtering** - Search by serial number, model, department, status
- ✅ **Pagination Support** - Efficient data handling for large datasets
- ✅ **Software Tracking** - Track up to 10 software installations per laptop
- ✅ **Warranty Management** - Track purchase dates and warranty expiry
- ✅ **Asset Management** - Asset tags, computer names, department assignments

### 📊 **Analytics & Dashboards**
- ✅ **Admin Dashboard** - Comprehensive analytics with 9 different chart types
- ✅ **User Dashboard** - Staff-focused metrics and quick actions
- ✅ **Real-time Statistics** - KPI cards with gradient designs
- ✅ **Visual Charts** - Pie charts, bar charts, line charts, area charts
- ✅ **Department Distribution** - Track laptops by department
- ✅ **Software Installation Stats** - Monitor software deployment
- ✅ **Warranty Expiry Tracking** - Visual timeline of upcoming expirations
- ✅ **Monthly Trends** - Track laptop additions over time

### 📋 **Audit & Compliance**
- ✅ **Complete Audit Trail** - Track all changes to laptops and users
- ✅ **Change Tracking** - Detailed diff logging for updates
- ✅ **User Activity Logging** - Login and action tracking
- ✅ **Compliance Reporting** - Office license type tracking

### 🎨 **User Experience**
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern UI** - Clean, intuitive interface with hover effects
- ✅ **Color-coded KPIs** - Gradient backgrounds for visual appeal
- ✅ **Interactive Charts** - Powered by Recharts library
- ✅ **Loading States** - Smooth user experience during data fetching

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.x** - Modern React with hooks
- **React Router 7.x** - Client-side routing
- **Recharts 3.x** - Data visualization and charts
- **Axios** - HTTP client for API calls
- **CSS-in-JS** - Styled components for dynamic styling

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js 5.x** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 8.x** - Object Data Modeling (ODM)
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### **Development Tools**
- **Nodemon** - Auto-restart development server
- **React Scripts** - React development and build tools

---

## 📸 Screenshots & Features

### **Dashboard Overview**
- **Admin Dashboard**: Comprehensive analytics with 9 chart types
- **User Dashboard**: Staff-focused metrics and quick actions
- **KPI Cards**: Color-coded gradient cards with hover effects
- **Real-time Data**: Live statistics and charts

### **Laptop Management**
- **List View**: Searchable, filterable, paginated laptop list
- **Form View**: Intuitive laptop creation and editing
- **Status Tracking**: Visual status indicators (Received, In Setup, Configured, Handed Over, Retired)
- **Software Management**: Track installed and pending software

### **User Management (Admin Only)**
- **User Creation**: Add new users with role assignment
- **Role Management**: Switch between admin and staff roles
- **Activity Monitoring**: Track last login and user status

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB Atlas account (for cloud database)

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/NimeshHasaranga/Laptop_Tracker.git
cd Laptop_Tracker
```

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:3000

# Initial admin user (will be created automatically if missing)
ADMIN_USERNAME=admin
ADMIN_TA=TA-ADMIN-001
```

### **3️⃣ Frontend Setup**
```bash
cd frontend
npm install
```

### **4️⃣ Run Development Servers**

Start Backend (in terminal 1):
```bash
cd backend
npm run dev    # Runs server with nodemon on port 5000
```

Start Frontend (in terminal 2):
```bash
cd frontend
npm start      # Runs React app on port 3000
```

Now open 👉 `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```
Laptop_Tracker/
├── backend/                    # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Business logic handlers
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── laptopController.js
│   │   │   └── userController.js
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── ensureAdmin.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── AuditLog.js
│   │   │   ├── Laptop.js
│   │   │   └── User.js
│   │   ├── routes/           # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── laptopRoutes.js
│   │   │   └── userRoutes.js
│   │   └── utils/           # Utility functions
│   │       ├── auditLogger.js
│   │       ├── diff.js
│   │       └── ensureAdmin.js
│   ├── scripts/              # Database seeding and utilities
│   │   └── seedData.js      # Sample data generator
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Backend entry point
│
├── frontend/                 # React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/             # API service functions
│   │   │   ├── auth.js
│   │   │   ├── http.js
│   │   │   ├── laptops.js
│   │   │   └── users.js
│   │   ├── components/      # Reusable UI components
│   │   │   └── Navbar.jsx
│   │   ├── pages/           # React page components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LaptopForm.jsx
│   │   │   ├── LaptopList.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── App.js          # Main app component with routing
│   │   └── index.js        # React DOM entry point
│   ├── package.json
│   └── README.md
│
├── .gitignore              # Git ignore rules
└── README.md              # This file
```

---

## 🔐 Default Login Credentials

After running the seed script, you can use these credentials:

### **Admin Access**
- **Username**: `admin`
- **Log Number**: `TA-ADMIN-001`

### **Staff Access**
- **Username**: `tech1`
- **Log Number**: `TA-TECH-001`

### **Additional Users**
- **tech2**: `TA-TECH-002`
- **tech3**: `TA-TECH-003`
- **manager1**: `TA-MGR-001`
- **intern1**: `TA-INT-001`

---

## 📊 Database Seeding

To populate your database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- **6 Users** with different roles
- **12 Laptops** with various statuses and departments
- **4 Audit Logs** for tracking changes
- **Comprehensive Software** installations across laptops

---

## 🚀 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### **Dashboard**
- `GET /api/dashboard` - Get dashboard analytics

### **Laptops**
- `GET /api/laptops` - List laptops (with pagination, search, filters)
- `POST /api/laptops` - Create new laptop
- `GET /api/laptops/:id` - Get single laptop
- `PATCH /api/laptops/:id` - Update laptop
- `DELETE /api/laptops/:id` - Delete laptop (admin only)

### **Users (Admin Only)**
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user
- `GET /api/users/profile` - Get user profile

---

## 📈 Data Models

### **Laptop Schema**
```javascript
{
  serialNumber: String (required, unique),
  assetTag: String,
  make: String,
  model: String,
  computerName: String,
  department: String,
  assignedUserName: String,
  officeLicense: {
    type: String (O365|Volume|OEM|None),
    activated: Boolean
  },
  jobNo: String,
  technician: ObjectId (ref: User),
  status: String (received|in-setup|configured|handed-over|retired),
  purchaseDate: Date,
  warrantyExpiry: Date,
  software: [{
    name: String,
    installed: Boolean,
    version: String,
    installedAt: Date,
    installedBy: ObjectId (ref: User)
  }],
  domainConfigured: Boolean,
  handedOver: Boolean,
  assetLabeled: Boolean,
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User)
}
```

### **User Schema**
```javascript
{
  username: String (required, unique),
  taNumber: String (required, hashed),
  role: String (admin|staff),
  isActive: Boolean,
  lastLoginAt: Date
}
```

---

## 🎯 Key Features Deep Dive

### **Analytics Dashboard**
- **9 Different Chart Types**: Pie, Bar, Line, Area charts
- **Real-time KPIs**: Color-coded cards with gradients
- **Department Analytics**: Laptop distribution by department
- **Software Tracking**: Installation status and progress
- **Warranty Management**: Expiry timeline and warnings
- **Monthly Trends**: Laptop addition patterns
- **User Statistics**: Active users and role distribution

### **Security Features**
- **JWT Authentication**: Stateless token-based auth
- **Role-based Authorization**: Admin vs Staff permissions
- **Password Security**: bcrypt hashing with salt rounds
- **Audit Trail**: Complete change tracking
- **Input Validation**: Server-side validation for all inputs

### **Performance Optimizations**
- **Database Indexing**: Optimized queries for search and filtering
- **Pagination**: Efficient data loading for large datasets
- **Aggregation Pipelines**: Complex analytics queries
- **Caching Ready**: Structure supports future caching implementation

---

## 🌟 Future Enhancements

### **Planned Features**
- 📱 **Mobile App** - React Native mobile application
- 🔔 **Real-time Notifications** - WebSocket integration
- 📊 **Advanced Analytics** - Machine learning insights
- 🌐 **Multi-tenant Support** - Multiple organizations
- 📄 **Report Generation** - PDF/Excel export functionality
- 🔄 **Data Import/Export** - Bulk operations
- 🌙 **Dark Mode** - Theme switching
- 📧 **Email Notifications** - Automated alerts
- 🗂️ **File Attachments** - Document management
- 📍 **Location Tracking** - GPS/asset tracking

### **Technical Improvements**
- 🧪 **Unit & Integration Testing** - Jest, React Testing Library
- 🚀 **Performance Monitoring** - APM integration
- 📦 **Microservices Architecture** - Service decomposition
- 🔒 **OAuth Integration** - Google, Microsoft SSO
- 📊 **Business Intelligence** - Power BI, Tableau integration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nimesh Hasaranga**  
🔗 [GitHub](https://github.com/NimeshHasaranga) | 💼 [LinkedIn](https://linkedin.com/in/nimesh-hasaranga)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **MongoDB** - For the powerful database solution
- **Recharts** - For the beautiful charting library
- **MERN Stack Community** - For the excellent documentation and resources

---

## 📞 Support

If you have any questions or need support, feel free to:
- Open an issue on GitHub
- Contact the author directly
- Check the documentation for common solutions

**Happy Coding! 🚀**
