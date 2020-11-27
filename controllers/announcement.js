exports.post_announcement=(req,res)=>{
    const date= new Date();
    console.log('hello');
    var sql = "INSERT INTO announcements (`title`,`body`,`date`) VALUES ('" + req.body.title + "','" + req.body.body + "','" + date + "')";
    db.query(sql, function(err, result) {
        if(result){
            res.send('true');
            console.log('true');
        }
        else{
            console.log(err);
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
                errorMessage:'hello'
            });
        }
    });
}

exports.delete_announcement=(req,res)=>{
    var sql = `DELETE FROM announcements WHERE id='${req.body.id}';`;
    db.query(sql, function(err, result) {
       if(result){
           res.send();//if query successful, send response
       }
    });
}