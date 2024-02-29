import { z } from "zod";

export const login = z.object({
    registerNumber: z.string(),
    password: z.string()
})

export const token = z.object({
    token: z.string()
})