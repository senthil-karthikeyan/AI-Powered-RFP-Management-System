import { Request, Response, NextFunction } from "express";
import * as service from "./rfp.service";
import { success, error, HTTP_STATUS, ERROR_MESSAGES } from "@/shared/utils";

export const createRfp = async (
  req: Request<{}, {}, { rawInput?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rawInput } = req.body;

    if (!rawInput) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_INPUT,
        "rawInput is required"
      );
    }

    const rfp = await service.createRfp(rawInput);

    return success(res, rfp, HTTP_STATUS.CREATED);
  } catch (err) {
    next(err);
  }
};

export const listRfps = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return success(res, await service.listRfps());
  } catch (err) {
    next(err);
  }
};

export const getRfp = async (
  req: Request<{ id?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_PARAMS,
        "RFP id is required"
      );
    }

    const rfp = await service.getRfp(id);

    if (!rfp) {
      return error(
        res,
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.RFP_NOT_FOUND,
        "RFP not found"
      );
    }

    return success(res, rfp);
  } catch (err) {
    next(err);
  }
};

export const sendRfp = async (
  req: Request<{ id?: string }, {}, { vendorIds?: string[] }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { vendorIds } = req.body;

    if (!id) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_PARAMS,
        "RFP id is required"
      );
    }

    if (!Array.isArray(vendorIds) || vendorIds.length === 0) {
      return error(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_INPUT,
        "vendorIds must be a non-empty array"
      );
    }

    const result = await service.sendRfp(id, vendorIds);

    return success(res, result);
  } catch (err) {
    next(err);
  }
};
