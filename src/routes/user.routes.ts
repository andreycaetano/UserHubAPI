import { Router } from "express";
import { container } from "tsyringe";
import { Validates } from "../middlewares/validates.middlewares";
import { userSchema } from "../schemas/user.schemas";
import { UserController } from "../controller/user.controller";

export const userRoutes = Router();

const validates = container.resolve(Validates)
const controller = container.resolve(UserController)

userRoutes.post("/register",
    validates.validateBody({body: userSchema}),
    (req) => validates.CPFValidator(req.body.CPF),
    (req, res) => controller.register(req, res)
);