const create_table=()=>{

  // var sql = `SELECT id FROM admin;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE admin (
  //       id INT NOT NULL AUTO_INCREMENT,
  //       first_name VARCHAR(30) NOT NULL,
  //       last_name VARCHAR(30) NOT NULL,
  //       middle_name VARCHAR(30) NOT NULL,
  //       mob_no VARCHAR(11) NOT NULL,
  //       user_name VARCHAR(50) NOT NULL,
  //       password VARCHAR(50) NOT NULL,
  //       PRIMARY KEY (id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created admin');
  //       }
  //     });
  //   }
  // });    

  // var sql = `SELECT id FROM covid_updates;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE covid_updates (
  //       id INT NOT NULL AUTO_INCREMENT,
  //       probable VARCHAR(12) NOT NULL,
  //       death VARCHAR(12) NOT NULL,
  //       new_cases VARCHAR(12) NOT NULL,
  //       active_cases VARCHAR(12) NOT NULL,
  //       suspected VARCHAR(12) NOT NULL,
  //       tested_negative VARCHAR(12) NOT NULL,
  //       confirmed_cases VARCHAR(12) NOT NULL,
  //       recovered VARCHAR(12) NOT NULL,
  //       date_updated VARCHAR(100) NOT NULL,
  //       notes VARCHAR(2000) NULL,
  //       PRIMARY KEY (id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created covid_updates');
  //       }
  //     });

  //     let currentDate=new Date().toString().substring(4, 16);
  //     sql = `INSERT INTO covid_updates (probable,death,new_cases,active_cases,suspected,tested_negative,confirmed_cases,recovered,date_updated) VALUES (0,0,0,0,0,0,0,0,'${currentDate}');`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('inserted covid_updates row');
  //       }
  //     });
  //   }
  // });

  // var sql = `SELECT patient_id FROM covid_patient_list;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE covid_patient_list (
  //       patient_id INT NOT NULL AUTO_INCREMENT,
  //       patient_no VARCHAR(50) NOT NULL,
  //       age VARCHAR(5) NOT NULL,
  //       gender VARCHAR(20) NOT NULL,
  //       barangay VARCHAR(100) NOT NULL,
  //       status VARCHAR(100) NOT NULL,
  //       PRIMARY KEY (patient_id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created covid_patient_list');
  //       }
  //     });
  //   }
  // });

  // var sql = `SELECT patient_id FROM patient_list_history;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE patient_list_history (
  //       patient_id INT NOT NULL AUTO_INCREMENT,
  //       date_id INT,
  //       patient_no VARCHAR(50) NOT NULL,
  //       age VARCHAR(5) NOT NULL,
  //       gender VARCHAR(20) NOT NULL,
  //       barangay VARCHAR(100) NOT NULL,
  //       status VARCHAR(100) NOT NULL,
  //       PRIMARY KEY (patient_id),
  //       FOREIGN KEY (date_id) REFERENCES patient_list_history_date(date_id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created patient_list_history');
  //       }
  //     });
  //   }
  // });
  
  // var sql = `SELECT date_id FROM patient_list_history_date;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE patient_list_history_date (
  //       date_id INT NOT NULL AUTO_INCREMENT,
  //       date VARCHAR(200) NOT NULL,
  //       PRIMARY KEY (date_id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created patient_list_history_date');
  //       }
  //     });
  //   }
  // });
      
  // var sql = `SELECT id FROM announcements;`;
  // db.query(sql, (err,result)=> {
  //   if(err){
  //     sql = `CREATE TABLE announcements (
  //       id INT NOT NULL AUTO_INCREMENT,
  //       title VARCHAR(500) NOT NULL,
  //       body VARCHAR(2000) NOT NULL,
  //       date VARCHAR(100) NOT NULL,
  //       PRIMARY KEY (id));`;
  //     db.query(sql, (err,result)=> {
  //       if(result){
  //         console.log('created announcements');
  //       } 
  //     });
  //   }
  // });

  var sql = `SELECT data FROM sessions WHERE id=1;`;
  db.query(sql, (err,result)=> {
    if(result){
        console.log('sd');
        if(result[0]){
        }
    }
  });

  console.log('hello');

}

module.exports.create=create_table;