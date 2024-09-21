const mongoose = require("mongoose")
const {Schema} = mongoose

const productSchema = new mongoose.Schema({
    name : String,
    shortDescription : String,
    description : String,
    price : Number,
    discount : Number,
    images : Array(String),
    categoryId : Array({type : Schema.Types.ObjectId, ref: "categories"}), // giving reffernce of object Id from categories collection
    brandId :  {type : Schema.Types.ObjectId, ref: "brands"}

});

const product = mongoose.model("products",productSchema)

module.exports = product;