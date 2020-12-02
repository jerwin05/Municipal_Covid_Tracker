exports.index=((req,res)=>{
   res.sendFile('/index.html');
});

exports.authenticate_user=(req,res)=>{
   if(req.session.username){
      res.send('true');
   }else{
      res.send('false');
   }
}

exports.get_covid_updates=(req,res)=>{
   var sql = `SELECT * FROM covid_updates;`;
   db.query(sql, function(err, result) {
      if(result.length){
           res.json(result);
      }
  });
}

exports.get_patient_list=(req,res)=>{
   var sql = `SELECT * FROM covid_positive_list;`;
   db.query(sql, function(err, result) {
      if(result.length){
           res.json(result);
      }else{
       res.json({
         message:'no resident'
       });
      }
  });
}

exports.get_announcement=(req,res)=>{
   var sql="SELECT * FROM announcements";                           
   db.query(sql, function(err, results){
       if(results.length){
           res.json(results);
       }
       else{
           res.json({
               errorMessage:'no announcement'
           });
       }
   });
}

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