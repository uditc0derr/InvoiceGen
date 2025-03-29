const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const emailRoutes = require("./routes/emailRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());  
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  


app.use('/api/auth', authRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
