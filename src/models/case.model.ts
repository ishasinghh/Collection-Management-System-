import { getModelForClass, prop } from "@typegoose/typegoose";

export interface ICase {
  bankName: string;
  propertyName: string;
  city: string;
  borrowerName: string;
  createdAt: Date;
}

class Case implements ICase {
  @prop({ required: true })
  public bankName: string;

  @prop({ required: true })
  public propertyName: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public borrowerName: string;

  @prop({ required: true })
  public createdAt: Date;

  constructor(data: ICase) {
    this.bankName = data.bankName;
    this.propertyName = data.propertyName;
    this.city = data.city;
    this.borrowerName = data.borrowerName;
    this.createdAt = data.createdAt;
  }
}

export const CaseModel = getModelForClass(Case);
