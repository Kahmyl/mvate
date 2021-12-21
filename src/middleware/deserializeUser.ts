import { Request, Response, NextFunction } from "express"
import {get} from "lodash"
import { resetAccessToken } from "../service/user.service"
import { verifyJWT } from "../utils/jwt.utils"

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = get(req, "headers.x-refresh")
    console.log(refreshToken)
    if(!accessToken){
        return next()
    }

    const {decoded, expired} = verifyJWT(accessToken)

    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken){
        const newAccessToken = await resetAccessToken({refreshToken})

        if (newAccessToken) {
            res.cookie("accessToken", newAccessToken,{maxAge: 1000 * 60 * 30, httpOnly: true,})
        }

        const result = verifyJWT(newAccessToken);
        res.locals.user = result.decoded;
    }    
    
    return next()
}

export default deserializeUser;