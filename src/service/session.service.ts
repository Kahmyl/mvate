import { FilterQuery } from 'mongoose';
import Session, { SessionDocument } from '../model/session.model'

export async function createSession(userId: any, userAgent: string) {
    const session = await Session.create({
        user: userId,
        userAgent
    })

    return session.toJSON();
}


export async function getSessions(query: FilterQuery<SessionDocument> ){
    return Session.find(query).lean();
}

