import {object, string} from 'yup';

export const createUserSchema = object({
    body: object({
       title: string().required("Title is required"),
       description: string(),
       options: object()
           .required("Options are required"),
    }),
});