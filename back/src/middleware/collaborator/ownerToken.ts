import { Request, Response, NextFunction } from "express";
import { AppErro } from "../../utils/AppErro";

export const ownerToken = (req: Request, res: Response, next: NextFunction): void => {
    const { authCollaborator } = res.locals
    const { id } = req.params

    if(authCollaborator.sub != id && !authCollaborator.director) throw new AppErro(401, "Sem permissao")
    
    return next()
}