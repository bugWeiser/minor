# 🛠️ Setup & Deployment Guide: Bugweiser

Follow these steps to get the **Bugweiser Smart Dashboard** running locally in less than 2 minutes. The project is pre-configured with a **Mock Backend**, so no API keys are required for the initial demo.

---

## 📋 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

## 🚀 2. Quick Start

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/bugWeiser/minor.git
cd minor
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Run the Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🔑 3. Demo Credentials
Because this is an **End-to-End Demo**, you can log in using these specific accounts which are pre-populated with data:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Faculty Admin** | `admin@dashboard.com` | `admin123` | Full CRUD for Notices/Assignments |
| **BBA Student** | `alice@dashboard.com` | `alice123` | Student View (BBA-Year 4) |
| **CSE Student** | `bob@dashboard.com` | `bob123` | Student View (CSE-Year 3) |

> **Note:** To switch roles, simply click 'logout' in the bottom-left profile panel and log in with a different email.

---

## 🏗️ 4. Project Structure (Key Directories)
- `/src/app/api`: Server-less mock API routes (Notices, Assignments, Events).
- `/src/lib/mockDB.ts`: In-memory database simulation (stores data during your session).
- `/src/context/AuthContext`: Handles persistence of the demo login session via LocalStorage.
- `/src/components/layout`: Core UI shell (TopBar, Sidebar, AdminForms).

---

## 🌐 5. Production Build
To test the production-ready optimized bundle:
```bash
npm run build
npm run start
```

---
**Troubleshooting:** 
If you encounter any font loading issues, ensure you have an active internet connection to fetch the **Inter** and **Outfit** font families from Google Fonts.
