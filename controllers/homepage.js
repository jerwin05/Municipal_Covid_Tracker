exports.index=((req,res)=>{
   res.sendFile('/index.html');
});

exports.logout=(req,res)=>{
   req.session.destroy(()=>{
      res.send();//send response
   });
};

exports.get_positive_coordinates=(req,res)=>{
   var sql = `SELECT latitude,longitude FROM users WHERE remarks='positive';`;
   db.query(sql, function(err, result) {
      if(result.length){
           res.json(result);
      }
      else{
         res.json({
            message:'no resident'
         });
      }
  });
}

exports.authenticate_index=(req,res)=>{
   if(req.session.username){
      var sql="SELECT first_name FROM admin WHERE `user_name`='"+req.session.username+"' and first_name = '"+req.session.fname+"' and last_name = '"+req.session.lname+"' and mob_no = '"+req.session.mNum+"'";
      db.query(sql, function(err, result) {
         if(result[0]){
            res.send('admin');
         }else{
            res.send('member');
         }
      });
   }else{
      res.send('index');
   }
}

exports.authenticate_admin=(req,res)=>{
   if(req.session.username){
      var sql="SELECT first_name FROM admin WHERE `user_name`='"+req.session.username+"' and first_name = '"+req.session.fname+"' and last_name = '"+req.session.lname+"' and mob_no = '"+req.session.mNum+"'";
      db.query(sql, function(err, result) {
         if(!result[0]){
            res.send('member');
         }
         else{
            res.send('admin');
         }
      });
   }
   else{
      res.send('index')
   }
}

exports.authenticate_member=(req,res)=>{
   if(req.session.username){
      var sql="SELECT first_name FROM users WHERE `user_name`='"+req.session.username+"' and first_name = '"+req.session.fname+"' and last_name = '"+req.session.lname+"' and mob_no = '"+req.session.mNum+"'";
      db.query(sql, function(err, result) {
         if(!result[0]){
            res.send('admin');
         }
         else{
            res.send('member');
         }
      });
   }
   else{
      res.send('index')
   }
}