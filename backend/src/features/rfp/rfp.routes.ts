import { Router } from "express";
import { createRfp, listRfps, getRfp, sendRfp } from "./rfp.controller";

const router = Router();

router.post("/", createRfp);
router.get("/", listRfps);
router.get("/:id", getRfp);
router.post("/:id/send", sendRfp);

export { router as rfpRoutes };
