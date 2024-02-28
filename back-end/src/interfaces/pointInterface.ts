import { z } from "zod";
import { requestPoint, requestPointUpdate, point, responsePointAll } from "../schema/pointSchema";

export type requestPoint = z.infer<typeof requestPoint>
export type requestPointUpdate = z.infer<typeof requestPointUpdate>
export type responsePoint = z.infer<typeof point>
export type responsePointAll = z.infer<typeof responsePointAll>