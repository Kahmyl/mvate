import validateRequest from "./middleware/validateRequest";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { logoutHandler } from "./controller/logout.controller";
import { createLoginHandler } from "./controller/login.controller";
import { getSessionsHandler } from "./controller/session.controller";
import { createUserSchema } from "./schema/user.schema";
import { createLoginSchema } from "./schema/login.schema";
import { PollsHandler, createPollHandler, voteHandler } from "./controller/poll.controller";
import requireUser from "./middleware/requireUser";
import isAuth from "./middleware/auth";

export default function (app: Express) {
    app.get("/health", (req:Request, res:Response) => {
        res.sendStatus(200)
    });
    
    app.post("/api/register", validateRequest(createUserSchema), createUserHandler)

    app.post("/api/login", validateRequest(createLoginSchema) , createLoginHandler)

    app.post("/api/logout", logoutHandler)

    app.get("/api/user", requireUser , getSessionsHandler)

    app.get("/api/polls", PollsHandler)

    app.post("/api/createpoll", isAuth, createPollHandler)

    app.post("/api/vote", isAuth, voteHandler)
}