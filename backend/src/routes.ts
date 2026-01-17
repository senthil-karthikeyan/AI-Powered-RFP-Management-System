import { Router } from "express";
import { rfpRoutes } from "@/features/rfp";
import { vendorRoutes } from "@/features/vendor";
import { emailRoutes } from "@/features/email";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const router = Router();

router.use("/rfps", rfpRoutes);
router.use("/vendors", vendorRoutes);
router.use("/emails", emailRoutes);

router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

export default router;
