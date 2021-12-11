import {object, string, ref} from 'yup';

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password should contain at least 6 characters"),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
        email: string()
            .email("Email must be valid")
            .required("Email is required"),
    }),
});

export const createLoginSchema = object({

})