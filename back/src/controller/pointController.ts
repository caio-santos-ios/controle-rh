import { Request, Response } from "express";
import { servicePoint } from "../service/pointService";

class Point {
    create = async (req: Request, res: Response): Promise<Response> => {
        const point = await servicePoint.create(req.body, res.locals.authCollaborator.sub)

        return res.status(201).json(point)
    }

    read = async (req: Request, res: Response): Promise<Response> => {
        const points = await servicePoint.read()

        return res.status(200).json(points)
    }

    retrive = async (req: Request, res: Response): Promise<Response> => {
        const point = await servicePoint.retrive(req.params.id)

        return res.status(200).json(point)
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const point = await servicePoint.update(req.params.id, req.body)

        return res.status(200).json(point)
    }

    destroy = async (req: Request, res: Response): Promise<Response> => {
        await servicePoint.destroy(req.params.id)

        return res.status(204).json()
    }

    hourLunch = async (req: Request, res: Response): Promise<Response> => {
        const lunch = await servicePoint.hourLunch(req.params.id)

        return res.status(200).json(lunch)
    }
}

export const controllerPoint = new Point()