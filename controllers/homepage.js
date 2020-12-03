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
   var sql = `SELECT * FROM covid_updates WHERE id=1;`;
   db.query(sql, (err,result)=> {
      if(result.length){
           res.json(result);
      }
  });
}

exports.get_patient_list=(req,res)=>{
   var sql = `SELECT * FROM covid_patient_list;`;
   db.query(sql, (err,result)=> {
      if(result){
         if(result.length){
            res.json(result);
         }else{
            res.json({
               message:'no resident'
            });
         }
      }else{
         console.log(err);
      }
  });
}
exports.get_patient_list_history=(req,res)=>{
//    var sql = `SELECT * FROM patient_list_history_date;`;
//    db.query(sql, (err,result)=> {
      
//   });
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
   db.query(sql, (err,result)=> {
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