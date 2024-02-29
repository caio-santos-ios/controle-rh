import { z } from "zod";
import { requestCollaborator, requestCollaboratorUpdate, responseCollaborator, responseCollaboratorAll } from "../../../back/src/schema/collaboratorSchema";

export type requestCollaborator = z.infer<typeof requestCollaborator>
export type requestCollaboratorUpdate = z.infer<typeof requestCollaboratorUpdate>
export type responseCollaborator = z.infer<typeof responseCollaborator>
export type responseCollaboratorAll = z.infer<typeof responseCollaboratorAll>