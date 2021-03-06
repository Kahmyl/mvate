import {object, string} from 'yup';

export const createLoginSchema = object({
    body: object({
        password: string()
            .required("Password is required")
            .min(6, "Password should contain at least 6 characters"),
        email: string()
            .email("Email must be valid")
            .required("Email is required"),
    }),
});
