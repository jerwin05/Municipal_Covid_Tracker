exports.signup=(req,res)=>{
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   var fname= post.first_name;
   var mname= post.middle_name;
   var lname= post.last_name;
   var mob= post.mob_no
   
   var sql="SELECT first_name FROM admin WHERE `user_name`='"+name+"'";
   db.query(sql, function(err, result) {
        if(!result[0]){
            sql = "INSERT INTO admin (`first_name`,`middle_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + mname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
            db.query(sql, function(err, result) {
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
     db.query(sql, function(err, result) {
       if(result){
         res.send();
       }
     });
   }else{
     sql = `UPDATE covid_updates
       SET new_cases='${new_cases}', date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}'
       WHERE id=1;`;
     db.query(sql, function(err, result) {
      if(result){
           res.send();
      }
   });
   }
}

exports.update_covid_updates_active_cases=(req,res)=>{
   var sql = `SELECT id FROM covid_patient_list WHERE status IN ('admitted','strict isolation');`;
   db.query(sql, function(err, result) {
      if(result.length){
         sql = `UPDATE covid_updates
            SET active_cases = ${result.length}
            WHERE id=1;`;
         db.query(sql,(err,result)=>{
            if(result){
               sql = `SELECT active_cases FROM covid_updates WHERE id=1;`;
               db.query(sql, function(err, result) {
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
               db.query(sql, function(err, result) {
                  if(result.length){
                     res.json(result);
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
      WHERE id=${req.body.id};`;
   db.query(sql, function(err, result) {
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
//     db.query(sql, function(err, result) {
//        if(result){
//            res.send();
//        }
//    });
// };

exports.add_patient=(req,res)=>{
   var sql = `INSERT INTO covid_patient_list
      (patient_no,age,gender,barangay,status)
      VALUES ('${req.body.patient_no}','${req.body.age}','${req.body.gender}','${req.body.barangay}','${req.body.status}');`;
   db.query(sql, function(err, result) {
      if(result){
          res.send();
      }
  });
};
exports.delete_patient=(req,res)=>{
   var sql = `DELETE FROM covid_patient_list WHERE id=${req.body.id};`;
   db.query(sql, function(err, result) {
      if(result){
          res.send();
      }
  });
};

exports.post_announcement=(req,res)=>{
   const date= new Date().toString().substring(0,21);
   var sql = "INSERT INTO announcements (`title`,`body`,`date`) VALUES ('" + req.body.title + "','" + req.body.body + "','" + date + "')";
   db.query(sql, function(err, result) {
       if(result){
           res.send('true');
       }
   });
}

exports.delete_announcement=(req,res)=>{
   var sql = `DELETE FROM announcements WHERE id='${req.body.id}';`;
   db.query(sql, function(err, result) {
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
    db.query(sql, function(err, result) {
       if(result){
           res.send();//if query successful, send response
           req.session.destroy();
       }
    });
 };

