import { hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { requestCollaborator, requestCollaboratorUpdate, responseCollaborator, responseCollaboratorAll } from "../interfaces/collaboratorInterface"
import { AppErro } from "../utils/AppErro";
import { collaborator, requestCollaborator as returnCollaborator } from "../schema/collaboratorSchema";
import { responseCollaboratorAll as returnCollaboratorAll } from "../schema/collaboratorSchema";

class Collaborador {
    create = async (data: requestCollaborator): Promise<responseCollaborator> => {
        const findCollaborator = await prisma.collaborator.findUnique({
            where: {
                registerNumber: data.registerNumber
            }
        })

        if(findCollaborator) throw new AppErro(400, "Registro inválido")

        data.password = await hash(data.password, 10)

        const collaborator = await prisma.collaborator.create({
            data: { ...data }
        })

        return collaborator // returnCollaborator.parse(collaborator)
    }

    read = async (): Promise<responseCollaboratorAll> => {
        const collaborators = await prisma.collaborator.findMany()

        return returnCollaboratorAll.parse(collaborators)
    }

    retrive = async (id: string): Promise<responseCollaborator> => {
        const myId = Number(id)

        const findCollaborator = await prisma.collaborator.findUnique({
            where: {
                id: myId
            }
        })

        if(!findCollaborator) throw new AppErro(404, "Not found")
    
        return findCollaborator // returnCollaborator.parse(findCollaborator)
    }
    
    update = async (id: string, data: any): Promise<responseCollaborator> => {
        const myId = Number(id)

        const findCollaborator = await prisma.collaborator.findUnique({
            where: {
                id: myId
            }
        })

        if(!findCollaborator) throw new AppErro(404, "Not found")
        const hashPassword = hash(data.password, 10)

        const updateCollaborator = await prisma.collaborator.update({
            where: {
                id: myId
            },
            data: { ...data }
        })

        return updateCollaborator // returnCollaborator.parse(updateCollaborator)
    }
    
    destroy = async (id: string): Promise<void> => {
        const myId = Number(id)

        const findCollaborator = await prisma.collaborator.findUnique({
            where: {
                id: myId
            }
        })

        if(!findCollaborator) throw new AppErro(404, "Not found")

        await prisma.collaborator.delete({
            where: {
                id: myId
            }
        })

        return
    }
}

export const serviceCollaborator = new Collaborador()