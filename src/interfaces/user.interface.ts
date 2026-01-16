import { Role, LoginType } from "../utils/enum";


export interface IUser {
    _id?: string;

    phoneNumber: string;
    loginType: LoginType;

    role: Role;
    isVerified: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
