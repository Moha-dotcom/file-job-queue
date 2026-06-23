import express from "express";
import cookieParser from "cookie-parser";
import orderRoute from "./orderRoute/route";
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/order', orderRoute)


app.listen(3000, () => {
    console.log("Server started on port 3000");
})
