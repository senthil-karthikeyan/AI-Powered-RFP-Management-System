import { Router } from "express";
import { inboundEmail } from "./email.controller";

const router = Router();

router.post("/inbound", inboundEmail);

export { router as emailRoutes };
