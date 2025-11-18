


## 📌 **Overview**

This project is a **Healthcare Wellness Portal** designed for both **patients** and **healthcare providers**.
It helps users track wellness goals (steps, sleep, active time), view reminders, access public health information, and offers a provider dashboard to monitor patient compliance.

This solution is built for rapid development, secure handling of user data, and a clean presentation using modern web technologies.

---

# ⭐ **Features**

### 👤 **Patient Features**

* Register & Login (JWT Authentication)
* View personal wellness dashboard:

  * Steps tracking
  * Sleep tracking
  * Active time tracking
* View reminders (e.g., upcoming health checkups)
* Update personal profile
* View public health information

### 🧑‍⚕️ **Provider Features**

* Dedicated provider login
* View list of all patients
* See patient wellness goal compliance (%)
  (ex: steps met, sleep goals achieved)

### 🌐 **Public Features**

* Access public health articles
* No authentication required

### 🔐 **Security Features**

* JWT-based authentication (Access + Refresh tokens)
* Role-based access control (RBAC)
* Encrypted passwords (bcrypt)
* Environment-based configuration + HTTPS deployments

---

# 🧰 **Tech Stack**

## **Frontend**

* React (Vite)
* React Router
* Axios
* CSS Modules / Sass
* Context API (Auth state)

## **Backend**

* Node.js + Express
* MongoDB + Mongoose
* Bcrypt (password hashing)
* JSON Web Token (JWT)
* Morgan (logging)
* CORS + Cookie-parser
* Dotenv

## **Deployment**

* Frontend → **Vercel / Netlify**
* Backend → **Render / Railway / Heroku**
* Database → **MongoDB Atlas**

---

# 🏗️ **High-Level Architecture**

```
┌────────────────────────────┐        ┌─────────────────────────────┐
│         Frontend           │        │           Backend            │
│    React + Vite + Axios    │ <----> │  Node.js + Express + JWT     │
│  (Auth UI, Dashboards)     │  API   │   (Auth, RBAC, API logic)    │
└────────────────────────────┘        └─────────────────────────────┘
                       │                               │
                       ▼                               ▼
               Browser Context              MongoDB Atlas (NoSQL Database)
             (Token + Session State)       (Users, Goals, Reminders, Activity)
```

---

# 🔄 **Feature Workflows**

## 1️⃣ **Authentication Workflow (Login)**

1. User submits email + password
2. Backend verifies user in MongoDB
3. Backend responds with:

   * `accessToken`
   * `refreshToken`
4. Frontend stores tokens in Context
5. Authenticated user redirected to dashboard

---

## 2️⃣ **Patient Dashboard Workflow**

1. User opens `/dashboard`
2. Frontend sends request with JWT:

   ```
   GET /api/patients/me
   ```
3. Backend validates token
4. Backend returns:

   * goals
   * activity
   * reminders
5. React shows personalized dashboard

---

## 3️⃣ **Provider Dashboard Workflow**

1. Provider logs in
2. Visits `/provider`
3. Frontend sends:

   ```
   GET /api/providers/patients
   ```
4. Middleware checks:

   * JWT valid?
   * role === "provider"?
5. Backend aggregations return list of patients + compliance
6. Frontend displays compliance cards

---

## 4️⃣ **Public Articles Workflow**

1. User visits `/public`
2. API call:

   ```
   GET /api/public/articles
   ```
3. Backend returns static article data
4. React renders 3 article cards

---

# 🗄️ **Database Schemas**

## **User Schema**

```json
{
  "name": "David",
  "email": "david@gmail.com",
  "passwordHash": "...",
  "role": "patient",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## **Goal Schema**

```json
{
  "userId": "ref to User",
  "type": "steps",
  "target": 6000,
  "current": 3200,
  "unit": "steps",
  "createdAt": "..."
}
```

## **Reminder Schema**

```json
{
  "userId": "ref to User",
  "title": "Annual blood test",
  "date": "2025-01-23",
  "sent": false
}
```

## **Activity Schema**

```json
{
  "userId": "ref to User",
  "steps": 3500,
  "activeMinutes": 52,
  "sleepMinutes": 390,
  "date": "2025-02-20"
}
```

## **Public Article Schema**

```json
{
  "title": "COVID-19 Updates",
  "description": "Latest vaccination and guidelines.",
  "url": "https://.."
}
```

---

# 📁 **Project Folder Structure**

```
/project-root
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── router
│   │   ├── styles
│   │   └── utils
│   ├── Dockerfile
│   └── package.json
│
└── backend
    ├── src
    │   ├── config
    │   ├── controllers
    │   ├── routes
    │   ├── models
    │   ├── middleware
    │   ├── utils
    │   ├── seed
    │   ├── app.js
    │   └── server.js
    ├── Dockerfile
    └── package.json
```

---

# 🌐 **API Overview**

### **Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/refresh`

### **Patients**

* `GET /api/patients/me`
* `GET /api/patients/goals`
* `POST /api/patients/goals`
* `POST /api/patients/reminders`

### **Providers**

* `GET /api/providers/patients`
* `GET /api/providers/patients/:id`

### **Public**

* `GET /api/public/articles`

---

# 🚀 **Deployment**

### Frontend

* Deploy on **Vercel / Netlify**
* Environment variable:

  ```
  VITE_API_URL=<backend-url>
  ```

### Backend

* Deploy on **Render / Railway / Heroku**
* Add environment variables:

  ```
  MONGO_URI=
  JWT_SECRET=
  REFRESH_SECRET=
  ```

### Database

* MongoDB Atlas → free cluster
* IP Whitelisting → “Allow from anywhere” for hackathon

---

# 🙌 **Final Notes**

* Built with modular architecture for clarity & scalability
* Follows modern best practices (JWT, RBAC, HTTPS, NoSQL design)
* Ready for demo, deployment, or extension


