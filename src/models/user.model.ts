import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { Role, LoginType } from "../utils/enum";


const LocationSchema = new Schema(
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: String,
    },
    { _id: false }
);

const AddressSchema = new Schema(
    {
        label: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: String,
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);


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

        location: LocationSchema,

        addresses: [AddressSchema],
    },
    {
        timestamps: true,
        collection: "users",
        versionKey: false,
    }
);

const userModel = mongoose.model<IUser>("users", userSchema);
export default userModel;

