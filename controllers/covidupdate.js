exports.get_update=(req,res)=>{
    var sql = `SELECT * FROM covid_updates;`;
    db.query(sql, function(err, result) {
       if(result.length){
            res.json(result);
       }
   });
}
exports.update_data=(req,res)=>{
  console.log('received');
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
        console.log('updated 1');
      }
    });
  }else{
    sql = `UPDATE covid_updates
      SET new_cases='${new_cases}', date_updated='${date_updated}',suspected='${suspected}',probable='${probable}',tested_negative='${tested_negative}',confirmed_cases='${confirmed_cases}',recovered='${recovered}',death='${death}'
      WHERE id=1;`;
    db.query(sql, function(err, result) {
     if(result){
          res.send();
          console.log('updated 2');
     }
  });

  }


  
}