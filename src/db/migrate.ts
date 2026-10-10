import {pool} from "./pool";
import path from "path";
import fs from "fs"; 

export async function runMigrations(){
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations(
            name TEXT NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
const done = await pool.query("SELECT name FROM migrations");
const alreadyRan = done.rows.map((row) => row.name);

const folder = path.join(__dirname);

const files = fs
.readdirSync(folder)
.filter(file => file.endsWith(".sql"))
.sort();

for (const file of files) {
    if(alreadyRan.includes(file)) {
        console.log(`Migration ${file} already executed`);
        continue;      
    }
    const sql = fs.readFileSync(path.join(folder, file), "utf8");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log("ran:", file);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("failed:", file, error);
      process.exit(1);
    } finally {
      client.release();
      await pool.end();
    }

    
};
}

runMigrations()