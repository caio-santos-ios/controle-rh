import { Request, Response } from "express";
import { sessionService } from "../service/sessionService";
import { token } from "../interfaces/sessionInterface";

class Session {
    login = async (req: Request, res: Response): Promise<Response> => {
        const token: token = await sessionService.login(req.body)

        return res.status(200).json(token)
    }
}

export const controllerSession = new Session()