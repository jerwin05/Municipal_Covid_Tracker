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
            var sql = "INSERT INTO admin (`first_name`,`middle_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + mname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
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

exports.resident_list=(req,res)=>{
    var sql="SELECT id,first_name,middle_name,last_name,mob_no,remarks FROM users";                         
     
    db.query(sql, function(err, results){// query resident list
       if(results.length){
          res.json(results);
       }
       else{
          res.json({
             errorMessage:'no results'
          });
       }
    });
};

exports.update_resident_remarks=(req,res)=>{
    const remarks=req.body.remarks||'negative';
    var sql = `UPDATE users SET remarks = '${remarks}' WHERE id=${req.body.id};`;
    // var sql = `UPDATE users SET remarks = '${req.body.remarks}' WHERE id='${req.session.id}';`;
    // var sql= 'DELETE FROM users;';
    db.query(sql, function(err, result) {
       if(result){
           res.send();
       }
   });
};

exports.delete_resident=(req,res)=>{
   var sql = `DELETE FROM users WHERE id=${req.body.id};`;
   db.query(sql, function(err, result) {
      if(result){
          res.send();
      }
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
