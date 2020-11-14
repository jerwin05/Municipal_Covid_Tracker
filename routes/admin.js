const express=require('express');
const adminRouter=express.Router();
const admin= require('../controllers/admin.js');

adminRouter

    .post   ('/signup',         admin.signup)
    .post   ('/login',          admin.login)
    .get    ('/profile',        admin.profile)
    .get    ('/residentList',   admin.resident_list)
    .put    ('/residentList',   admin.update_resident_remarks)
    .delete ('/residentList',   admin.delete_resident)
    .delete ('/profile',        admin.delete_profile);

module.exports=adminRouter;