import { prisma } from "../database/prisma";
import { requestPoint, responsePoint, responsePointAll } from "../interfaces/pointInterface";
import { AppErro } from "../utils/AppErro";
import { calculetedHour } from "../utils/calculetedHour";
import { convertDateBrazil } from "../utils/dateBrazil";

class Point {
    create = async (data: any, collaboratorId: number): Promise<responsePoint> => {
        const id = Number(collaboratorId)
        const day = new Date()
        
        const findPoint = await prisma.point.findFirst({
            where: {
                workDay: day,
                AND: {
                    collaboratorId: id
                }
            }
        })
        
        if(findPoint) throw new AppErro(400, "Ponto já batido")

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

    read = async (id: string): Promise<responsePointAll> => {
        const myId = Number(id)

        const points = await prisma.point.findMany({
            where: {
                collaboratorId: myId 
            }
        })

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

    update = async (id: string, data: requestPoint): Promise<responsePoint | any> => {
        /*
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
        */
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

    fishWordDay = async (): Promise<void> => {
        const day = new Date()
        
        const findPoint = await prisma.point.findFirst({
            where: {
                workDay: day,
            }
        })        

        if(!findPoint) throw new AppErro(404, "Not found")
        
        await prisma.point.update({
            where: {
                id: findPoint.id,
            },
            data: {
                onLine: false
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