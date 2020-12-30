exports.signup=(req,res)=>{
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   var fname= post.first_name;
   var mname= post.middle_name;
   var lname= post.last_name;
   var mob= post.mob_no;
   var admin_id= post.admin_id;

   if(/1880-\d{4}/.test(admin_id)){
      var sql="SELECT first_name FROM admin WHERE `user_name`='"+name+"'";
      db.query(sql, (err,result)=> {
           if(!result[0]){
               sql = "INSERT INTO admin (`first_name`,`middle_name`,`last_name`,`mob_no`,`admin_id`,`user_name`, `password`) VALUES ('" + fname + "','" + mname + "','" + lname + "','" + mob + "','" + admin_id + "','" + name + "','" + pass + "')";
               db.query(sql, (err,result)=> {
                   if(result){
                       res.send('success');
                   }
               });
           }
           else{
               res.send('username taken');
           }
      });
   }else{
      res.send('wrong id');
   }

}

exports.login = function(req, res){
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   
   var sql="SELECT id,mob_no,first_name,middle_name,last_name,admin_id,user_name FROM admin WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
   
   db.query(sql, function(err, results){      
      if(results.length){
         req.session.username = results[0].user_name;
         req.session.fname = results[0].first_name;
         req.session.mname = results[0].middle_name;
         req.session.lname = results[0].last_name;
         req.session.mNum = results[0].mob_no;
         req.session.admin_id = results[0].admin_id;
         req.session.myID = results[0].id;
         res.send('true');
      }
      else{
         res.send('false');
      }
   });      
};

exports.profile=(req,res)=>{//send admin credentials
   res.json({
      fname:req.session.fname,
      mname:req.session.mname,
      lname:req.session.lname,
      admin_id:req.session.admin_id,
      mob_no:req.session.mNum
   });
};

exports.update_covid_stats=(req,res)=>{
   const date_updated=req.body.date_updated;
   const suspected=req.body.suspected;
   const probable=req.body.probable;
   const tested_negative=req.body.tested_negative;
   const confirmed_cases=req.body.confirmed_cases;
   const recovered=req.body.recovered;
   const death=req.body.death;
   const notes=req.body.notes;
 
   let sql='';
   if(notes){
     sql = `UPDATE covid_updates
       SET date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}',notes='${notes}'
       WHERE id=1;`;
     db.query(sql, (err,result)=> {
       if(result){
         res.send();
       }
     });
   }else{
     sql = `UPDATE covid_updates
       SET date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}'
       WHERE id=1;`;
      db.query(sql, (err,result)=> {
         if(result){
           res.send();
         }
      });
   }
}

exports.reset_covid_updates_new_cases=(req,res)=>{
   var sql = `UPDATE covid_updates
      SET new_cases = 0
      WHERE id=1;`;
   db.query(sql, (err,result)=> {
      if(result){
         var sql = `TRUNCATE TABLE covid_new_case`;
         db.query(sql, (err,result)=> {
            if(result){
               res.send();
            }
      });
      }
   });
}

exports.update_covid_updates_active_cases=(req,res)=>{
   var sql = `SELECT id FROM covid_patient_status WHERE status IN ('admitted','strict isolation');`;
   db.query(sql, (err,result)=> {
      if(result.length){
         res.send(`${result.length}`);
         sql = `UPDATE covid_updates
            SET active_cases = ${result.length}
            WHERE id=1;`;
         db.query(sql);
      }else if(result){
         res.send('0');
         sql = `UPDATE covid_updates
            SET active_cases = 0
            WHERE id=1;`;
         db.query(sql);
      }
   });
}

exports.update_patient_status=(req,res)=>{
   var sql =`UPDATE covid_patient_status 
      SET status = '${req.body.status}' 
      WHERE id=${req.body.id};`;
   db.query(sql, (err,result)=> {
      if(result){
         res.send();
      }
   });
};

exports.add_patient=(req,res)=>{
   const patient_no=req.body.patient_no;
   const age=req.body.age;
   const gender=req.body.gender;
   const barangay=req.body.barangay;
   const status=req.body.status;
   const new_case=req.body.new_case;
   const active_case=req.body.active_case;

   var sql=`SELECT id FROM covid_patient_details WHERE patient_no='${patient_no}'`;
   db.query(sql,(err,result)=>{
      if(result.length){
         res.send('patient exist');
      }else{
         sql=`SELECT patient_id FROM patient_list_history WHERE patient_no='${patient_no}'`;
         db.query(sql,(err,result)=>{
            if(result.length){
               res.send('patient exist');
            }else{
               sql = `INSERT INTO covid_patient_status
               VALUES (null,'${status}');`;
               db.query(sql, (err,result)=> {
                  if(result){
                     sql = `INSERT INTO covid_patient_details
                     VALUES (null,'${patient_no}','${age}','${gender}','${barangay}');`;
                     db.query(sql, (err,result)=> {
                        if(result){
                           if(active_case){
                              sql = `UPDATE covid_updates
                              SET new_cases='${new_case}',active_cases='${active_case}'
                              WHERE id=1;`;
                              db.query(sql, (err,result)=> {
                                 if(result){
                                    sql = `SELECT barangay_id FROM barangay WHERE barangay='${barangay}';`;
                                    db.query(sql, (err,result)=> {
                                       if(result){
                                          sql = `INSERT INTO covid_new_case VALUES
                                             (null,'${result[0].barangay_id}','${patient_no}')`;
                                          db.query(sql, (err,result)=> {
                                             if(result){
                                                res.send();
                                             }
                                          });
                                       }
                                    });
                                 }
                              });
                           }else{
                              sql = `UPDATE covid_updates
                              SET new_cases='${new_case}'
                              WHERE id=1;`;
                              db.query(sql, (err,result)=> {
                                 if(result){
                                    sql = `SELECT barangay_id FROM barangay WHERE barangay='${barangay}';`;
                                    db.query(sql, (err,result)=> {
                                       if(result){
                                          sql = `INSERT INTO covid_new_case VALUES
                                             (null,'${result[0].barangay_id}','${patient_no}')`;
                                          db.query(sql, (err,result)=> {
                                             if(result){
                                                res.send();
                                             }
                                          });
                                       }
                                    });
                                 }
                              });
                           }
                        }
                     });
                  }
               });
            }
         });
      }
   });
};

exports.delete_patient=(req,res)=>{
   //get information about the patient that is about to be deleted
   var sql = `SELECT patient_no,age,gender,barangay,status
      FROM covid_patient_details
      INNER JOIN covid_patient_status
      ON covid_patient_details.id = covid_patient_status.id 
      WHERE covid_patient_status.id=${req.body.id};`;
   db.query(sql, (err,result)=> {

      //if the patient status is recovered,
      //store infromtation in an object
      if(result[0].status=='recovered'){
         const patient={
            patient_no:result[0].patient_no,
            age:result[0].age,
            gender:result[0].gender,
            barangay:result[0].barangay
         }

         //select the current date in the covid updates
         sql = `SELECT date_updated FROM covid_updates;`;
         db.query(sql, (err,result)=> {
            const date_updated=result[0].date_updated;

            //check if the current date is stored in the
            //history_date database
            sql = `SELECT date_id FROM patient_list_history_date WHERE date='${date_updated}';`;
            db.query(sql, (err,result)=> {
               //if yes insert the patient with the date id
               if(result.length){
                  patient.recovered_date_id=result[0].date_id;
                  sql = `INSERT INTO patient_list_history VALUES (null,'${patient.recovered_date_id}','${patient.patient_no}','${patient.age}','${patient.gender}','${patient.barangay}');`;
                  db.query(sql, ()=> {
                     sql = `DELETE FROM covid_patient_status WHERE id=${req.body.id};`;
                     db.query(sql, (err,result)=> {
                        if(result){
                           sql = `DELETE FROM covid_patient_details WHERE id=${req.body.id};`;
                           db.query(sql, (err,result)=> {
                              if(result){
                                 res.send('recovered');
                              }
                           });
                        }
                     });
                  });
               }
               //else insert the date in the database,
               //then insert the patient
               else{
                  sql = `INSERT INTO patient_list_history_date VALUES (null,'${date_updated}');`;
                  db.query(sql, ()=> {
                     sql = `SELECT date_id FROM patient_list_history_date WHERE date='${date_updated}';`;
                     db.query(sql, (err,result)=> {
                        patient.recovered_date_id=result[0].date_id;
                        sql = ` INSERT INTO patient_list_history VALUES (null,'${patient.recovered_date_id}','${patient.patient_no}','${patient.age}','${patient.gender}','${patient.barangay}');`;
                        db.query(sql, ()=> {
                           sql = `DELETE FROM covid_patient_status WHERE id=${req.body.id};`;
                           db.query(sql, (err,result)=> {
                              if(result){
                                 sql = `DELETE FROM covid_patient_details WHERE id=${req.body.id};`;
                                 db.query(sql, (err,result)=> {
                                    if(result){
                                       res.send('recovered');
                                    }
                                 });
                              }
                           });
                        });
                     });
                  });
               }
            });
         });
      }else{
         sql = `DELETE FROM covid_patient_status WHERE id=${req.body.id};`;
         db.query(sql, (err,result)=> {
            if(result){
               sql = `DELETE FROM covid_patient_details WHERE id=${req.body.id};`;
               db.query(sql, (err,result)=> {
                  if(result){
                     res.send();
                  }
               });
            }
         });
      }
   });
};

exports.delete_history=(req,res)=>{
   var sql = `DELETE FROM patient_list_history WHERE date_id=${req.body.date_id};`;
   db.query(sql, (err,result)=> {
      if(result){
         sql = `DELETE FROM patient_list_history_date WHERE date_id=${req.body.date_id};`;
         db.query(sql, (err,result)=> {
            if(result){
               res.send();
            }
         });
      }
   });
}

exports.post_announcement=(req,res)=>{
   const date= new Date().toString().substring(0,21);
   var sql = "INSERT INTO announcements (`title`,`body`,`date`) VALUES ('" + req.body.title + "','" + req.body.body + "','" + date + "')";
   db.query(sql, (err,result)=> {
      if(result){
         res.send('true');
      }
   });
}

exports.delete_announcement=(req,res)=>{
   var sql = `DELETE FROM announcements WHERE id='${req.body.id}';`;
   db.query(sql, (err,result)=> {
      if(result){
          res.send();//if query successful, send response
      }
   });
}

exports.logout=(req,res)=>{
   req.session.destroy(()=>{
      res.send();//send response
   });
};

exports.delete_profile=(req,res)=>{//delete current user from database
   var sql = `DELETE FROM admin WHERE id=${req.session.myID};`;
   db.query(sql, (err,result)=> {
      if(result){
         res.send();//if query successful, send response
         req.session.destroy();
      }
   });
};