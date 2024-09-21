const productModel = require('../schemas/product')

async function getProducts (req,res,next){
    try{
        const existing_products = await productModel.find({},{__v:0}).sort({"name" : 1});
        if(existing_products == null){
            const err = new Error();
            err.status = 400;
            err.message = "Products not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : "Products deatils fecthed successfully.",
                "data" : existing_products
            })
        }
    }catch(err){
        next(err);
    }
    
}

async function addProduct (req,res,next){
    try{
        let data = req.body;
        const existing_product = await productModel.findOne({name:data.name},{__v:0});
        if(existing_product){
            const err = new Error();
            err.status = 409;
            err.message = "product with the same name already exists."
            next(err)
        }else{
            let product = new productModel({
                ...data
            });
            await product.save();
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `product added successfully with id ${product.toObject()._id}.`
            })
        }
    }catch(err){
        next(err);
    }
    
}

async function updateProduct (req,res,next){
    try{
        let data = req.body;
        let id = req.params.id;
        const response = await productModel.findOneAndUpdate({_id:id},data)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "product with given Id is not available."
            next(err)

        }else{
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `product updated successfully with id ${id}.`
            })
        }

    }catch(err){
        next(err)
    }    
}

async function deleteProduct (req,res,next) {
    try{
        let id = req.params.id;
        const response = await productModel.findByIdAndDelete(id)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid product Id."
            next(err)

        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `product with id ${id} deleted successfully.`
            })
        }

    }catch(err){
        next(err)
    }    
}

async function getProductById (req,res,next){
    try{
        let id = req.params.id;
        const existing_product = await productModel.find({_id:id},{__v:0});
        if(existing_product == null){
            const err = new Error();
            err.status = 400;
            err.message = "Product not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `Product deatils fecthed successfully.`,
                "data" : existing_product
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports  = {getProducts,addProduct,updateProduct,deleteProduct,getProductById}