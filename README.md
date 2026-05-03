# 💰 Expense Tracker (Full Stack)

A full-stack Expense Tracker web application that allows users to manage income and expenses with authentication, real-time updates, and data visualization.

---

##  Features

* 🔐 User Authentication (Register & Login with JWT)
* ➕ Add income and expense transactions
* ❌ Delete transactions
* 📊 Dashboard showing balance, income, and expenses
* 📈 Charts for expense visualization
* 🔒 Protected routes (only logged-in users can access data)
* 💾 Data stored in MySQL database

---

## 🛠️ Tech Stack

### Frontend

* React
* CSS
* Recharts

### Backend

* Node.js
* Express.js
* MySQL
* JWT (Authentication)
* bcrypt (Password hashing)

---

## 📂 Project Structure

expense-tracker/
│
├── client/        # React frontend
├── server/        # Node.js backend
├── .gitignore
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/adharshts/expense-tracker.git
cd expense-tracker

---

### 2️⃣ Backend Setup

cd server
npm install

Create a `.env` file inside the server folder:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
JWT_SECRET=secretkey

Run backend:

npx nodemon index.js

---

### 3️⃣ Frontend Setup

cd client
npm install
npm start

---

## 🗄️ Database Schema

### Users Table

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255),
password VARCHAR(255)
);

---

### Transactions Table

CREATE TABLE transactions (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
amount INT,
type VARCHAR(10),
category VARCHAR(50),
date DATE
);

---

## 🔐 Authentication Flow

* User registers → password is hashed using bcrypt
* User logs in → receives JWT token
* Token is stored in localStorage
* Token is sent in API requests
* Backend verifies token before giving access

---

## 🌟 Future Improvements

* 📱 Responsive mobile design
* 📅 Filter transactions by date/category
* 👤 User-specific data (multi-user support)
* ☁️ Deployment (Vercel + Render)
* 📊 Advanced analytics & reports

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and improve it.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Adharsh
GitHub: https://github.com/adharshts
