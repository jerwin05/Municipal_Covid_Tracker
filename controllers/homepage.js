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

exports.get_new_cases=(req,res)=>{
   var sql = `SELECT barangay
      FROM barangay
      INNER JOIN covid_new_case
      ON barangay.barangay_id = covid_new_case.barangay_id;`;
   db.query(sql, (err,result)=> {
      if(result){
         res.json(result);
      }
   });
}

exports.get_patient_list=(req,res)=>{
   //update this code write a join query
   var sql = `SELECT covid_patient_details.id,patient_no,age,gender,barangay,status
      FROM covid_patient_details
      INNER JOIN covid_patient_status
      ON covid_patient_details.id = covid_patient_status.id;`;
   db.query(sql, (err,result)=> {
      if(result){
         if(result.length){
            res.json(result);
         }else{
            res.json({
               message:'no patient'
            });
         }
      }else{
         console.log(err);
      }
  });
}

exports.get_patient_list_history=(req,res)=>{
   var sql = `SELECT * FROM patient_list_history LEFT JOIN patient_list_history_date ON patient_list_history.date_id = patient_list_history_date.date_id;`;
   db.query(sql, (err,result)=> {
      if(result){
         if(result.length){
            result.reverse();
            const history_list={};
            let counter=0;
            let counter1=0;
            result.forEach((element,index)=>{
               if(index==0){
                  history_list.history_count=1;
                  history_list[`history${++counter}`]={};
                  history_list[`history${counter}`].date_id=element.date_id;
                  history_list[`history${counter}`].date=element.date;
                  history_list[`history${counter}`][`recovered${++counter1}`]={patient_no:element.patient_no,age:element.age,gender:element.gender,barangay:element.barangay};
                  history_list[`history${counter}`].recovered_count=counter1;
               }else{
                  if(history_list[`history${counter}`].date_id==element.date_id){
                     history_list[`history${counter}`][`recovered${++counter1}`]={patient_no:element.patient_no,age:element.age,gender:element.gender,barangay:element.barangay};
                     history_list[`history${counter}`].recovered_count=counter1;
                  }else{
                     counter1=0;
                     history_list[`history${++counter}`]={};
                     history_list.history_count=counter;
                     history_list[`history${counter}`].date_id=element.date_id;
                     history_list[`history${counter}`].date=element.date;
                     history_list[`history${counter}`][`recovered${++counter1}`]={patient_no:element.patient_no,age:element.age,gender:element.gender,barangay:element.barangay};
                     history_list[`history${counter}`].recovered_count=counter1;
                  }
               }
            });
            res.json(history_list);
         }else{
            res.json({
               message:'no history'
            })
         }
      }else{
         console.log(err);
      }
      
   });
}

exports.get_announcement=(req,res)=>{
   var sql="SELECT * FROM announcements";                           
   db.query(sql, (err, result)=>{
      if(result){
         if(result.length){
            res.json(result);
         }
         else{
            res.json({
               message:'no announcement'
            });
         }
      }else{
         console.log(err);
      }
   });
}

// exports.get_positive_coordinates=(req,res)=>{
//    var sql = `SELECT latitude,longitude FROM users WHERE remarks='positive';`;
//    db.query(sql, (err,result)=> {
//       if(result.length){
//            res.json(result);
//       }
//       else{
//          res.json({
//             message:'no resident'
//          });
//       }
//   });
// }