const express = require('express');
const { create, login, getAll, getById, editById, deleteById, pushfollowID,pullfollowID, searchUser, searchFname} = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

//register new user
router.post('/add', async (req, res, next)=>{
    const { body } = req;
    try{
        const user = await create(body);
        res.json(user);
    }catch (e){
        next(e);
    }
});

//user login
router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await login(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  //get all users
router.get('/', async (req, res, next) => {
    try {
      const users = await getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  });

  //get one user
  router.get('/:id', async (req, res, next)=>{
    const { params: { id } } = req;
    try{
        const user = await getById(id);
        res.json(user)
    } catch(e){
        next (e); //sending error handler
    }
});

//edit user
router.patch('/edit', authMiddleware,async (req, res, next) => {
  const { user: { id }, body } = req;
  try {
    const user = await editById(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});


//delete user
  router.delete('/delete', authMiddleware, async (req, res, next)=>{

    const { user: { id } } = req;
    try{
        const user = await deleteById(id);
        res.json(user)
    } catch(e){
        next (e); //sending error handler
    }
});



//follow user
router.post('/follow/:fid',authMiddleware ,async(req, res, next)=>{
  const {user: { username }, params:{ fid }} = req;
  try{
    const userFollowID = await pushfollowID(username, fid);
    res.json(userFollowID);
  }catch (e){
    next(e);
  }
});

//unfollow user
router.post('/unfollow/:fid',authMiddleware ,async(req, res, next)=>{
  const {user: { username }, params:{ fid }} = req;
  try{
    const userFollowID = await pullfollowID(username, fid);
    res.json(userFollowID);
  }catch (e){
    next(e);
  }
});

//search user by username
router.get('/username/:username',authMiddleware, async(req, res, next)=>{
  username=req.params.username;
  try{
    const user = await searchUser(username);
    res.json(user);
  }catch (e){
    next(e);
  }
});

//search user first name
router.get('/userFname/:firstName',authMiddleware, async(req, res, next)=>{
  firstName=req.params.firstName;
  try{
    const userFname = await searchFname(firstName);
    res.json(userFname);
  }catch (e){
    next(e);
  }
});

module.exports = router;