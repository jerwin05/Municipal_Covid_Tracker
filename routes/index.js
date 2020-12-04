const express=require('express');
const Router=express.Router();
const homepage= require('../controllers/homepage.js');

const covidpositivehistory= require('../controllers/covidpositivehistory');
const covidpositivelist= require('../controllers/covidpositivelist');
const covidupdate= require('../controllers/covidupdate');

Router

    .get    ('/',                       homepage.index)
    .get    ('/authenticate-user',      homepage.authenticate_user)
    .get    ('/positive-coordinates',   homepage.get_positive_coordinates)
    .get    ('/announcement',           homepage.get_announcement)
    .get    ('/covid-update',           homepage.get_covid_updates)
    .get    ('/patient-list',           homepage.get_patient_list)
    .get    ('/patient-list-history',           homepage.get_patient_list_history);

module.exports=Router;