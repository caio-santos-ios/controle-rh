import { Request, Response } from "express";
import { serviceCollaborator } from "../service/collaboratorService";

class Collaborator {
    create = async (req: Request, res: Response): Promise<Response> => {
        const collaborator = await serviceCollaborator.create(req.body)

        return res.status(201).json(collaborator)
    }

    read = async (req: Request, res: Response): Promise<Response> => {
        const collaborators = await serviceCollaborator.read()

        return res.status(200).json(collaborators)
    }

    retrive = async (req: Request, res: Response): Promise<Response> => {
        const collaborator = await serviceCollaborator.retrive(req.params.id)

        return res.status(200).json(collaborator)
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const collaborator = await serviceCollaborator.update(req.params.id, req.body)

        return res.status(200).json(collaborator)
    }

    destroy = async (req: Request, res: Response): Promise<Response> => {
        await serviceCollaborator.destroy(req.params.id)

        return res.status(204).json()
    }
}

export const controllerCollaborator = new Collaborator()