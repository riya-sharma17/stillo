import { ILocation } from "./location.interface";
export interface IUserAddress extends ILocation {
    _id?: string;
    label: string;
    state: string;
    city: string;
    isDefault?: boolean;
}
//# sourceMappingURL=address.interface.d.ts.map