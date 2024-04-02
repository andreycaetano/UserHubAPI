export interface IUser {
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