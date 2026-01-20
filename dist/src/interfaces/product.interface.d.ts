import { Types } from "mongoose";
import { ProductCategory, ProductCondition } from "../utils/enum";
export interface IProductLocation {
    lat: number;
    lng: number;
}
export interface IProduct {
    _id?: Types.ObjectId;
    title: string;
    description?: string;
    price: number;
    addressId: Types.ObjectId;
    condition: ProductCondition;
    category: ProductCategory;
    subCategory: string;
    images: string[];
    videos?: string[];
    seller: Types.ObjectId;
    location?: IProductLocation;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=product.interface.d.ts.map