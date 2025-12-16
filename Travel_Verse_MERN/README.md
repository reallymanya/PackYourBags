# TravelVerse 🌍🗺️

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)](https://mern.dev)
[![JWT Auth](https://img.shields.io/badge/Security-JWT%20Auth-orange)](https://jwt.io)

A full-featured travel platform offering secure bookings, personalized experiences, and comprehensive tour management.




## 🔥 Key Features

### **Authentication & Security**
- 🔐 **JWT-based User Authentication**
- 🌐 **Google OAuth 2.0 Integration**
- ✉️ **Email Verification System**
- 🔄 **Password Reset & Recovery**
- 🛡️ **Role-Based Authorization** (User/Admin)

### **User Experience**
- 🌓 **Dark/Light Theme Toggle**
- 🎯 **Personalized Tour Recommendations**
- 🔍 **Advanced Search Filters**:
  - Country/Region
  - Price Range
  - Duration
  - Interest Tags (Adventure, Cultural, etc.)
  - Rating Threshold
- ⭐ **Interactive Rating & Review System**
- 📅 **Real-Time Availability Calendar**

### **Booking System**
- 💳 **Secure Payment Integration** (Stripe/Razorpay)
- 📧 **Booking Confirmation Emails**
- 📦 **Booking History & Management**
- 🚨 **Last-Minute Deal Alerts**

### **Tour Management**
- 📸 **Rich Tour Details** with 360° Virtual Tours
- 📍 **Interactive Location Maps** (Google Maps API)
- 📊 **Tour Analytics Dashboard**
- 📝 **Dynamic Itinerary Planner**

## 🛠 Tech Stack

### **Frontend**
- React.js
- Redux Toolkit for State Management
- React Router v6
- Framer Motion
- Tailwind CSS + Flowbite + Bootstrap


### **Backend**
- Node.js & Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Passport.js (Google OAuth)
- Nodemailer (Email Service)


### **Services**

- MongoDB Atlas (Cloud Database)
- Render/Vercel (Cloud Hosting)

### **Advanced Search Architecture**

Elasticsearch-powered Query Engine

GeoJSON-based Location Filtering

Tag-based Recommendation System

Cached Search Results

Review System
5-Star Rating with Half-Star Support

Verified Purchaser Reviews

Admin Moderation Panel

Review Analytics Dashboard

## **📸 Feature Showcase **

**1. Homepage(Light Theme)**
![image](https://github.com/user-attachments/assets/9d434387-b875-4300-8150-879f02622fe2)

**2. Homepage(Dark Theme)**
![image](https://github.com/user-attachments/assets/00f5c932-6b46-47d9-a2dc-60f53f4ab09b)
![image](https://github.com/user-attachments/assets/1e59098e-516c-44d9-90ca-3e5b2a728d71)
![image](https://github.com/user-attachments/assets/7e44570d-dfbf-4c0e-b1ec-d08a822f78ac)
![image](https://github.com/user-attachments/assets/755301cd-9f25-419f-b879-12928468e7cd)




**3. Home page mobile view(Dark Theme)**
![image](https://github.com/user-attachments/assets/8beb4b9d-9c98-499d-9ab7-32ac94b757cb)


**5. tours List(Dark Theme)**
![image](https://github.com/user-attachments/assets/2314c64d-53a2-4814-b422-0be981053a71)

**6. tour details and booking(Dark Theme)**
![image](https://github.com/user-attachments/assets/dab05903-eec3-451b-bc40-ea3d4967ca54)

**7. Login(Dark Theme)**
![image](https://github.com/user-attachments/assets/f071149d-e265-4f53-87b5-03a6d863bed5)









## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** v18+
- **MongoDB** (Local or Atlas)
- **Google Cloud Console Account** (for OAuth)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/SiddhantVgaikwad/Travel_Verse_MERN.git
cd Travel_Verse_MERN
```

#### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_email_address_for_nodemailer
EMAIL_PASS=your_email_app_password
```



Start the backend server:

```bash
npm run dev
```

#### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend application:

```bash
npm start
```
