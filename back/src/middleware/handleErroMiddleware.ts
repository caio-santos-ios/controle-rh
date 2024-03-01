import { Request, Response, NextFunction } from "express";
import { AppErro } from "../utils/AppErro";
import { JsonWebTokenError } from "jsonwebtoken";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export const handleErro = async (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppErro) res.status(error.code).json({ message: error.message })

    if(error instanceof JsonWebTokenError) res.status(401).json({ message: error.message })

    if(error instanceof ZodError) res.status(400).json({ message: error.flatten().fieldErrors })

    if(error instanceof PrismaClientValidationError) res.status(400).json({ message: error.message })

    return res.status(500).json({ message: "Error internal" })
}