const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1/Mernreact")

// const db = mongoose.connection

// db.once("open",(err)=>{
//     err ? console.log(err) : console.log("db connected");
// })

mongoose.connect("mongodb+srv://yasheshbhatt:777@cluster0.y4umyfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db connected");
    
})

// module.exports = db
module.exports = mongoose
