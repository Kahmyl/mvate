import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service'
import { createSession } from '../service/session.service';
import config from 'config'
import { signJWT } from '../utils/jwt.utils';

export async function createLoginHandler(req:Request, res:Response) {
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("invalid email or password");
    }

    const session = await createSession(user._id , req.get("user-agent") || "");

    const accessToken = signJWT(
        {...user, session: session._id }, 
        {expiresIn: config.get("accessTokenTl")}
    );

    const refreshToken = signJWT(
        {...user, session: session._id }, 
        {expiresIn: config.get("accessTokenTl")}
    );

    return res.setHeader('x-refresh', refreshToken).cookie("accessToken", accessToken,{maxAge: 1000 * 60 * 30, httpOnly: true,}).send({accessToken, refreshToken}).setHeader('x-refresh', refreshToken)


}