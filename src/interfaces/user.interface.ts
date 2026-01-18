import { Role, LoginType } from "../utils/enum";
import { IUserAddress } from "./address.interface";
import { ILocation } from "./location.interface";


export interface IUser {
    _id?: string;

    phoneNumber: string;
    loginType: LoginType;

    role: Role;
    isVerified: boolean;
    location?: ILocation;
    addresses?: IUserAddress[];

    createdAt?: Date;
    updatedAt?: Date;
}
