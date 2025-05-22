const mongoose = require("mongoose")

const schema = mongoose.Schema({
    subCatName:{
        type : String,
        required : true
    },
    categoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "catagory",
        required : true
    }
})


const subCatSchema = mongoose.model("Subcatagory",schema);
module.exports = subCatSchema;