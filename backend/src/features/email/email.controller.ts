import { simpleParser } from "mailparser";

import { Request, Response, NextFunction } from "express";
import { handleInboundEmail } from "./email.service";
import {
  success,
  error,
  HTTP_STATUS,
  ERROR_MESSAGES,
  IDENTIFIER_REGEX,
} from "@/shared/utils";

export const inboundEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = await simpleParser(req.body.email);

    const text =
      parsed.text?.trim() ||
      (parsed.html || "")?.replace(/<[^>]+>/g, "").trim();

    const rawEmail = req.body?.email;

    const match = rawEmail?.match(IDENTIFIER_REGEX);

    const rfpId = match?.[1] ?? null;
    const vendorId = match?.[2] ?? null;

    console.log({ rfpId, vendorId, text, body: req.body });

    if (!text || !rfpId || !vendorId) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_PAYLOAD,
        "Missing required inbound email fields"
      );
    }

    const proposal = await handleInboundEmail({ text, rfpId, vendorId });

    console.log("proposal", proposal);

    if (!proposal) {
      // nothing to persist (ignored email)
      return success(res, { message: "Email ignored" });
    }

    console.log("proposal - final", proposal);

    return success(res, proposal);
  } catch (err) {
    next(err);
  }
};
