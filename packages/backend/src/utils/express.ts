import { Handler, Request, Response } from "express";
import { ParcelLabelApiException } from "../exceptions/exceptions";
import { logger } from "./logger";

export function handleError(error: Error, res: Response) {
  if (error instanceof ParcelLabelApiException) {
    res.status(error.statusCode).json({
      error: true,
      error_code: error.code,
      message: error.message,
    });
  } else {
    res.status(500).json({
      error: true,
      error_code: "500",
      message: "Server error",
    });
  }
  logger.error(error);
}

export function safeJSONResponse(
  cb: (req: Request) => Promise<unknown>,
): Handler {
  return async (req, res) => {
    try {
      const data = await cb(req);
      res.status(200).json(data);
    } catch (e) {
      handleError(e, res);
    }
  };
}
