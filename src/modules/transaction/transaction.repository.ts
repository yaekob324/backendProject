import {pool} from "../../db/pool";

export async function createTransaction({userId, category_id, amount_cents, type, description}: {
 userId: string;
 category_id: string;
 amount_cents: number;
 type: "income" | "expense";
 description: string;
}) {
 const result= await pool.query(
   "INSERT INTO transactions (user_id, category_id, amount_cents, type, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
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