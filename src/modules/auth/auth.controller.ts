import {pool} from "../../db/pool";
import { Request, Response } from "express";
export function login(req: Request, res: Response) {
     /* check if the user exists in the database */

     const { email, password } = req.body;
}
export function register(req: Request, res: Response) {
  res.json({ message: "Registration successful" });
}
export function logout(req: Request, res: Response) {
  res.json({ message: "Logout successful" });
}   
export function me(req: Request, res: Response) {
  res.json({ message: "User profile" });
}   