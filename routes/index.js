const express=require('express');
const Router=express.Router();
const announcement= require('../controllers/announcement.js');
const homepage= require('../controllers/homepage.js');
const covidpositivehistory= require('../controllers/covidpositivehistory');
const covidpositivelist= require('../controllers/covidpositivelist');
const covidupdate= require('../controllers/covidupdate');

Router

    .get    ('/',                       homepage.index)
    .get    ('/authenticate-user',      homepage.authenticate_user)
    .get    ('/positive-coordinates',   homepage.get_positive_coordinates)
    .get    ('/covid-update',           covidupdate.get_update)
    .get    ('/covid-positive-list',    covidpositivelist.get_list)
    .get    ('/announcement',           announcement.get_announcement)
    .post   ('/announcement',           announcement.post_announcement)
    .delete ('/announcement',           announcement.delete_announcement);

module.exports=Router;