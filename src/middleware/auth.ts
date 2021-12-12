import { Request, Response, NextFunction } from "express"

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if(!user){
        return res.send("user not logged in");
    }
    return next();
}

export default isAuth;