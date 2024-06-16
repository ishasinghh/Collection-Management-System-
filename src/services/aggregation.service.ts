import { CaseModel } from "../models/case.model";

export class AggregationService {
  public async getCasesByCity(startDate: Date, endDate: Date): Promise<any> {
    const match = {
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    const aggregation = await CaseModel.aggregate([
      { $match: match },
      { $group: { _id: "$city", totalCases: { $sum: 1 } } },
    ]);

    return aggregation;
  }
}
