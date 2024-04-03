import { cpf } from "cpf-cnpj-validator"
import { AppErrors } from "../errors/app.errors";
import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import jwt from "jsonwebtoken";

interface IRequestSchemas {
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}

@injectable()
export class Validates {
    static CPFValidator(CPF: string) {
        return (next: NextFunction) => {
            const clearCPF = CPF.replace(/\D/g, '');
            const verify = cpf.isValid(clearCPF);
            if (!verify) throw new AppErrors(400, "CPF invalid");
            next();
        };
    };

    validateBody(schemas: IRequestSchemas) {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (schemas.params) {
                req.params = await schemas.params.parseAsync(req.params);
            }

            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }

            if (schemas.query) {
                req.query = await schemas.query.parseAsync(req.query);
            }
            next();
        };
    }

    validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization
        if (!token) throw new AppErrors(401, "Token is require")
        jwt.verify(token, process.env.SECRET_KEY_TOKEN!,function(err, decoded) {
            if(err) throw new AppErrors(401, "Invalid Token")
            res.locals.token = decoded
        })
        next()
    }
};