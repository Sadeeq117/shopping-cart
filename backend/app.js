const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const requestLogger = require("./Utilites/requestLogger");
const errorLogger = require("./Utilites/errorLogger");
const categoryRoutes = require("./routes/categoryroutes");
const brandRouter = require("./routes/brandrouters");
const productRouter = require("./routes/productrouter");
const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use("/category",categoryRoutes);
app.use("/brand",brandRouter);
app.use("/product",productRouter);
app.use('/',router);
app.use(errorLogger);


app.listen(port,()=>{
    console.log(`Serve is running port ${port}`)
    start()
})

function start(){
    //Local
    // mongoose.connect("mongodb://localhost:27017/bonStay").then(
    //     ()=>{
    //         console.log("connection is successful...");
    //     }
    // )
    // Atlas hosted
    mongoose.connect("mongodb+srv://sksadeeq2000:TyXj4YQRypioZQoS@bonstay.xw8kuui.mongodb.net/shopping_cart?retryWrites=true&w=majority&appName=bonstay").then(
        ()=>{
            console.log("connection is successful...");
        }
    )
}

