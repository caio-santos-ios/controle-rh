import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppErro } from "../../utils/AppErro";

export const validatedToken = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers

    const token = authorization?.slice(7)

    if(!token) throw new AppErro(401, "Sem token") 

    const validatedToken = verify(token, process.env.SECRET_KEY!)

    if(!validatedToken) throw new AppErro(401, "Token invalido")

    res.locals.authCollaborator = validatedToken

    return next()
}