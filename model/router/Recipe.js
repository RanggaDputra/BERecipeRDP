const {getData,getDataById,deleteDataById,postData,putData,getDataDetail} = require("../controller/RecipeController")
const express = require('express');
const { Router } = require("express");
const router = express.Router()
const {Protect} = require('./../midleware/Protect')
const upload = require("../midleware/UploadPhoto");


router.get('/',Protect,getData)
router.get('/detail',getDataDetail)
router.get('/:id',getDataById)
router.delete('/:id',Protect,deleteDataById)
router.post('/',Protect,upload.single('photo'),postData)
router.put('/:id',Protect,upload.single('photo'),putData)

module.exports = router;









// // respond with "hello world" when a GET request is made to the homepage
// app.get('/recipe', (req, res) => {
//     res.status(200).json({ status: 200, message: "succes Get Data" ,dataR });
// })

// let dataR = ["somay","batagor","ketoprak"]


// app.post('/recipe', (req, res) => {
//     console.log(req.body)
//     const {name} = req.body

//     if(!name){
//         return res.status(404).json({"messsage":"input no required"})
//     }

//     dataR = [...dataR,name]

//     res.status(200).json({ "message": "Post recipe",dataR });
// })

// app.put('/recipe/:id', (req, res) => {
//     console.log(req.body)
//     const {name} = req.body
//     let {id} = req.params

//     if(!name || !id){
//         return res.status(404).json({"messsage":"input adn id no required"})
//     }
//     id = parseInt(id)

//     //validasi data
//     if(id > dataR.length || id <=0 || isNaN(id)){
//         return res.status(404).json({"message":"data not found"})
//     }

//     dataR.forEach((item,index)=>{
//         if(index === id-1){
//             dataR[index] = name
//         }
//     })

//     res.status(200).json({ "message": "Put recipe succes",dataR });
// })

// app.delete('/recipe/:id', (req, res) => {
//     let {id} = req.params
//     id = parseInt(id)



//     //validasi data
//     if(id > dataR.length || id <=0 || isNaN(id)){
//         return res.status(404).json({"message":"data not found"})
//     }

//  let newDataR = dataR.filter((item,index)=>{
//     if(index !== id-1){
//         return item
//     }
//  })
//  dataR = newDataR

//     res.status(200).json({ "message": "Delete recipe succes",dataR });
// })

// app.get('/recipe/:id', (req, res) => {
//     const {id} = req.params
//     res.status(200).json({ status: 200, message: "succes get data","data":`${dataR[id-1]}`});
// })