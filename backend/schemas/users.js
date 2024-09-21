const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userName : String,
    email : String,
    password : String,
    isAdmin : Boolean
});

const users = mongoose.model("users" , usersSchema);

module.exports = users;
