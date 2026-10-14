import {pool} from "../../db/pool";
import { AppError } from "../../middleware/error.middleware";
import { Request } from "express";
export async function createTransaction({userId, category_id, amount_cents, type, description}: {
 userId: string;
 category_id: string;
 amount_cents: number;
 type: "income" | "expense";
 description: string;
}) {
 const result= await pool.query(
   `
     INSERT INTO transactions
       (user_id, category_id, amount_cents, type, description)
     SELECT $1, c.id, $3, $4, $5
     FROM categories c
     WHERE c.id = $2
       AND c.user_id = $1
     RETURNING *;
   `,
   [userId, category_id, amount_cents, type, description]
 );
 return result.rows[0];
}

export async function getTransactionById(transactionId: string, userId: string) {
  const result = await pool.query(
    "SELECT * FROM transactions WHERE id = $1 AND user_id = $2",
    [transactionId, userId]
  );
  return result.rows[0];
}
export async function alterTransaction(
  req: Request,
  transactionId: string,
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

  if(req.body.length==0){
    throw new AppError(400, "At least one field is required");
  }
  
  addField("type", req.body.type);
  addField("category_id", req.body.category_id);
  addField("amount_cents", req.body.amount_cents);
  addField("description", req.body.description);

  values.push(transactionId);
  const budgetIdParameter = parameterNumber++;

  values.push(userId);
  const userIdParameter = parameterNumber;

  const result = await pool.query(
    `
      UPDATE transactions
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${budgetIdParameter}
        AND user_id = $${userIdParameter}
      RETURNING *;
    `,
    values
  );

  return result.rows[0];
}
export async function removeTransaction(transactionId: string, userId: string) {
  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
    [transactionId, userId]
  );
  return result.rows[0];
}
export async function paginatedTransactionsByUserId(userId:string,limit:number,offset:number){
    const result=await pool.query(
        "SELECT * FROM transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",[userId,limit,offset]
    )
    return result.rows;
}