# Expenseer Tracker

Expenseer is a modern expense tracking and budgeting platform designed to simplify personal finance management. It empowers users to monitor spending, set savings goals, and gain actionable insights through intuitive dashboards and real-time analytics. The platform features secure user authentication, multi-device sync, and smart categorization for effortless money management.  

---

## Features  

- **User Authentication:** Secure sign-up/login with JWT, Google OAuth, and role-based access (user/admin).  
- **Expense Tracking:** Log and categorize transactions with auto-detection (e.g., food, bills, travel).  
- **Budget Management:** Set monthly budgets with alerts for overspending.  
- **Visual Analytics:** Interactive charts (pie/bar graphs) for spending patterns.  
- **Multi-Wallet Support:** Track cash, bank accounts, and digital wallets in one place.  
- **Report Generation:** Export PDF/CSV reports for taxes or personal review.  
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.  

---

## Tools & Technologies  

### **Frontend**  
- **React.js** + **Vite** (Fast UI rendering)  
- **Redux Toolkit** (State management)  
- **TailwindCSS** + **DaisyUI** (Styling)  
- **Chart.js** (Data visualization)  
- **Axios** (API calls)  

### **Backend**  
- **Node.js** + **Express.js** (REST API)  
- **MongoDB** (Database with Mongoose ODM)  
- **JWT** (Authentication)  
- **Cloudinary Storage** (Receipt/image uploads)  

### **DevOps**  
- **Vercel** (Frontend hosting)  
- **Render** (Backend deployment)  
- **GitHub Actions** (CI/CD)  

---

## Live Demo  
Access the deployed project: [https://expenseer.vercel.app](https://expenseer.vercel.app)  

---

## Getting Started  

1. **Clone the repo:**  
   ```bash
   git clone https://github.com/afsify/expenseer-tracker.git
   ```

2. **Set up environment variables:**  
   - Rename `.env.sample` to `.env` and populate keys:  
     ```bash
     # Frontend
     VITE_API_URL=http://localhost:5000

     # Backend
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     ```

3. **Install dependencies & run:**  
   ```bash
   cd client && npm install && npm start  # Frontend (http://localhost:3000)
   cd server && npm install && npm start    # Backend (http://localhost:5000)
   ```

---

## Contributing  
Pull requests welcome! Open an issue first to discuss changes.  
