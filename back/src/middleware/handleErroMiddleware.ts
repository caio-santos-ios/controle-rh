import { Request, Response, NextFunction } from "express"
import { AppErro } from "../utils/AppErro"

export const handleErro = async (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppErro) res.status(error.code).json({ message: error.message })
    
    return res.status(500).json({ message: "Error internal" })
}