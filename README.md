# Invoice Generator

A **MERN Stack** application for managing invoices, sending them via email, and printing them. This project allows business owners to create invoices, store them, and send them to customers via email.

## Features
- **User Authentication** (Login & Signup)
- **Create Invoices** with multiple products
- **Email Invoices** using Google SMTP
- **Print Invoices**
- **Search Invoices by User**

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Email Sending:** Nodemailer (Google SMTP)

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/invoice-generator.git
cd invoice-generator
```

### 2. Backend Setup
```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` and add:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection
  JWT_SECRET=your_secret_key
  SMTP_USER=your_email@gmail.com
  SMTP_PASS=your_email_password
  ```

- Start the backend server:
  ```sh
  npm start
  ```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

---

## Folder Structure
```
invoice-generator/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   ├── package.json
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── App.js
│   ├── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env
│   ├── package.json
│
└── README.md
```

---

## API Endpoints
### **Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### **Invoice Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/invoices/create` | Create an invoice |
| GET | `/api/invoices/user/:id` | Get invoices by user |
| POST | `/api/email/send` | Send invoice via email |

---

## Usage
1. **Sign Up/Login** as a business owner.
2. **Create an Invoice** by adding customer details and products.
3. **Send Invoice via Email** with a single click.
4. **Print Invoice** directly from the system.

