import { Router } from "express";
import { inboundEmail } from "./email.controller";
import multer from "multer";

const upload = multer();

const router = Router();

router.post("/inbound", upload.any(), inboundEmail);

export { router as emailRoutes };
