import express from "express";
import cookieParser from "cookie-parser";
import orderRoute from "./route/orderRoute/route";
import paymentRouter from "./route/paymentRoute/payment";
import {startWorker} from "./worker";
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/order', orderRoute)
app.use('/payment', paymentRouter);


app.listen(3000, () => {
    console.log("Server started on port 3000");
    startWorker()
})
