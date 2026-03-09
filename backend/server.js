require("dotenv").config();


const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const {protect, adminOnly} = require("./middleware/authMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");



const app = express();

//connect DB
connectDB();

app.use(cors({
    origin: "https://mediswift-frontend-62cb.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


//error middleware
app.use(errorHandler);

app.get("/", (req,res) =>{
    res.send("medicine Delivey App is working");
});

app.get("/api/test-admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted successfully" });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});


