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

exports.authenticate_user=(req,res)=>{
   if(req.session.username){
      res.send('true');
   }else{
      res.send('false');
   }
}