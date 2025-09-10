# 🚀 Cognifyz Technologies – Full-Stack Development Internship Tasks

This repository contains all the completed tasks (Beginner → Expert) for the **Full-stack Development Internship at Cognifyz Technologies**.
The project demonstrates a progression from **basic HTML forms** to **database integration, authentication, and external API consumption**.

---

## 📂 Folder Structure

```
.
├── Task1-HTML-Form
├── Task2-Validation
├── Task3-Responsive-Design
├── Task5-API-Integration
├── Task6-Database-Auth
├── Task7-Weather-API
└── README.md
```

---

## 🛠️ Technologies Used

* **Frontend**: HTML, CSS, Bootstrap, JavaScript, EJS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JWT, bcryptjs
* **External APIs**: OpenWeather API
* **Others**: dotenv, body-parser

---

## 📌 Tasks Overview

### 🔹 Task 1 – HTML Structure + Basic Server Interaction

* Built a simple HTML form (Name, Email, Message).
* Node.js + Express server with a POST route.
* Rendered dynamic pages using EJS.

### 🔹 Task 2 – Inline Styles + Basic Interaction + Validation

* Added **client-side validation** (required fields, email format).
* Added **server-side validation**.
* Stored submitted data in an **in-memory array**.

### 🔹 Task 3 – Advanced CSS Styling + Responsive Design

* Styled the form using **Bootstrap**.
* Added responsiveness for mobile/tablet.
* Implemented **animations/transitions** for smooth UI.

### 🔹 Task 5 – API Integration + Front-End Interaction

* Created a **RESTful API** (CRUD for form submissions).
* Used **Fetch API** on frontend to display data dynamically.
* Implemented **View All Submissions**.

### 🔹 Task 6 – Database Integration + Authentication

* Connected backend to **MongoDB (Mongoose)**.
* Stored form submissions in the database.
* Implemented:

  * **User Registration**
  * **Login with bcryptjs**
  * **JWT Authentication** to protect routes.

### 🔹 Task 7 – External API Integration (Expert Level)

* Integrated **OpenWeather API**.
* Fetches weather data (by city name).
* Displays temperature, humidity, condition, and weather icon.
* Added **error handling** (invalid key / city not found).

---

## ⚡ Setup & Installation

Clone the repository:

```bash
git clone https://github.com/your-username/cognifyz-fullstack-tasks.git
cd cognifyz-fullstack-tasks
```

Install dependencies (for Task5+ which use Express/MongoDB):

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **root** folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cognifyz_fullstack
JWT_SECRET=your_jwt_secret_here
PORT=3000
OPENWEATHER_API_KEY=your_openweather_api_key
```

---

## ▶️ Running the Project

Start the server:

```bash
npm start
```

Open in browser:

```
http://localhost:3000
```

---

## 🔑 Routes Overview

### UI Pages

* `/` → Home page with form
* `/submissions` → Manage submissions (CRUD)
* `/register` → User registration
* `/login` → User login
* `/weather` → Weather info page

### API Endpoints

* `POST /register` → Register user
* `POST /login` → Login user
* `GET /api/submissions` → Get user submissions
* `POST /api/submissions` → Add submission
* `DELETE /api/submissions/:id` → Delete submission
* `GET /api/weather?city=CityName` → Fetch weather data (JWT protected)

---


## 🎯 Conclusion

This project demonstrates the journey from **basic form handling** → **REST APIs** → **database integration with authentication** → **external API integration**, covering the **full MERN stack development lifecycle**.

---

## 👩‍💻 Author

**Sayli Santosh Kulkarni**

* 🌐 [LinkedIn](([https://www.linkedin.com/in/sayli-kulkarni-b73267331/]))
* 💻 MERN Stack | JavaScript | Full-Stack Development
