import { pool } from '../../db/pool';
import { Request } from 'express';
import { AppError } from '../../middleware/error.middleware';
export async function insertCategory(req: Request) {
   const result = await pool.query("INSERT INTO categories (user_id, name, type) VALUES ($1, $2, $3) RETURNING *", [req.session.userId, req.body.name, req.body.type]);
   return result.rows[0];
}

export async function checkName(name:string,userId:string){
      const result=await pool.query("SELECT * FROM categories WHERE user_id =$1 AND name=$2",[userId,name])

      return result.rows[0] ? true : false;
}

export async function getCategoriesById(userId:string){
   const result = await pool.query("SELECT * FROM categories WHERE user_id = $1", [userId]);
   return result.rows;
}

export async function alterCategory(
  req: Request,
  categoryId: string,
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
  
  addField("type", req.body.type);
  addField("name",req.body.name)
  

  if (fields.length === 0) {
    throw new AppError(400, "At least one field is required");
  }

  values.push(categoryId);
  const budgetIdParameter = parameterNumber++;

  values.push(userId);
  const userIdParameter = parameterNumber;

  const result = await pool.query(
    `
      UPDATE categories
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${budgetIdParameter}
        AND user_id = $${userIdParameter}
      RETURNING *;
    `,
    values
  );

  return result.rows[0];
}
export async function removeCategory(categoryId:string,userId:string){
   const result=await pool.query(`DELETE FROM categories WHERE id=$1 AND user_id=$2 RETURNING *`,[categoryId,userId])
   return result.rows[0];
}
