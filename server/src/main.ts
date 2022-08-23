require("dotenv-defaults").config();

import express from "express";
import cors from "cors";
import connection from "./database"
import productsRouter from "./routes/products";
import reviewRouter from "./routes/review";
import databaseRouter from "./routes/database";
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRouter);
app.use("/review", reviewRouter);
app.use("/database", databaseRouter);


connection.asPromise().then(() => {
    app.listen(process.env.PORT);
})

