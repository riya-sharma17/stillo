import { ILocation } from "./location.interface";

export interface IUserAddress{
  _id?: string;
  label: string; // Home, Work, Other
  isDefault?: boolean;
}
