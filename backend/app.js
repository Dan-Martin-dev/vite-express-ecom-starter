// app.js
import "module-alias/register.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from ",/routes/userRouter.js"; // Adjust path as needed
import productRouter from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import variantRoutes from "./routes/variantRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json()); 

// Middleware to parse form-data (required for file uploads with multer)
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

export default app;
