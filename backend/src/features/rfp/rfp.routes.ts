import { Router } from "express";
import {
  createRfp,
  listRfps,
  getRfp,
  sendRfp,
  evaluateProposals,
} from "./rfp.controller";

const router = Router();

router.post("/", createRfp);
router.get("/", listRfps);
router.get("/:id", getRfp);
router.post("/:id/send", sendRfp);
router.post("/:id/evaluate", evaluateProposals);

export { router as rfpRoutes };
