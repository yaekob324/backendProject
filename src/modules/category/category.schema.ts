import * as z from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, "name should be greater than two charaters long").toLowerCase().trim(),
    type: z.string().trim().toLowerCase().pipe(
        z.enum(["income", "expense"], "type should be either income or expense")
    )
})

export const categoryUpdateSchema = z.object({
    category_id: z.string().uuid("category_id should be a valid uuid").optional(),
    amount_cents: z.number().int().nonnegative("amount_cents should be a non-negative integer").optional(),
    start_date: z.string().date("start_date should be a valid date").optional(),
    end_date: z.string().date("end_date should be a valid date").optional()
}).refine((data)=>Object.keys(data).length>0,{
    message:"At least one field is required"
});