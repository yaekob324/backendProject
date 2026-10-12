import * as z from "zod";

export const budgetSchema = z.object({
    category_id: z.string().uuid("category_id should be a valid uuid"),
    amount_cents: z.number().int().nonnegative("amount_cents should be a non-negative integer"),
    start_date: z.string().date("start_date should be a valid date"),
    end_date: z.string().date("end_date should be a valid date")
});
