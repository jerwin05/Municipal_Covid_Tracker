const express=require('express');
const Router=express.Router();
const homepage= require('../controllers/homepage.js');

Router

    .get    ('/',                       homepage.index)
    .get    ('/authenticate-user',      homepage.authenticate_user)
    .get    ('/announcement',           homepage.get_announcement)
    .get    ('/covid-update',           homepage.get_covid_updates)
    .get    ('/new-cases',              homepage.get_new_cases)
    .get    ('/patient-list',           homepage.get_patient_list)
    .get    ('/patient-list-history',   homepage.get_patient_list_history);

module.exports=Router;