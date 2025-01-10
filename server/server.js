import {config} from "dotenv";
import express from "express";
import listRoutes from "./routes/list.routes.js"
import connectDB from "./config/db.connection.js";
import {errorHandler} from "./middleware/error.middleware.js";
import cors from 'cors'


const app = express();

app.use(cors())
app.use(express.json());

config();

app.use("/shows", listRoutes)
app.use(errorHandler)

const port = process.env.port || 3434;
connectDB().then(() => {
    app.listen(port, () => console.log(`Server is running on ${port}`));
})
