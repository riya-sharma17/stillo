import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { Role, LoginType } from "../utils/enum";


const userSchema = new Schema<IUser>(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        loginType: {
            type: String,
            enum: Object.values(LoginType),
            default: LoginType.NUMBER,
        },

        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "users",
        versionKey: false,
    }
);

const userModel = mongoose.model<IUser>("users", userSchema);
export default userModel;

