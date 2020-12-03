exports.signup=(req,res)=>{
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   var fname= post.first_name;
   var mname= post.middle_name;
   var lname= post.last_name;
   var mob= post.mob_no
   
   var sql="SELECT first_name FROM admin WHERE `user_name`='"+name+"'";
   db.query(sql, (err,result)=> {
        if(!result[0]){
            sql = "INSERT INTO admin (`first_name`,`middle_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + mname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
            db.query(sql, (err,result)=> {
                if(result){
                    res.send('true');
                }
            });
        }
        else{
            res.send('false');
        }
   });
}

exports.login = function(req, res){
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   
   var sql="SELECT id,mob_no,first_name,middle_name,last_name,user_name FROM admin WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
   
   db.query(sql, function(err, results){      
      if(results.length){
         req.session.username = results[0].user_name;
         req.session.fname = results[0].first_name;
         req.session.mname = results[0].middle_name;
         req.session.lname = results[0].last_name;
         req.session.mNum = results[0].mob_no;
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
      mob_no:req.session.mNum
   });
};

exports.update_covid_stats=(req,res)=>{
   const date_updated=req.body.date_updated;
   const new_cases=req.body.new_cases;
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
       SET new_cases='${new_cases}', date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}',notes='${notes}'
       WHERE id=1;`;
     db.query(sql, (err,result)=> {
       if(result){
         res.send();
       }
     });
   }else{
     sql = `UPDATE covid_updates
       SET new_cases='${new_cases}', date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}'
       WHERE id=1;`;
     db.query(sql, (err,result)=> {
      if(result){
           res.send();
      }
   });
   }
}

exports.update_covid_updates_active_cases=(req,res)=>{
   var sql = `SELECT patient_id FROM covid_patient_list WHERE status IN ('admitted','strict isolation');`;
   db.query(sql, (err,result)=> {
      if(result.length){
         sql = `UPDATE covid_updates
            SET active_cases = ${result.length}
            WHERE id=1;`;
         db.query(sql,(err,result)=>{
            if(result){
               sql = `SELECT active_cases FROM covid_updates WHERE id=1;`;
               db.query(sql, (err,result)=> {
                  if(result.length){
                     res.json(result);
                  }
               });
            }
         });
      }else if(result){
         sql = `UPDATE covid_updates
            SET active_cases = 0
            WHERE id=1;`;
         db.query(sql,(err,result)=>{
            if(result){
               sql = `SELECT active_cases FROM covid_updates WHERE id=1;`;
               db.query(sql, (err,result)=> {
                  if(result){ 
                     if(result.length){
                        res.json(result);
                     }
                  }
               });
            }
         });
      }
   });
 }

exports.update_patient_status=(req,res)=>{
   var sql =`UPDATE covid_patient_list 
      SET status = '${req.body.status}' 
      WHERE patient_id=${req.body.id};`;
   db.query(sql, (err,result)=> {
      if(result){
         res.send();
      }
   });
};

// exports.update_resident_remarks=(req,res)=>{
//     const remarks=req.body.remarks||'negative';
//     var sql = `UPDATE users SET remarks = '${remarks}' WHERE id=${req.body.id};`;
//     // var sql = `UPDATE users SET remarks = '${req.body.remarks}' WHERE id='${req.session.id}';`;
//     // var sql= 'DELETE FROM users;';
//     db.query(sql, (err,result)=> {
//        if(result){
//            res.send();
//        }
//    });
// };

exports.add_patient=(req,res)=>{
   const gender=req.body.gender.toLowerCase();
   const barangay=req.body.barangay.toLowerCase();
   const status=req.body.status.toLowerCase();
   var sql = `INSERT INTO covid_patient_list
      (patient_no,age,gender,barangay,status)
      VALUES ('${req.body.patient_no}','${req.body.age}','${gender}','${barangay}','${status}');`;
   db.query(sql, (err,result)=> {
      if(result){
          res.send();
      }
  });
};

exports.delete_patient=(req,res)=>{

   //get information about the patient that is about to be deleted
   var sql = `SELECT * FROM covid_patient_list WHERE patient_id=${req.body.id};`;
   db.query(sql, (err,result)=> {

      //if the patient status is recovered,
      //store infromtation in an object
      if(result[0].status=='recovered'){
         const patient={
            patient_no:result[0].patient_no,
            age:result[0].age,
            gender:result[0].gender,
            barangay:result[0].barangay,
            status:result[0].status
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
                  sql = ` INSERT INTO patient_list_history
                  VALUES (null,'${patient.recovered_date_id}','${patient.patient_no}','${patient.age}','${patient.gender}','${patient.barangay}','${patient.status}');`;
                  db.query(sql, ()=> {
                     sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
                     db.query(sql, (err,result)=> {
                        if(result){
                            res.send();
                        }
                     });
                  });
               }
               //else insert the date in the database,
               //then insert the patient
               else{
                  sql = `INSERT INTO patient_list_history_date
                     VALUES (null,'${date_updated}');`;
                  db.query(sql, ()=> {
                     sql = `SELECT date_id FROM patient_list_history_date WHERE date_updated='${date_updated}';`;
                     db.query(sql, (err,result)=> {
                        patient.recovered_date=result[0].date_id;
                        sql = ` INSERT INTO patient_list_history
                        VALUES (null,'${patient.recovered_date_id}','${patient.patient_no}','${patient.age}','${patient.gender}','${patient.barangay}','${patient.status}');`;
                        db.query(sql, ()=> {
                           sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
                           db.query(sql, (err,result)=> {
                              if(result){
                                  res.send();
                              }
                           });
                        });
                     });
                  });
               }
            });


            // sql = `INSERT INTO patient_list_history_date
            //    VALUES (null,'${date_updated}');`;
            //    console.log(patient.patient_no);
            // db.query(sql, (err)=> {

            //    sql = `SELECT date_id FROM patient_list_history_date
            //    WHERE date_updated='${date_updated}';`;
            //    db.query(sql, (err,result)=> {
            //       console.log(date_updated);
            //       console.log(result);
            //       patient.recoverd_date=result[0].date_id;

            //       sql = `INSERT INTO patient_list_history
            //       VALUES (null,'${patient.patient_no}','${patient.age}','${patient.gender}','${patient.barangay}','${patient.status}','${patient.recoverd_date}');`;
            //       db.query(sql, ()=> {

            //          sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
            //          db.query(sql, (err,result)=> {
            //             if(result){
            //                 res.send();
            //             }
            //          });
            //       });
            //    });
            // });
         });
      }else{
         sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
         db.query(sql, (err,result)=> {
            if(result){
                res.send();
            }
         });
      }
   });

//    var sql = `SELECT * FROM covid_patient_list WHERE patient_id=${req.body.id};`;
//    db.query(sql, (err,result)=> {
//       if(result){
//          if(result[0].status=='recovered'){
//             sql = `INSERT INTO patient_list_history
//             (patient_no,age,gender,barangay,status)
//             VALUES ('${result[0].patient_no}','${result[0].age}','${result[0].gender}','${result[0].barangay}','${result[0].status}');`;
//             db.query(sql, (err,result)=> {
//                if(result){
//                   sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
//                   db.query(sql, (err,result)=> {
//                      if(result){
//                          res.send();
//                      }
//                  });
//                }
//             });
      //    }else{
      //       sql = `DELETE FROM covid_patient_list WHERE patient_id=${req.body.id};`;
      //       db.query(sql, (err,result)=> {
      //          if(result){
      //              res.send();
      //          }
      //       });
      //    }
      // }
//   });


};

exports.post_announcement=(req,res)=>{
   const date= new Date();
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

