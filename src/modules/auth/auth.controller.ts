import {pool} from "../../db/pool";
import { createUser, findUserByEmail } from "./auth.repository";
import {findEmail} from "./auth.repository";
import {hashPassword, checkEmailExists, comparePasswords} from "./auth.service";
import type { Request, Response } from "express";


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordMatches = await comparePasswords(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.userId = user.id;

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email
    }
  });
}
export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;

     /* check if the email is already in use */
    if(await checkEmailExists(email)) {
        return res.status(409).json({error:"email already inuse"})
    }
    /* hash the password */
    const hashedPassword = await hashPassword(password);
    /* create the user */
    await createUser(email, hashedPassword);
    /* i might add more logic here */
    res.json({message:"user created successfully"})
}
export function logout(req: Request, res: Response) {
  res.json({ message: "Logout successful" });
}   
export function me(req: Request, res: Response) {
  res.json({ message: "User profile" });
}   