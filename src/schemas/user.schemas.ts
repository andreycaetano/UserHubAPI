import { z } from 'zod';

const addressSchema = z.object({
    cep: z.string().min(8, { message: 'CEP must contain at least 8 characters' }),
    numberHouse: z.number().min(1, { message: 'House number must be greater than 0' }),
    complement: z.string().optional(),
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const userSchema = z.object({
    fName: z.string().min(1, { message: 'First name must contain at least 1 character' }),
    lName: z.string().min(1, { message: 'Last name must contain at least 1 character' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().refine(value => passwordRegex.test(value), { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long' }),
    birthDate: z.string(),
    ethnicity: z.enum(["White", "Black", "Asian", "Latino", "Mixed Race", "Other"]),
    maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed", "Separated", "Domestic partnership", "Other"]),
    CPF: z.string().min(11, { message: 'CPF must contain at least 11 characters' }),
    address: addressSchema,
});

export const updateUserSchema = z.object({
    fName: z.string().min(1, { message: 'First name must contain at least 1 character' }).optional(),
    lName: z.string().min(1, { message: 'Last name must contain at least 1 character' }).optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    birthDate: z.string().optional(),
    ethnicity: z.enum(["White", "Black", "Asian", "Latino", "MixedRace", "Other"]).optional(),
    maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed", "Separated", "DomesticPartnership", "Other"]).optional(),
    CPF: z.string().min(11, { message: 'CPF must contain at least 11 characters' }).optional(),
    address: addressSchema.optional(),
});