import { Types } from "mongoose";
import { ProductCategory } from "../utils/enum";
export interface IProductLocation {
    lat: number;
    lng: number;
}
export interface IProduct {
    _id?: Types.ObjectId;
    title: string;
    description?: string;
    price: number;
    address: string;
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