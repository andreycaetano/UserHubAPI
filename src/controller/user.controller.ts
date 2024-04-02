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

    async getAll (req: Request, res: Response) {
        const findUsers = await this.UserCore.getAll()
        return res.status(200).json(findUsers)
    }
}