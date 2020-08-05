
import express from 'express';
import Product from '../models/product';
import ProductArray from '../models/productarray'

const productRouter = express.Router();

productRouter.post('/product', async (req, res) => {
    // const pro=await Product.find({"product.Name":{$regex:req.body.productName},"product.price":req.body.price,"product":req.body.price});
                    
    //         res.json(pro)
    const productname=req.body.produtName;
    const price=req.body.price;
    const product=new Product({
        productName:productname,
        price:price

    });
    product.save();
    
});
productRouter.get('/product', async (req, res)=>{
    const pro=await Product.find({"product.Name":{$regex:req.body.productName},"product.price":req.body.price,"product":req.body.price});
                    
          res.json(pro);
});


export default productRouter;

