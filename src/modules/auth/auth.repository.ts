import { pool } from "../../db/pool";

export async function findEmail(email: string): Promise<boolean> {
    
const checkEmail= await pool.query("SELECT email FROM users WHERE email=$1",[email])
return checkEmail.rows.length > 0;
}

export async function createUser(email: string, hashedPassword: string): Promise<void> {
    return pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword])
        .then(() => {
            console.log("User created successfully");
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            throw error;
        });
    }

export type AuthUser = {
  id: string;
  email: string;
  password: string;
};

export async function findUserByEmail(
  email: string
): Promise<AuthUser | null> {
  const result = await pool.query<AuthUser>(
    "SELECT id, email, password FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0] ?? null;
}
