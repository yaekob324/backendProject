import express from "express";
/* this imports are to handle the session */
import "dotenv/config";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
/* this is imports are all the routers of the app */
import { authRouter } from "./modules/auth/auth.route";
import { budgetRouter } from "./modules/budget/budget.route";
import { categoryRouter } from "./modules/category/category.route";
import { reportRouter } from "./modules/report/report.route";
import {transactionRouter} from "./modules/transaction/transaction.route";
import { errorHandler } from "./middleware/error.middleware";

const PostgreSqlStore = connectPgSimple(session);
const sesssion_secret=process.env.SESSION_SECRET || "this is a default session secret, please change it in production";

export const app = express();

app.use(
  session({
    store: new PostgreSqlStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    }),
    secret: sesssion_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);



app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/report", reportRouter);
app.use(errorHandler);
