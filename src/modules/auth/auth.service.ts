import bcrypt from 'bcrypt';
import { pool } from '../../db/pool';
import {findEmail} from "./auth.repository";

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function checkEmailExists(email: string): Promise<boolean> {
    
     /* check if the email is already in use */
        
        if(await findEmail(email)){
            /* i may add custom error handling here */
           return true;
        }
    
    return false; // Placeholder implementation
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}


