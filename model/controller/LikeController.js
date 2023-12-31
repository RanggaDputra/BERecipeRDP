const {
    postLike,
    getMyLikeMenu,
    getLikeById,
    getLikeByUser,
    delMyLikeMenu,
    countLike
  } = require('../model2/LikeModel');
  const {
    getRecipeById
  } = require('../model2/RecipeModel')
  
  const LikeController = {
    likeMenu: async (req, res) => {
      try {
        const {id} = req.params;
        // let id = recipe_id
        // return console.log('cek recipe id', id)
  
        if (!id) {
          return res.status(400).json({ status: 400, message: 'recipe_id is required!' });
        }
  
        const user_id = req.payload.id;
        let checkMenu = await getRecipeById(id)
        let checkUserLiked = await getLikeByUser(user_id);
        let checkMenuLiked = await getLikeById(user_id, id)
        // return console.log('checliked', checkLiked)
  
        if(!checkMenu.rows[0]){
          return res.status(404).json({status:404, message:'menu not found!'})
        }
    
        if (checkMenuLiked.rows[0]) {
          await delMyLikeMenu(user_id, id)
          return res.status(200).json({
            status: 200,
            message: 'Delete like menu success!',
          });
        }
        
        let post = {
          recipe_id: id,
          user_id
        };
  
        const result = await postLike(post);
        if (result.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: 'Like menu success!',
            data: result.rows[0],
          });
        }
      } catch (error) {
        console.error('Like menu error', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Like menu error, something happens!' });
      }
    },
    getMyLike: async (req, res) => {
      try {
        const { id } = req.payload;
        const result = await getMyLikeMenu(id);
        // console.log(result)
        if (result.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Get my like menu success!',
            data: result.rows,
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: 'Data not found!' });
        }
      } catch (error) {
        console.error('Error when get my like menu', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Get my like menu failed!' });
      }
    },
    countMenuLike: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await countLike(id);
        if (result.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: 'Count like success!',
            data: result.rows[0],
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: 'Like is zero!' });
        }
      } catch (error) {
        console.error('Error when count liked menu by id', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Count liked menu by id failed!' });
      }
    },
  
  };
  
  module.exports = LikeController;