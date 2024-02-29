import { prisma } from "../database/prisma";
import { requestPoint, responsePoint, responsePointAll } from "../interfaces/pointInterface";
import { AppErro } from "../utils/AppErro";
import { convertDateBrazil } from "../utils/dateBrazil";

class Point {
    create = async (data: any, collaboratorId: number): Promise<responsePoint> => {
        const id = Number(collaboratorId)
        
        await prisma.point.findFirst({
            where: {
                collaboratorId: data.collaboratorId
            }
        })

        const point = await prisma.point.create({
            data: {
                collaboratorId: id,
                startHour: convertDateBrazil(),
                ...data         
            }
        })

        return point
    }

    read = async (): Promise<responsePointAll> => {
        const points = await prisma.point.findMany()

        return points
    }

    retrive = async (id: string): Promise<responsePoint | any> => {
        const myId = Number(id)

        const findPoint: any = await prisma.point.findFirst({
            where: {
                id: myId
            }
        })

        if(!findPoint) throw new AppErro(404, "Not found")
        
        return findPoint
    }

    update = async (id: string, data: requestPoint): Promise<responsePoint> => {
        const myId = Number(id)

        const findPoint = await prisma.point.findFirst({
            where: {
                id: myId
            }
        })

        if(!findPoint) throw new AppErro(404, "Not found")

        const pointUpdate = await prisma.point.update({
            where: {
                id: myId
            },
            data: {
                ...data
            }
        })

        return pointUpdate
    }

    destroy = async (id: string): Promise<void> => {
        const myId = Number(id)

        const findPoint = await prisma.point.findFirst({
            where: {
                id: myId
            }
        })

        if(!findPoint) throw new AppErro(404, "Not found")

        await prisma.point.delete({
            where: {
                id: myId
            }
        })

        return 
    }

    hourLunch = async (id: string) => {
        const myId = Number(id)

        const findPoint: any = await prisma.point.findFirst({
            where: {
                id: myId
            }
        })

        if(!findPoint) throw new AppErro(404, "Not found")

        
        if(!findPoint.lunchTimeStart) {
            await prisma.point.update({
                where: {
                    id: myId
                },
                data: {
                    onLine: false,
                    lunchTimeStart: convertDateBrazil()
                }
            })
            
            return { message: "Parada para almoco" }
        }
        const date: any = convertDateBrazil()
        let stopLunch = date - findPoint.lunchTimeStart 
        stopLunch /= (1000 * 60 * 60) 

        if(Math.floor(stopLunch) < 1) throw new AppErro(409, "Deve fazer no minino 1 hora de almoço")

        await prisma.point.update({
            where: {
                id: myId
            },
            data: {
                onLine: true,
                lunchTimeEnd: convertDateBrazil()
            }
        })
    
        return { message: "Parada para almoco" }
    }
}

export const servicePoint = new Point()