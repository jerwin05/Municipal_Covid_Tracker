exports.get_update=(req,res)=>{
    var sql = `SELECT * FROM covid_updates;`;
    db.query(sql, function(err, result) {
       if(result.length){
            res.json(result);
       }
   });
 }