const {postCommentMenu,getCommentMenu,getCommentMenuEdit,editCommentMenu,deleteComment} = require("../controller/CommentController")
const {Protect} = require('./../midleware/Protect')

const app = require("express");
const router = app.Router()

router.post('/comment/:id', Protect, postCommentMenu)
router.get('/comment/:id', getCommentMenu)
router.get('/comment/id/:id', Protect, getCommentMenuEdit)
router.put('/comment/:id', Protect, editCommentMenu)
router.delete('/comment/:id', Protect, deleteComment)


module.exports = router