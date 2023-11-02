const {likeMenu,getMyLike,countMenuLike} = require("../controller/LikeController")
const {Protect} = require('./../midleware/Protect')

const app = require("express");
const router = app.Router()

router.post('/like/:id', Protect, likeMenu)
router.get('/like', Protect, getMyLike)
router.get('/like/:id', countMenuLike)


module.exports = router