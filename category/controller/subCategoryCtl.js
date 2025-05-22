let catSchema = require("../model/catSchema")
let subCatSchema = require("../model/subCatSchema")

module.exports.addSubCat = async(req,res)=>{
    await catSchema.find({}).then((data)=>{
         res.render("addSubCategory" , {data})
    })
   
}

module.exports.addSubCategory = async(req,res)=>{
//     req.body.image = req.file.path;

//     await schema.create(req.body).then(() => {
//     res.redirect("/subcategory/addCat")
//   })

  await subCatSchema.create(req.body).then(()=>{
     res.redirect("/subcategory/addSubCat")
  })

}

module.exports.viewSubCat = async(req,res)=>{
    await subCatSchema.find({}).populate("categoryId").then((data)=>{
        res.render("viewSubCatagory" , {data})
    })
}