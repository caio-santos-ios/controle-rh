import { Request, Response, NextFunction } from "express";
import { AppErro } from "../../utils/AppErro";

export const isDirector = (req: Request, res: Response, next: NextFunction) => {
    const { authCollaborator } = res.locals

    if(!authCollaborator.director) throw new AppErro(400, "Sem permissao")

    return next()
}