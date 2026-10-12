import * as z from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, "name should be greater than two charaters long").toLowerCase().trim(),
    type: z.string().trim().toLowerCase().pipe(
        z.enum(["income", "expense"], "type should be either income or expense")
    )
})
