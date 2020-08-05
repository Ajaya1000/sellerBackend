import mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required:true
        
      },
    price:{
        type:Number,
        required:true
    },
    img:{
        data: Buffer,
        contentType: String,
    }
});


const Product = mongoose.model('Product', ProductSchema);
export default Product;
