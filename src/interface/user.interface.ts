export interface ICreateUser {
    fName: string;
    lName: string;
    email: string;
    password: string;
    birthDate: string;
    ethnicity: "White" | "Black" | "Asian" | "Latino" | "MixedRace" | "Other";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Separated" | "DomesticPartnership" | "Other";
    CPF: string;
    address: address;
}

interface address {
    cep: string;
    numberHouse: number;
    complement: string | null;
}

export interface IUserCreationResponse {
    id: number;
    fName: string;
    lName: string;
    email: string;
    birthDate: string;
    ethnicity: string;
    maritalStatus: string;
    CPF: string;
    address: {
        CEP: number;
        numberHouse: number;
        complement: string | null;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
    };
}
