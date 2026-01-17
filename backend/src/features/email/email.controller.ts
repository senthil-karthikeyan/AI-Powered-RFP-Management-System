import { Request, Response, NextFunction } from "express";
import { handleInboundEmail } from "./email.service";
import { success, error, HTTP_STATUS, ERROR_MESSAGES } from "@/shared/utils";

export const inboundEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, custom_args } = req.body;

    if (!text || !custom_args?.rfpId || !custom_args?.vendorId) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_PAYLOAD,
        "Missing required inbound email fields"
      );
    }

    const proposal = await handleInboundEmail(req.body);

    if (!proposal) {
      // nothing to persist (ignored email)
      return success(res, { message: "Email ignored" });
    }

    return success(res, proposal);
  } catch (err) {
    next(err);
  }
};
