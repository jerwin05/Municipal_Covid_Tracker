exports.signup=(req,res)=>{
    var post  = req.body;
    var name= post.user_name;
    var pass= post.password;
    var fname= post.first_name;
    var mname= post.middle_name;
    var lname= post.last_name;
    var mob= post.mob_no
    // var sql = "ALTER TABLE announcements AUTO_INCREMENT = 1";
    // var sql= 'DELETE FROM users;';
    var sql="SELECT first_name FROM users WHERE `user_name`='"+name+"'";
    db.query(sql, function(err, result) {
        if(!result[0]){
            var sql = "INSERT INTO users (`first_name`,`middle_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + mname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
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
    var post  = req.body;//get the request body
    var name= post.user_name;//store member username and password to a variable
    var pass= post.password;
    
    //select user credentials that match the username and password
    var sql="SELECT latitude,longitude,id,mob_no,middle_name,first_name,last_name,user_name FROM users WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
    
    db.query(sql, function(err, results){      
        if(results.length){//if query successful, store user data to session
            req.session.username = results[0].user_name;
            req.session.myID = results[0].id;
            req.session.fname = results[0].first_name;
            req.session.mname = results[0].middle_name;
            req.session.lname = results[0].last_name;
            req.session.mNum = results[0].mob_no;
            req.session.lat = results[0].latitude;
            res.send('true');//send response
        }
        else{
            res.send('false');
        }
    });      
 };

exports.profile=(req,res)=>{//send member credentials
    res.json({
       lat:req.session.lat,
       fname:req.session.fname,
       mname:req.session.mname,
       lname:req.session.lname,
       mob_no:req.session.mNum
    });
 };

exports.add_location=(req,res)=>{//add user location to the database
    var sql = `UPDATE users SET latitude = '${req.body.lat}',longitude = '${req.body.long}' WHERE id=${req.session.myID};`;
    db.query(sql, function(err, result) {
       if(result){
           res.send();
       }
   });
 };

 exports.delete_profile=(req,res)=>{//delete current user from database

    var sql = `DELETE FROM users WHERE id=${req.session.myID};`;
    db.query(sql, function(err, result) {
       if(result){
           res.send();//if query successful, send response
           req.session.destroy();
       }
   });
 };