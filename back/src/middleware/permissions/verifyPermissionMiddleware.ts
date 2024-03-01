import { Request, Response, NextFunction } from "express";
import { AppErro } from "../../utils/AppErro";

export const permission = async (req: Request, res: Response, next: NextFunction) => {
    const { authCollaborator } = res.locals
    
    if(authCollaborator.director) return next()
    
    if(req.method === "GET" && !authCollaborator.staff) throw new AppErro(401, "Sem permissao")
    
    if(authCollaborator.staff && req.body.staff || req.body.director) throw new AppErro(401, "Sem permissao")
    
    return next()   
}