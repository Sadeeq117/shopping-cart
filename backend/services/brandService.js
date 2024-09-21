const brandModel = require('../schemas/brand')

exports.getBrands = async(req,res,next) =>{
    try{
        const existing_brands = await brandModel.find({},{__v:0}).sort({"name" : 1});
        if(existing_brands == null){
            const err = new Error();
            err.status = 400;
            err.message = "Brands not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : "Barnd deatils fecthed successfully.",
                "data" : existing_brands
            })
        }
    }catch(err){
        next(err);
    }
    
}

exports.addBrand = async(req,res,next) =>{
    try{
        let data = req.body;
        const existing_brand = await brandModel.findOne({name:data.name},{__v:0});
        if(existing_brand){
            const err = new Error();
            err.status = 409;
            err.message = "brand with the same name already exists."
            next(err)
        }else{
            let brand = new brandModel({
                name : data.name,
            });
            await brand.save();
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `brand added successfully with id ${brand.toObject()._id}.`
            })
        }
    }catch(err){
        next(err);
    }
    
}

exports.updateBrand = async(req,res,next) =>{
    try{
        let data = req.body;
        let id = req.params.id;
        const response = await brandModel.findOneAndUpdate({_id:id},data)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "brand with given Id is not available."
            next(err)

        }else{
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `brand updated successfully with id ${id}.`
            })
        }

    }catch(err){
        next(err)
    }    
}

exports.deleteBrand = async(req,res,next) =>{
    try{
        let id = req.params.id;
        const response = await brandModel.findByIdAndDelete(id)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid Brand Id."
            next(err)

        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `brand with id ${id} deleted successfully.`
            })
        }

    }catch(err){
        next(err)
    }    
}

exports.getBrandById = async(req,res,next) =>{
    try{
        let id = req.params.id;
        const existing_brands = await brandModel.find({_id:id},{__v:0});
        if(existing_brands == null){
            const err = new Error();
            err.status = 400;
            err.message = "Brands not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `Brand deatils fecthed successfully.`,
                "data" : existing_brands
            })
        }
    }catch(err){
        next(err)
    }
}