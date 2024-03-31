import "reflect-metadata"
import "express-async-errors"
import helmet from "helmet";
import Express from "express";

export const app = Express()

app.use(helmet())