import zod from "zod/v4";
import {z} from "zod";
import {ZodSchema} from "zod/v4";
import {Response, Request, NextFunction} from "express";


const ItemSchema = z.object({
    itemId: z.string().uuidv4("itemId is required as UUID"),
    name : z.string().trim().toLowerCase()
})

export const OrderSchema =  zod.object({
    orderId: zod.string().uuidv4("order Id is required as UUID"),
    firstName : zod.string("First Name is required "),
    lastName : zod.string("Last Name is required "),
    item : zod.array(ItemSchema)
})

export const JobSchema =  zod.object({
    jobId: zod.string().uuidv4("jobId is required as UUID"),
    status :zod.enum(["pending", "completed", "failed", "processing"]),
    payload : OrderSchema,
    createdAt : zod.string().datetime()
})


export type JobInput = zod.infer<typeof JobSchema>
export type OrderInput = zod.infer<typeof OrderSchema>;
export type ItemInput = zod.infer<typeof ItemSchema>;

export function validateSchema(schema : ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).send({
                status: "error",
                error : "Validation failed",
                details : result.error.flatten().fieldErrors
            })
        }
        req.body = result.data;
        next()
    }
}