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
  const new_cases=req.body.new_cases;
  let sql=``;
  if(new_cases){
    sql = `UPDATE covid_updates
      SET new_cases=${new_cases} 
      WHERE id=1;`;
    db.query(sql, function(err, result) {
       if(result){
            res.send();
            console.log(result);
       }
    });
  }
}