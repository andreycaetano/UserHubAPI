import axios from "axios";
import { AppErrors } from "../errors/app.errors";

export class ViaCep {
    static async getAddressByCep(cep: string) {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data.errors) throw new AppErrors(400, "CEP not found.");
        return {
            cep: data.cep!,
            street: data.logradouro!,
            neighborhood: data.bairro!,
            city: data.bairro!,
            state: data.uf!
        }
    };
};