import { DocumentDefinition } from 'mongoose';
import User, {UserDocument} from '../model/user.model'
import { omit } from 'lodash';
import {get} from "lodash"
import config from 'config'
import { verifyJWT, signJWT } from '../utils/jwt.utils';
import Session from '../model/session.model'

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try{
        return await User.create(input);
    } catch(error: any){
        throw new Error(error)
    }
}

function findUser(){

}

export async function validatePassword({
    email,
    password,
}: {
    email: UserDocument["email"];
    password: string;
}) {
    const user = await User.findOne({email});

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid){
        return false;
    }

    return omit(user.toJSON(), "password");
}

export async function resetAccessToken({refreshToken}:{refreshToken: string}): Promise<any>{
    const {decoded} = verifyJWT(refreshToken)

    if(!decoded|| !get(decoded, '_id')){
        return false;
    }

    const session = await Session.findById(get(decoded, "_id"))

    if (!session || !session.valid){
        return false;
    }

    const user = await User.findOne({_id: session.user});

    if(!user){
        return false;
    }

    const accessToken = signJWT(
        {...user, session: session._id }, 
        {expiresIn: config.get("refreshTokenTl")}
    );

    return accessToken
}