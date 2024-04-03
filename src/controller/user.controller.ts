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

    async updateUser (req: Request, res: Response) {
        const updatedUser = await this.UserCore.updateUser(Number(req.params.id), req.body, res.locals.token)
        return res.status(200).json(updatedUser)
    }

    async login (req: Request, res: Response) {
        const login = await this.UserCore.login(req.body)
        return res.status(200).json(login)
    }
}