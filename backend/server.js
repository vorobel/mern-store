import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./db/db.js";
import productRouter from "./router/product.route.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server running on port: ${PORT}`);
});
