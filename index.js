import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import fileUploadRoutes from "./routes/fileUploader.js";
import authrouter from "./routes/user.route.js";
import connectdb from "./db.js";
import { error } from "./middleware/error.middleware.js";

const app = express();
const PORT = 3000;
connectdb();

app.use(express.json());
app.use(cookieParser());

app.use("/", fileUploadRoutes);
app.use("/products", productRoutes);
app.use("/api", authrouter);

app.use(error);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
