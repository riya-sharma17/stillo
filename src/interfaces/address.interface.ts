import { ILocation } from "./location.interface";

export interface IUserAddress extends ILocation {
  _id?: string;
  label: string; // Home, Work, Other
  isDefault?: boolean;
}
