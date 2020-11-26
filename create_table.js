const create_table=()=>{  
  var sql = `SELECT first_name FROM users;`;
  db.query(sql, function(err, result) {

    if(err){
      sql = `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        middle_name TEXT NOT NULL,
        mob_no VARCHAR(11) NOT NULL,
        user_name VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        longitude VARCHAR(150) NULL,
        latitude VARCHAR(150) NULL,
        remarks VARCHAR(20) NULL,
        PRIMARY KEY (id));`;
      db.query(sql, function(err, result) {
        console.log('created users');
      });
      
      sql = `CREATE TABLE admin (
        id INT NOT NULL AUTO_INCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        middle_name TEXT NOT NULL,
        mob_no VARCHAR(11) NOT NULL,
        user_name VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        PRIMARY KEY (id));`;
      db.query(sql, function(err, result) {
        console.log('created admin');
      });

      sql = `CREATE TABLE announcements (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        body VARCHAR(2000) NOT NULL,
        date VARCHAR(50) NOT NULL,
        PRIMARY KEY (id));`;
      db.query(sql, function(err, result) {
        console.log('created announcements');
      });

    }
  });
}