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
      result.reverse();
      const history_list={};
      let counter=0;
      let counter1=0;
      result.forEach((element,index,array)=>{
         if(index==0){
            history_list.history_count=1;
            history_list[`history${++counter}`]={};
            history_list[`history${counter}`].date_id=element.date_id;
            history_list[`history${counter}`].date=element.date;
            history_list[`history${counter}`][`recovered${++counter1}`]={patient_details:element.patient_details};
            history_list[`history${counter}`].recovered_count=counter1;
         }else{
            if(history_list[`history${counter}`].date_id==element.date_id){
               history_list[`history${counter}`][`recovered${++counter1}`]={patient_details:element.patient_details};
               history_list[`history${counter}`].recovered_count=counter1;
            }else{
               counter1=0;
               history_list[`history${++counter}`]={};
               history_list.history_count=counter;
               history_list[`history${counter}`].date_id=element.date_id;
               history_list[`history${counter}`].date=element.date;
               history_list[`history${counter}`][`recovered${++counter1}`]={patient_details:element.patient_details};
            }
         }
      });
      res.json(history_list);
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
            res.send();
        }
      }else{
         console.log(err);
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