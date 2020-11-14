const express=require('express');
const Router=express.Router();
const announcement= require('../controllers/announcement.js');
const homepage= require('../controllers/homepage.js');

Router

    .get    ('/',                       homepage.index)
    .get    ('/authenticate-index',     homepage.authenticate_index)
    .get    ('/authenticate-admin',     homepage.authenticate_admin)
    .get    ('/authenticate-member',    homepage.authenticate_member)
    .get    ('/positive-coordinates',   homepage.get_positive_coordinates)
    .post   ('/profile-logout',         homepage.logout)
    .get    ('/announcement',           announcement.get_announcement)
    .post   ('/announcement',           announcement.post_announcement)
    .delete ('/announcement',           announcement.delete_announcement);

module.exports=Router;