import { pool } from '../../db/pool';
import { Request } from 'express';
export async function insertCategory(req: Request) {
   const result = await pool.query("INSERT INTO categories (user_id, name, type) VALUES ($1, $2, $3) RETURNING *", [req.session.userId, req.body.name, req.body.type]);
   return result.rows[0];
}

export async function getCategoriesById(userId:string){
   const result = await pool.query("SELECT * FROM categories WHERE user_id = $1", [userId]);
   return result.rows;
}