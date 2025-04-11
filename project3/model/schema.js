const mongoose = require("mongoose");


const schema = mongoose.Schema({
    image : {
        type : String,
        require:true
    },
    name : {
        type : String,
        require:true
    },
    author : {
        type : String,
        require:true
    },
    pages : {
        type : Number,
        require:true
    },
})

const firstschema = mongoose.model("book",schema);

module.exports = firstschema;