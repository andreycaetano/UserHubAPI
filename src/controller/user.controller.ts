import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserCore } from "../core/user.core";

@injectable()
export class UserController {
    constructor(@inject("UserCore") private UserCore: UserCore) { }

    async register(req: Request, res: Response) {
        const userCreate = await this.UserCore.register(req.body)
        return res.status(201).json(userCreate)
    }
}