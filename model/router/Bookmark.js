const {bookmarkMenu,getMyBookmark} = require("../controller/BookmarkController")
const {Protect} = require('./../midleware/Protect')

const app = require("express");
const router = app.Router()

router.post('/bookmark/:id', Protect, bookmarkMenu)
router.get('/bookmark', Protect, getMyBookmark)


module.exports = router