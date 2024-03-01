import { Router } from "express";
import { controllerCollaborator } from "../controller/collaboratorController";
import { controllerSession } from "../controller/sessionController";
import collaboratorMiddlewares from "../middleware/collaborator";
import permissionsMiddlewares from "../middleware/permissions";

export const routerCollaborator: Router = Router()

routerCollaborator.post("/login", controllerSession.login)
routerCollaborator.use("/", collaboratorMiddlewares.validatedToken, permissionsMiddlewares.permission)
routerCollaborator.post("/", controllerCollaborator.create)
routerCollaborator.get("/", controllerCollaborator.read)

routerCollaborator.use("/:id", collaboratorMiddlewares.validatedToken, collaboratorMiddlewares.ownerToken)
routerCollaborator.get("/:id", controllerCollaborator.retrive)
routerCollaborator.patch("/:id", controllerCollaborator.update)
routerCollaborator.delete("/:id", permissionsMiddlewares.isDirector, controllerCollaborator.destroy)