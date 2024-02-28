import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import { handleErro } from "./middleware/handleErroMiddleware";
import { routerCollaborator } from "./routers/collaboratorRouter";
import { routerPoint } from "./routers/pointRouter";

export const app: Application = express()

app.use(cors())
app.use(json())

app.use("/collaborators", routerCollaborator)
app.use("/points", routerPoint)
app.use(handleErro)