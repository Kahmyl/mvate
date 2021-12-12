import { Request, Response } from 'express';
import { getSessions } from '../service/session.service';

export async function getSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id
    const name = res.locals.user.name
    const email = res.locals.user.email

    const sessions = await getSessions({user: userId, valid: true})


    return res.send({userId, name, email})
}