import { injectable } from "tsyringe";
import bcrypt, { hash } from 'bcrypt';
import { ICreateUser, IUserCreationResponse } from "../interface/user.interface";
import { ViaCep } from "../services/viaCep.services";
import { prisma } from "../database/index.database";

@injectable()
export class UserCore {
    async register(data: ICreateUser): Promise<IUserCreationResponse> {
        const address = await ViaCep.getAddressByCep(data.address.cep);
        data.password = await hash(data.password, process.env.SECRET_HASH!);
        const user = await prisma.user.create({
            data: {
                fName: data.fName,
                lName: data.lName,
                email: data.email,
                password: data.password,
                birthDate: data.birthDate,
                ethnicity: data.ethnicity,
                maritalStatus: data.maritalStatus,
                CPF: data.CPF,
                address: {
                    create: {
                        CEP: Number(data.address.cep),
                        numberHouse: Number(data.address.numberHouse),
                        complement: data.address.complement,
                        street: address.street,
                        neighborhood: address.neighborhood,
                        city: address.city,
                        state: address.state,
                    }
                }
            },
            select: {
                id: true,
                fName: true,
                lName: true,
                email: true,
                birthDate: true,
                ethnicity: true,
                maritalStatus: true,
                CPF: true,
                address: true
            }
        });
        return user;
    }

    async getAll (): Promise<IUserCreationResponse[]> {
        const findUsers = await prisma.user.findMany({
            select: {
                id: true,
                fName: true,
                lName: true,
                email: true,
                birthDate: true,
                ethnicity: true,
                maritalStatus: true,
                CPF: true,
                address: true
            }
        })
        return findUsers
    }
}