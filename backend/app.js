// app.js
import "module-alias/register.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";


import subcategoryRouter from "./routes/subcategoryRouter.js";
/* import variantRouter from "./routes/variantRouter.js";
import imageRouter from "./routes/imageRouter.js";
import cartRouter from "./routes/cartRouter.js";
 */
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
app.use("/api/categories", categoryRouter)


app.use("/api/subcategories", subcategoryRouter);
/* app.use("/api/variants", variantRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/cart", cartRoutes);  */


export default app;
