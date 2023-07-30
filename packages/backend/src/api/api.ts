import { IAPIConfig } from "../types/config";

import express from "express";
import { createTrackingRoute } from "./routes/tracking";
import { SQLTRackingRepository } from "../db/repositories/sql/tracking";
import { createKnexPgConnection } from "../utils/psql-connection";
import { logger } from "../utils/logger";
export class Api {
  constructor(private readonly config: IAPIConfig) {}

  start(): void {
    const psqlConnection = createKnexPgConnection(this.config.psql);
    const repository = new SQLTRackingRepository(psqlConnection);
    const expressApp = express();

    expressApp.use(createTrackingRoute(repository));

    expressApp.listen(this.config.http.port, "127.0.0.1", () => {
      logger.info("Listening in port", { port: this.config.http.port });
    });
  }
}
