import { LeanDocument } from 'mongoose';
import Login, { LoginDocument } from '../model/login.model'
import config from 'config'
import { UserDocument } from '../model/user.model';
import { sign } from '../utils/jwt.utils'

export async function createSession(userId: string, userAgent: string) {
    const session = await Login.create({
        user: userId,
        userAgent
    })

    return session.toJSON();
}

export function createAccessToken({
    user,
    session
}: {
    user:
      | Omit<UserDocument, "password">
      | LeanDocument<Omit<UserDocument, "password">>;
    session:
      | Omit<LoginDocument, "password">
      | LeanDocument<Omit<LoginDocument, "password">>;

}) {
    const accessToken = sign(
        {...user, session: session._id },
        { expiresIn: config.get("accessTokenTl")}
    );

    return accessToken;
}