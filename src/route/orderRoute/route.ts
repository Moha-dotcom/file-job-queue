import { Router} from 'express'
import { JobInput, OrderInput, OrderSchema, validateSchema} from "../../schema/orderSchema"
import {writeQueue} from "../../helper/helper";

const orderRoute = Router();
orderRoute.post('/', validateSchema(OrderSchema),  async (req, res) => {
    const order : OrderInput = req.body;
    const createJob : JobInput= {
        jobId: crypto.randomUUID(),
        status: "pending",
        payload: order,
        createdAt: new Date().toISOString(),
    }

    try{
        await writeQueue(createJob);
        return res.status(201).json({
            status: "Successfully created your order",
            payload: createJob
        })
    }catch(err : unknown){
        return res.status(500).json({
            status: "error",
        })
    }


})





export default orderRoute