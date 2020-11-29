exports.get_list=(req,res)=>{
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
exports.update_active_cases=(req,res)=>{
  var sql = `SELECT id FROM covid_positive_list WHERE status IN ('admitted','strict isolation');`;
  db.query(sql, function(err, result) {
    if(result.length){
      sql = `UPDATE covid_updates
        SET active_cases = ${result.length}
        WHERE id=1;`;
      db.query(sql);
    }
  });
}