const express=require('express');
const adminRouter=express.Router();
const admin= require('../controllers/admin.js');

adminRouter

    .post   ('/signup',                     admin.signup)
    .post   ('/login',                      admin.login)
    .get    ('/profile',                    admin.profile)
    .post   ('/patient-list',               admin.add_patient)
    .put    ('/patient-list',               admin.update_patient_status)
    .delete ('/patient-list',               admin.delete_patient)
    .put    ('/covid-update',               admin.update_covid_stats)
    .put    ('/covid-update/active-cases',  admin.update_covid_updates_active_cases)
    .post   ('/announcement',               admin.post_announcement)
    .delete ('/announcement',               admin.delete_announcement)
    .delete ('/profile',                    admin.delete_profile)
    .post   ('/profile',                    admin.logout);

module.exports=adminRouter;