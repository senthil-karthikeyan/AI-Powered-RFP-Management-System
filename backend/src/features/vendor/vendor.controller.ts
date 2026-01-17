import { Request, Response, NextFunction } from "express";
import * as service from "./vendor.service";
import { success, error, HTTP_STATUS, ERROR_MESSAGES } from "@/shared/utils";

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_INPUT,
        "name and email are required"
      );
    }

    const vendor = await service.createVendor({ name, email });

    return success(res, vendor, HTTP_STATUS.CREATED);
  } catch (err) {
    next(err);
  }
};

export const listVendors = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return success(res, await service.listVendors());
  } catch (err) {
    next(err);
  }
};
