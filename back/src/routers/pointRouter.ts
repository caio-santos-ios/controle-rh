import { Router } from "express";
import { controllerPoint } from "../controller/pointController";
import middlewaresCollaborator from "../middleware/collaborator";

export const routerPoint: Router = Router()

routerPoint.post("/", middlewaresCollaborator.validatedToken, controllerPoint.create)
routerPoint.get("/", controllerPoint.read)
routerPoint.get("/:id", controllerPoint.retrive)
routerPoint.patch("/:id", controllerPoint.update)
routerPoint.patch("/lunch/:id", controllerPoint.hourLunch)
routerPoint.delete("/:id", controllerPoint.destroy)