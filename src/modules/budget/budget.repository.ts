import { Request } from "express";
import { pool } from "../../db/pool";
export async function insertBudget(req: Request,userId:string){
   const result= await pool.query("INSERT INTO budgets (user_id,category_id, amount_cents, start_date, end_date) VALUES ($1, $2, $3, $4, $5) WHERE user_id = $6 RETURNING *", [req.session.userId, req.body.category_id, req.body.amount_cents, req.body.start_date, req.body.end_date, userId]    );
    return result.rows[0];
}

export async function getBudgets(userId: string){
    const result = await pool.query("SELECT * FROM budgets WHERE user_id = $1", [userId]);
    return result.rows;
}
export async function alterBudget(
  req: Request,
  budgetId: string,
  userId: string
) {
  const fields: string[] = [];
  const values: unknown[] = [];
  let parameterNumber = 1;

  const addField = (column: string, value: unknown) => {
    if (value !== undefined) {
      fields.push(`${column} = $${parameterNumber}`);
      values.push(value);
      parameterNumber++;
    }
  };

  addField("category_id", req.body.category_id);
  addField("amount_cents", req.body.amount_cents);
  addField("start_date", req.body.start_date);
  addField("end_date", req.body.end_date);

  if (fields.length === 0) {
    throw new Error("At least one field is required");
  }

  values.push(budgetId);
  const budgetIdParameter = parameterNumber++;

  values.push(userId);
  const userIdParameter = parameterNumber;

  const result = await pool.query(
    `
      UPDATE budgets
      SET ${fields.join(", ")}
      WHERE id = $${budgetIdParameter}
        AND user_id = $${userIdParameter}
      RETURNING *;
    `,
    values
  );

  return result.rows[0];
}
export async function removeBudget(budgetId: string, userId: string) {
  const result = await pool.query(
    `
      DELETE FROM budgets
      WHERE id = $1
        AND user_id = $2
      RETURNING *;
    `,
    [budgetId, userId]
  ); 
  return result.rows[0];
}