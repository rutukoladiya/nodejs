import express from "express";
import productRoutes from "./routes/productRoutes.js";
import fileUploadRoutes from "./routes/fileUploader.js";
import authrouter from "./routes/user.route.js";
import connectdb from "./db.js";

const app = express();
const PORT = 3000;
connectdb();

app.use(express.json());

app.use("/", fileUploadRoutes);
app.use("/products", productRoutes);
app.use("/api", authrouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
