import { Request, Response } from 'express';

export async function logoutHandler(req:Request, res:Response) {

    return res.cookie("accessToken", '',{expires: new Date(0), httpOnly: true,}).send("logged out")

}