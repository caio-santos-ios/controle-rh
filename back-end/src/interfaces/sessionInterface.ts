import { z } from "zod";
import { login, token } from "../schema/sessionSchema";

export type login = z.infer<typeof login>
export type token = z.infer<typeof token> 