import { z } from "zod";

export const collaborator = z.object({
    id: z.number().positive(),
    name: z.string().min(3, "O nome deve ter no minimo 5 caracteres.").max(150, "O nome deve ter no máximo 150 caracteres."),
    registerNumber: z.string().min(5, "O numero de registro deve ter 5 caracteres").max(5, "O numero do registro do colaborador de ter no máximo 5 caracteres."),
    email: z.string().email(),
    password: z.string().min(8, "A senha deve conter no minimo 8 caracteres."),
    staff: z.boolean().default(false),
    director: z.boolean().default(false),
    hourCharge: z.number().positive().default(8),
    create_at: z.date(),
    update_at: z.date()
})

export const requestCollaborator = collaborator.omit({ id: true })
export const requestCollaboratorUpdate = requestCollaborator.optional()
export const responseCollaborator = collaborator.omit({ password: true })
export const responseCollaboratorAll = responseCollaborator.array()