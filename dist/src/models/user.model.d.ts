import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map