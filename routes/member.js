const express=require('express');
const memberRouter=express.Router();
const member= require('../controllers/member.js');

memberRouter

    .post   ('/signup',          member.signup)
    .post   ('/login',           member.login)
    .get    ('/profile',         member.profile)
    .put    ('/profile',         member.add_location)
    .delete ('/profile',         member.delete_profile);

module.exports=memberRouter;