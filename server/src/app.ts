import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
// import { env } from "./config/env.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js"
import usersRouter from "./modules/users/users.routes.js"


const app = express();

// app.use(
//   cors({
//     origin: env.CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(express.json());

app.use(cookieParser());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users", usersRouter);


app.use(errorHandler)

export default app;
