import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import Express from "express";
import { HandleErrors } from "./errors/handleErrors.errors";
import { ViaCep } from "./services/viaCep.services";

export const app = Express();

app.use(helmet());

app.use(HandleErrors.execute);