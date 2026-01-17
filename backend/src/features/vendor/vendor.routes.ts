import { Router } from "express";
import { createVendor, listVendors } from "./vendor.controller";

const router = Router();

router.post("/", createVendor);
router.get("/", listVendors);

export { router as vendorRoutes };
