const mongoose = require("mongoose")

const schema = mongoose.Schema({
    catName:{
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
   
})


const catschema = mongoose.model("catagory",schema);
module.exports = catschema;