const express=require('express');
const Router=express.Router();
const announcement= require('../controllers/announcement.js');
const homepage= require('../controllers/homepage.js');

Router

    .get    ('/',                       homepage.index)
    .get    ('/authenticate-user',      homepage.authenticate_user)
    .get    ('/positive-coordinates',   homepage.get_positive_coordinates)
    .post   ('/profile-logout',         homepage.logout)
    .get    ('/announcement',           announcement.get_announcement)
    .post   ('/announcement',           announcement.post_announcement)
    .delete ('/announcement',           announcement.delete_announcement);

module.exports=Router;