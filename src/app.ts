import "reflect-metadata";
import "express-async-errors";
import "./container/index.container";
import helmet from "helmet";
import Express, { json } from "express";
import { HandleErrors } from "./errors/handleErrors.errors";
import { userRoutes } from "./routes/user.routes";

export const app = Express();

app.use(helmet());
app.use(json())

app.use("/", userRoutes)

app.use(HandleErrors.execute);