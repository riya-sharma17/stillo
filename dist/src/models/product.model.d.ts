import mongoose from "mongoose";
import { IProduct } from "../interfaces/product.interface";
declare const productModel: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default productModel;
//# sourceMappingURL=product.model.d.ts.map