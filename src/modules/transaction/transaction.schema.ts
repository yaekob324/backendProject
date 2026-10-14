import * as z from 'zod';

export const transactionSchema = z.object({
    category_id: z.string().uuid("category_id should be a valid uuid"),
    amount_cents: z.number().int().nonnegative("amount_cents should be a non-negative integer"),
    type: z.enum(["income", "expense"]),
    description: z.string().min(2, "description should be greater than two characters long").trim()
});
export const transactionParamsSchema = z.object({
    transactionId: z.string().uuid("transactionId should be a valid uuid")
});

export const transactionUpdateSchema = z.object({
    /* may be i will catagorize the transactions based on like categories like food and i should allow the user to update that then */
    category_id: z.string().uuid("category_id should be a valid uuid").optional(),
    amount_cents: z.number().int().nonnegative("amount_cents should be a non-negative integer").optional(),
    type: z.enum(["income", "expense"]).optional(),
    description: z.string().min(2, "description should be greater than two characters long").trim().optional()
}).refine((data)=>Object.keys(data).length>0,{
    message:"At least one field is required"
});