const create_table=()=>{

  var sql = `SELECT id FROM admin;`;
  db.query(sql, function(err, result) {

    if(err){
      sql = `CREATE TABLE covid_positive_list (
        id INT NOT NULL AUTO_INCREMENT,
        patient_no VARCHAR(50) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        barangay VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        PRIMARY KEY (id));`;
      db.query(sql, function(err, result) {
        console.log('created covid_positive_list');
      });
  
      sql = `CREATE TABLE covid_updates (
        id INT NOT NULL AUTO_INCREMENT,
        probable VARCHAR(12) NOT NULL,
        death VARCHAR(12) NOT NULL,
        new_cases VARCHAR(12) NOT NULL,
        active_cases VARCHAR(12) NOT NULL,
        suspected VARCHAR(12) NOT NULL,
        tested_negative VARCHAR(12) NOT NULL,
        confirmed_cases VARCHAR(12) NOT NULL,
        recovered VARCHAR(12) NOT NULL,
        date_updated VARCHAR(100) NOT NULL,
        notes VARCHAR(2000) NULL,
        PRIMARY KEY (id));`;
      db.query(sql, function(err, result) {
        console.log('created covid_updates');
      });
  
      sql = `CREATE TABLE admin (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        middle_name VARCHAR(30) NOT NULL,
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

module.exports.create=create_table;