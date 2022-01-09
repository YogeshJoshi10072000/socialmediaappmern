const express=require('express');
const { register, login, update, getallusers, deleteUser, getoneuser, followuser, unfollowuser } = require('../Controller/UserController');
const router=express.Router();


router.get('/',(req,res)=>{
    res.send("route");
})

router.route('/allusers').get(getallusers);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id/update').put(update);

router.route('/:id/delete').delete(deleteUser);
router.route('/:id/getone').get(getoneuser);

router.route('/:id/follow').post(followuser);

router.route('/:id/unfollow').post(unfollowuser);
module.exports=router;
