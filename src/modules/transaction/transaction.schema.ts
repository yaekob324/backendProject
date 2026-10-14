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