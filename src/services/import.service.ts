import axios from "axios";
import { Readable } from "stream";
import csvParser from "csv-parser";
import { CaseModel, ICase } from "../models/case.model";
import { Logger } from "../utils/logger";

export class ImportService {
  public async importData(): Promise<void> {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx4htGXdPstnidnTTKdzNsd2EYwSD80NFEZcQGGLWhLqtJsTD-KfLOxLPwMjb2f_4geSt_WVtPE_Aa/pub?output=csv";

    try {
      const response = await axios.get(csvUrl);
      const csvData = response.data.trim();

      // Split the CSV data into lines and parse each line as CSV
      const lines = csvData.split(/\r?\n/);

      // Skip the header line (assuming it's the first line)
      const dataLines = lines.slice(1);

      for (let line of dataLines) {
        if (line.trim() === "") continue;

        // Parse each line into an object
        const row = this.parseCSVLine(line);

        try {
          await this.processRow(row);
        } catch (err) {
          Logger.error(`Error processing CSV row: ${err}`);
        }
      }

      Logger.info("CSV import completed.");
    } catch (error) {
      Logger.error("Error fetching CSV from Google Docs:", error);
      throw error;
    }
  }

  private parseCSVLine(line: string): any {
    const [bankName, propertyName, city, borrowerName, createdAt] = line
      .split(",")
      .map((item) => item.trim());
    return {
      "Bank name": bankName,
      "Property name": propertyName,
      City: city,
      "Borrower name": borrowerName,
      "Created At": createdAt,
    };
  }

  private async processRow(row: any): Promise<void> {
    try {
      Logger.debug("Processing CSV row:", row);

      // Ensure all required fields are present and parse values as needed
      const caseData: ICase = {
        bankName: row["Bank name"],
        propertyName: row["Property name"],
        city: row["City"],
        borrowerName: row["Borrower name"],
        createdAt: new Date(row["Created At"]),
      };

      // Validate required fields and createdAt date
      if (
        !caseData.bankName ||
        !caseData.propertyName ||
        !caseData.city ||
        !caseData.borrowerName ||
        !caseData.createdAt ||
        isNaN(caseData.createdAt.getTime())
      ) {
        throw new Error("Missing or invalid required fields in CSV row.");
      }

      await CaseModel.create(caseData);
    } catch (error) {
      Logger.error(`Error processing row: ${error}`);
      // You might handle the error differently based on your application's needs
      throw error;
    }
  }
}
