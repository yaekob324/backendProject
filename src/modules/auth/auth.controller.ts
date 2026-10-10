import { createUser, findUserByEmail } from "./auth.repository";
import {hashPassword, checkEmailExists, comparePasswords} from "./auth.service";
import type { Request, Response } from "express";
import {findUserById} from "./auth.repository";

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
    const { email, password } = req.body;

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
  req.session.destroy((err)=>{
    if(err){
        return res.status(500).json({
            error:"failed to logout"
        })
    }
    res.clearCookie("connect.sid", {path:"/"})
    return res.status(200).json({
        message:"Logout successful"
    })
  })
}   
export async function me(req: Request, res: Response) {
const userId = req.session.userId;
      if (!userId) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }
  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  return res.status(200).json({
    user
  });
} 