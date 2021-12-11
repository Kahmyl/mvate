import validateRequest from "./middleware/validateRequest";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createLoginHandler } from "./controller/login.controller";
import { createUserSchema, createLoginSchema } from "./schema/user.schema";

export default function (app: Express) {
    app.get("/health", (req:Request, res:Response) => {
        res.sendStatus(200)
    });
    
    app.post("/api/user", validateRequest(createUserSchema), createUserHandler)

    app.post("/api/login", validateRequest(createLoginSchema), createLoginHandler)
}