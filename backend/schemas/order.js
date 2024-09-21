const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    date : Date,
    items : Array(any),
    status : Number
});

const order = mongoose.model("orders",orderSchema)

module.exports = order;