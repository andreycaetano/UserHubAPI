import { injectable } from "tsyringe";
import bcrypt, { hash } from 'bcrypt';
import { ICreateUser, IUpdateUser, IUserCreationResponse } from "../interface/user.interface";
import { ViaCep } from "../services/viaCep.services";
import { prisma } from "../database/index.database";
import { AppErrors } from "../errors/app.errors";

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

    async updateUser (userId: number, data: IUpdateUser): Promise<IUserCreationResponse> {
        const findUser = prisma.user.findFirst({ where: { id: userId } })
        if(!findUser) throw new AppErrors(404, "User not found.")
        const address = await ViaCep.getAddressByCep(data.address.cep);
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...data.address && {
                    address: {
                        update: {
                            ...(address.cep && { CEP: Number(address.cep) }),
                            ...(data.address.numberHouse && { numberHouse: Number(data.address.numberHouse) }),
                            ...(data.address.complement && { complement: data.address.complement }),
                            ...(address.street && { street: address.street }),
                            ...(address.neighborhood && { neighborhood: address.neighborhood }),
                            ...(address.city && { city: address.city }),
                            ...(address.state && { state: address.state }),
                        }
                    }
                },
                ...data.fName && { fName: data.fName },
                ...data.lName && { lName: data.lName },
                ...data.email && { email: data.email },
                ...data.birthDate && { birthDate: data.birthDate },
                ...data.ethnicity && { ethnicity: data.ethnicity },
                ...data.maritalStatus && { maritalStatus: data.maritalStatus },
                ...data.CPF && { CPF: data.CPF }
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
}