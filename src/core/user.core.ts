import { injectable } from "tsyringe";
import bcrypt, { hash } from 'bcrypt';
import { ICreateUser, IUpdateUser, IUserCreationResponse, TLogin } from "../interface/user.interface";
import { ViaCep } from "../services/viaCep.services";
import { prisma } from "../database/index.database";
import { AppErrors } from "../errors/app.errors";
import jwt from "jsonwebtoken";
import { Validates } from "../middlewares/validates.middlewares";

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

    async getAll(): Promise<IUserCreationResponse[]> {
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

    async updateUser(userId: number, data: IUpdateUser): Promise<IUserCreationResponse> {
        const findUser = await prisma.user.findFirst({ where: { id: userId } })
        if (!findUser) throw new AppErrors(404, "User not found.")

        let address = null
        if (data.address) {
            address = await ViaCep.getAddressByCep(data.address.cep);
        }

        const userDataToUpdate: any = {};

        if (data.address) {
            if (address) {
                userDataToUpdate.address = {
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
            }
        }

        if (data.fName) userDataToUpdate.fName = data.fName;
        if (data.lName) userDataToUpdate.lName = data.lName;
        if (data.email) userDataToUpdate.email = data.email;
        if (data.birthDate) userDataToUpdate.birthDate = data.birthDate;
        if (data.ethnicity) userDataToUpdate.ethnicity = data.ethnicity;
        if (data.maritalStatus) userDataToUpdate.maritalStatus = data.maritalStatus;
        if (data.CPF && Validates.CPFValidator(data.CPF)) userDataToUpdate.CPF = data.CPF;
        if (data.admin) userDataToUpdate.admin = data.admin;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: userDataToUpdate,
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

        return updatedUser;
    }

    async login(data: TLogin) {
        const findUser = await prisma.user.findFirst({ where: { email: data.email } })
        if (!findUser) throw new AppErrors(401, "It seems there was an issue during the login process. Please verify your credentials and try again.")
        bcrypt.compare(data.password, findUser.password, function (err, res) {
            if (!res) throw new AppErrors(401, "It seems there was an issue during the login process. Please verify your credentials and try again.")
        })
        const token = jwt.sign({
            userId: findUser.id,
            role: findUser.admin
        }, process.env.SECRET_KEY_TOKEN!,
            { expiresIn: '1h' }
        )
        return {
            user: findUser.email,
            admin: findUser.admin,
            token: token,
        }
    }

}