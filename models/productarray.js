import mongoose from 'mongoose';
import { string } from 'joi';
import Product, {
  ProductSchema
} from "./product";
const ProductArraySchema = new mongoose.Schema({

    validUser: {
        type: String,
        required:true
        
      },
      products: [ProductSchema]
    });

const ProductArray = mongoose.model('ProductArray', ProductArraySchema);
  export default ProductArray;