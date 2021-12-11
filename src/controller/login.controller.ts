import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service'
import { createAccessToken, createSession } from '../service/session.service';
import { sign } from 'jsonwebtoken';
import config from 'config'

export async function createLoginHandler(req:Request, res:Response) {
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("invalid email or password");
    }

    const session = await createSession(user._id , req.get("user-agent") || "");

    const accessToken = createAccessToken({
        user,
        session,
    });

    // const refreshToken = sign(session, {
    //     expiresIn: config.get("refreshTokenTl")
    // })
}