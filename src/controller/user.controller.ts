import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../service/user.service'
import { createSession } from '../service/session.service';
import config from 'config'
import { signJWT } from '../utils/jwt.utils';
import log from '../log'

export async function createUserHandler(req:Request, res:Response) {
    try{
        const user = await createUser(req.body);
        const result = await omit(user.toJSON(), "password")

        const session = await createSession(user._id , req.get("user-agent") || "");

        const accessToken = signJWT(
            {...user, session: session._id }, 
            {expiresIn: config.get("accessTokenTl")}
        );
    
        const refreshToken = signJWT(
            {...user, session: session._id }, 
            {expiresIn: config.get("accessTokenTl")}
        );
    
        return res.send({accessToken, refreshToken, result})

    }catch(e: any){
        log.error(e);
        return res.status(400).send(e.message)
    }
}
