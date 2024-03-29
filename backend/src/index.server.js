const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

///routes importing
const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const employeeRoutes = require("./routes/employee");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const inventoryRoutes = require("./routes/inventory");
const feedbackRoutes = require("./routes/feedback");
const purchaseRoutes = require("./routes/purchase");
const contactRoutes = require("./routes/contact");
const adminOrderRoutes = require("./routes/admin/order.routes");
const initialDataRoutes = require("./routes/admin/initialData");
const { addOrder } = require("./controller/order");

//environment variable or you can say constants
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kc5l7iw.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    

).then(() =>{
    console.log("Database connected");
} );

//middleware (to manupulate data in req)
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", employeeRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", contactRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", adminOrderRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", addOrder);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});



