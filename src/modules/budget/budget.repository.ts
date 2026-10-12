import { Request } from "express";
import { pool } from "../../db/pool";
export async function insertBudget(req: Request){
   const result= await pool.query("INSERT INTO budgets (user_id,category_id, amount_cents, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.session.userId, req.body.category_id, req.body.amount_cents, req.body.start_date, req.body.end_date]    );
    return result.rows[0];
}

export async function getBudgets(userId: string){
    const result = await pool.query("SELECT * FROM budgets WHERE user_id = $1", [userId]);
    return result.rows;
}