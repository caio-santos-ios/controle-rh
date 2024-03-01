import "dotenv/config";
import { prisma } from "../database/prisma";
import { login, token } from "../interfaces/sessionInterface";
import { AppErro } from "../utils/AppErro";
import { sign } from "jsonwebtoken";
import { compare, compareSync } from "bcryptjs";

class Session {
    login = async (data: login): Promise<token> => {

        const findCollaborator = await prisma.collaborator.findUnique({
            where: {
                registerNumber: data.registerNumber
            }
        })        
        
        if(!findCollaborator) throw new AppErro(401, "Número de registro ou senha invalidas")
        
        const validatedPassword = compareSync(data.password, findCollaborator.password)
        
        if(!validatedPassword) throw new AppErro(401, "Número de registro ou senha invalidas")
        
        const token = {
            token: sign({ email: findCollaborator.email, staff: findCollaborator.staff, director: findCollaborator.director }, process.env.SECRET_KEY!, { expiresIn: "12h", subject: findCollaborator.id.toString() })
        }
        
        return token
    }
}

export const sessionService = new Session()