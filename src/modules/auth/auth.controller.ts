import { createUser, findUserByEmail } from "./auth.repository";
import {hashPassword, checkEmailExists, comparePasswords} from "./auth.service";
import type { Request, Response } from "express";
import {findUserById} from "./auth.repository";
import { AppError } from "../../middleware/error.middleware";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const passwordMatches = await comparePasswords(password, user.password);

  if (!passwordMatches) {
    throw new AppError(401, "Invalid credentials");
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
         throw new AppError(409, "Email already in use");
    }
    /* hash the password */
    const hashedPassword = await hashPassword(password);
    /* create the user */
    await createUser(email, hashedPassword);
    /* i might add more logic here */
    res.json({message:"user created successfully"})
}
export function logout(req: Request, res: Response, next: (error?: unknown) => void) {
  req.session.destroy((err)=>{
    if(err){
        next(new AppError(500, "Failed to logout"));
        return;
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
    throw new AppError(401, "Unauthorized");
  }
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return res.status(200).json({
    user
  });
} 