import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map