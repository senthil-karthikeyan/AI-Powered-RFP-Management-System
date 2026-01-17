import express from "express";
import routes from "./routes";
import { errorHandler } from "@/shared/middleware";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;
