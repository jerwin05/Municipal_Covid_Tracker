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
   var sql = `SELECT * FROM patient_list_history_date;`;
   db.query(sql, (err,result)=> {
     result.forEach(element => {
       let counter=0;
       const history={
         date:{
            date_id:element.date_id,
            date:element.date
         }
       }
       sql = `SELECT patient_no,age,gender,barangay,status FROM patient_list_history WHERE date_id=${element.date_id};`;
       db.query(sql, (err,result)=> {
         result.forEach((element,index,array)=>{
            history[`patient${++counter}`]=element;
            // if(array.length==index+1){
            //    // res.type('application/json');
            //    // res.set('Content-Type', 'application/json');
            //    // res.json(JSON.stringify(history));
            //    // res.json(history);
            // }
         })
         res.json(history);
         console.log(history);
       });
     });
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