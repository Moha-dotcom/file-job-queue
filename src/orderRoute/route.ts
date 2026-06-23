import { Router} from 'express'
import cookieParser from 'cookie-parser'
import {JobSchema, JobInput, OrderInput, OrderSchema, validateSchema} from "../schema/orderSchema"


const orderRoute = Router();
// create Order
orderRoute.post('/', validateSchema(OrderSchema),  async (req, res) => {
    const order : OrderInput = req.body;
    // createQueue
    const createJob : JobInput= {
        jobId: crypto.randomUUID(),
        status: "pending",
        payload: order,
        createdAt: new Date().toISOString(),
    }



})

