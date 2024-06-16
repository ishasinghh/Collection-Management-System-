import express from "express";
import mongoose from "mongoose";
import importRoutes from "./routes/import.routes";
import aggregationRoutes from "./routes/aggregation.routes";
import { errorHandler } from "./utils/errorHandler";
import { Logger } from "./utils/logger";
import schedule from "node-schedule";
import { ImportService } from "./services/import.service";
import { config } from "./config";
import * as path from "path";
import { ImportController } from "./controllers/import.controller";

const app = express();
const port = config.port;
const mongoUri = config.mongoURI;

app.use(express.json());
app.use(importRoutes);
app.use(aggregationRoutes);
app.use(errorHandler);

mongoose
  .connect(mongoUri)
  .then(() => {
    Logger.info("Connected to MongoDB");
    app.listen(port, () => {
      Logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    Logger.error("Error connecting to MongoDB", error);
  });

const importController = new ImportController();

// Schedule the import job to run at 10 AM and 5 PM every day
schedule.scheduleJob("0 10,17 * * *", async () => {
  Logger.info("Running scheduled data import job");
  try {
    await importController.importData(); // Assuming no req/res needed for scheduled job
    Logger.info("Scheduled data import job completed successfully");
  } catch (error) {
    Logger.error("Scheduled job failed", error);
  }
});
