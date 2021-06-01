import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
// Use local env file
dotenv.config();

// Add json and urlencoding to image file upload
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Link routes to url
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello from Samuel's Grocery Store API");
});

// Server will create their own port else set it to 5000
const PORT = process.env.PORT || 5000;

// Mongo db connect function
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
