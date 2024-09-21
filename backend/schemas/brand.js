const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    name : String,

});

const brand = mongoose.model("brands",brandSchema)

module.exports = brand;