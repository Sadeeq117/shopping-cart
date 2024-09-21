const express = require("express");
const router = express.Router();

router.all("*", (req,res,next)=>{
    let err = new Error()
    err.status = 401;
    err.message = "invalid route";
    next(err);
});

module.exports = router;