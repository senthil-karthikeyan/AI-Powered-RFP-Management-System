import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
    PORT: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    SENDGRID_API_KEY: z.string().min(1),
    SENDGRID_RFP_TEMPLATE_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
});
