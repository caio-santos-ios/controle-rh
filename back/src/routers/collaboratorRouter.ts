import { Router } from "express";
import { controllerCollaborator } from "../controller/collaboratorController";
import { controllerSession } from "../controller/sessionController";

export const routerCollaborator: Router = Router()

routerCollaborator.post("/", controllerCollaborator.create)
routerCollaborator.post("/login", controllerSession.login)
routerCollaborator.get("/", controllerCollaborator.read)
routerCollaborator.get("/:id", controllerCollaborator.retrive)
routerCollaborator.patch("/:id", controllerCollaborator.update)
routerCollaborator.delete("/:id", controllerCollaborator.destroy)