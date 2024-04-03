import { Router } from "express";
import { container } from "tsyringe";
import { Validates } from "../middlewares/validates.middlewares";
import { loginSchema, updateUserSchema, userSchema } from "../schemas/user.schemas";
import { UserController } from "../controller/user.controller";

export const userRoutes = Router();

const validates = container.resolve(Validates);
const controller = container.resolve(UserController);

userRoutes.post("/register",
    validates.validateBody({ body: userSchema }),
    (req, res) => Validates.CPFValidator(req.body.CPF),
    (req, res) => controller.register(req, res)
);

userRoutes.get("/",
    (req, res) => controller.getAll(req, res)
);

userRoutes.patch("/:id",
    (req, res, next) => validates.validateToken(req, res, next),
    validates.validateBody({ body: updateUserSchema }),
    (req, res) => controller.updateUser(req, res)
);

userRoutes.post("/login",
    validates.validateBody({ body: loginSchema }),
    (req, res) => controller.login(req, res)
)