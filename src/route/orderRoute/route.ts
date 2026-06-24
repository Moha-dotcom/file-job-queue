import { Router} from 'express'
import {
    JobInput,
    OrderInput,
    CheckoutInput,
    orderSchema,
    validateSchema,
    CheckoutSchema
} from "../../schema/checkoutSchema"
import {validateCreditCard, writeQueue} from "../../helper/helper";

const orderRoute = Router();
orderRoute.post('/', validateSchema(CheckoutSchema),  async (req, res) => {
    const {order, payment} : CheckoutInput = req.body;
    try {
        const isValidPayment = await validateCreditCard(payment);
        if (!isValidPayment) {
            return res.status(400).json({
                status: "error",
                message: "Invalid payment",
            });

        }

        const createJob : JobInput= {
            jobId: crypto.randomUUID(),
            status: "pending",
            payload: order,
            createdAt: new Date().toISOString(),
        }
        await writeQueue(createJob);
        return res.status(201).json({
            status: "Successfully created your order",
            payload: createJob
        })
    }catch(err) {
        return res.status(500).json({
            status: "error",
        })
    }


})





export default orderRoute