const {getDataUsers,getDataUserById,deleteDataUserById,postDataUser,putDataUser,getDataUserDetail,login,register,verify} = require("../controller/UsersController")
const express = require('express');
const { Router } = require("express");
const router = express.Router()
const upload = require("../midleware/UploadPhoto");


router.get('/',getDataUsers)
router.get('/detail',getDataUserDetail)
router.get('/:id',getDataUserById)
router.delete('/:id',deleteDataUserById)
router.post('/',postDataUser)
router.post('/login',login)
router.post('/register',upload.single('photo'),register)
router.put('/:id',putDataUser)
router.get('/verify/:id',verify)



module.exports = router;