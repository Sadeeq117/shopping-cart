const categoryModel = require("../schemas/category");

exports.getCategories = async(req,res,next) =>{
    try{
        const existing_categories = await categoryModel.find({},{__v:0}).sort({"name" : 1});
        if(existing_categories == null){
            const err = new Error();
            err.status = 400;
            err.message = "Categories not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `Categories deatils fecthed successfully.`,
                "data" : existing_categories
            })
        }
    }catch(err){
        next(err);
    }
    
}

exports.addCategory = async(req,res,next) =>{
    try{
        let data = req.body;
        const existing_category = await categoryModel.findOne({name:data.name},{__v:0});
        if(existing_category){
            const err = new Error();
            err.status = 409;
            err.message = "category with the same name already exists."
            next(err)
        }else{
            let category = new categoryModel({
                name : data.name,
            });
            await category.save();
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `category added successfully with id ${category.toObject()._id}.`
            })
        }
    }catch(err){
        next(err);
    }
    
}

exports.updateCategory = async(req,res,next) =>{
    try{
        let data = req.body;
        let id = req.params.id;
        const response = await categoryModel.findOneAndUpdate({_id:id},data)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "Category with given Id is not available."
            next(err)

        }else{
            res.status(201)
            res.json({
                "status" : "success",
                "message" : `category updated successfully with id ${id}.`
            })
        }

    }catch(err){
        next(err)
    }    
}

exports.deleteCategory = async(req,res,next) =>{
    try{
        let id = req.params.id;
        const response = await categoryModel.findByIdAndDelete(id)
        if(response == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid Category Id."
            next(err)

        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `category with id ${id} deleted successfully.`
            })
        }

    }catch(err){
        next(err)
    }    
}

exports.getCategoryById = async(req,res,next) =>{
    try{
        let id = req.params.id;
        const existing_categories = await categoryModel.find({_id:id},{__v:0});
        if(existing_categories == null){
            const err = new Error();
            err.status = 400;
            err.message = "Categories not found."
            next(err)
        }else{
            res.status(200)
            res.json({
                "status" : "success",
                "message" : `Categories deatils fecthed successfully.`,
                "data" : existing_categories
            })
        }
    }catch(err){
        next(err)
    }
}