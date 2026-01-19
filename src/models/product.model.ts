import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import { ProductCategory } from "../utils/enum";

const ProductLocationSchema = new Schema(
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    { _id: false }
);

const ProductSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            enum: Object.values(ProductCategory),
            required: true,
        },

        subCategory: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            required: true,
        },

        videos: {
            type: [String],
            default: [],
        },


        seller: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        location: {
            type: ProductLocationSchema,
            required: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "products",
        versionKey: false,
    }
);

ProductSchema.index({
    location: "2dsphere",
});

const productModel = mongoose.model<IProduct>("products", ProductSchema);
export default productModel;
