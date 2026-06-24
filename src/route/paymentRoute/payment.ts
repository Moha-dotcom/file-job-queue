import { Router ,Response, Request} from 'express'
const paymentRouter = Router();
paymentRouter.post("/", async (req: Request, res: Response) => {
    // validate payment
    // if payment succeeds execute order adding to the processing
    // once payment succeeds emit process:order:


     return res.status(200).send({
        status: 'success',
        message: 'Payment Response OK',
    })
})

export default paymentRouter;