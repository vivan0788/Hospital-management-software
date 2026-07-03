# Hospital Management System (HMS) - Frontend Client

This is the production-ready frontend client for the Hospital Management System (HMS), built using React.js. It features a responsive dashboard layout, centralized authentication management, and dynamic Role-Based Access Control (RBAC) customized for Admins, Doctors, Receptionists, and Patients.

---

## 🛠️ Tech Stack & Key Libraries

* **UI Framework:** React.js (v18+)
* **State Management:** React Context API (Clean & Scalable)
* **API Client:** Axios (With automatic JWT bearer token injection)
* **Build Tool:** Create React App (CRA Engine)

---

## 📂 Features Implemented

* **Dynamic Sidebar System:** Changes navigation options instantly based on the logged-in user's role.
* **Central Session Watcher:** Persists authentication state via LocalStorage and handles secure automatic sign-out.
* **Admin Workspace Dashboard:** Displays core analytical health statistics (Total Patients, Doctors, and Revenue).
* **Doctor Clinical Queue:** Lists today's real-time appointments sorted by token/queue numbers.
* **Patient Health Record:** Allows patients to view their medical profile setup securely.

---

## ⚙️ Environment Configuration

Before launching or building the application, ensure you link it to your active backend deployment. Create or verify your environment setup:

Create a variable or update your endpoints in `src/services/api.js`:
```env
REACT_APP_API_URL=[https://your-backend-url.vercel.app/api](https://your-backend-url.vercel.app/api)
