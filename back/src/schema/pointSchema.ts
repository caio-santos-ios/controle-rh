import { z } from "zod";
import { collaborator } from "./collaboratorSchema";

export const point = z.object({
    id: z.number().positive(),
    startHour: z.date().default(new Date()),
    endHour: z.date(),
    workDay: z.date().default(new Date()),
    collaboratorId: z.number().positive()
})

export const requestPoint = point.omit({ id: true })
export const requestPointUpdate = requestPoint.partial()
export const responsePointAll = point.array()