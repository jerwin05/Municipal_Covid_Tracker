exports.create_table_one=()=>{
  var sql = `CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30) NOT NULL,
    mob_no VARCHAR(11) NOT NULL,
    admin_id VARCHAR(20) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id));`;
  db.query(sql, (err,result)=> {
    if(result){
      var sql = `CREATE TABLE covid_updates (
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
      db.query(sql, (err,result)=> {
        if(result){
          var sql = `CREATE TABLE barangay (
            barangay_id INT NOT NULL AUTO_INCREMENT,
            barangay TEXT NOT NULL,
            PRIMARY KEY (barangay_id));`;
          db.query(sql, (err,result)=> {
            if(result){
              var sql = `CREATE TABLE covid_new_case (
                id INT NOT NULL AUTO_INCREMENT,
                barangay_id INT NOT NULL,
                patient_no VARCHAR(20) NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (barangay_id) REFERENCES barangay(barangay_id));`;
              db.query(sql, (err,result)=> {
                if(result){
                  var sql = `INSERT INTO barangay VALUES 
                  (null,'dulumbayan'),
                  (null,'prinza'),
                  (null,'dalig'),
                  (null,'may-iba'),
                  (null,'poblacion'),
                  (null,'bagumbayan'),
                  (null,'san gabriel'),
                  (null,'san roque'),
                  (null,'calumpang sto cristo');`;
                  db.query(sql, (err,result)=> {
                    if(result){
                      console.log('create part one table complete');
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

exports.create_table_two=()=>{
  let currentDate=new Date().toString().substring(4, 16);
  sql = `INSERT INTO covid_updates (probable,death,new_cases,active_cases,suspected,tested_negative,confirmed_cases,recovered,date_updated) VALUES (0,0,0,0,0,0,0,0,'${currentDate}');`;
  db.query(sql, (err,result)=> {
    if(result){
      var sql = `CREATE TABLE covid_patient_status (
        id INT NOT NULL AUTO_INCREMENT,
        status VARCHAR(100) NOT NULL,
        PRIMARY KEY (id));`;
      db.query(sql, (err,result)=> {
        if(result){
          var sql = `CREATE TABLE covid_patient_details (
            id INT NOT NULL AUTO_INCREMENT,
            patient_no VARCHAR(50) NOT NULL,
            age VARCHAR(5) NOT NULL,
            gender VARCHAR(20) NOT NULL,
            barangay VARCHAR(100) NOT NULL,
            PRIMARY KEY (id));`;
          db.query(sql, (err,result)=> {
            if(result){
              var sql = `CREATE TABLE patient_list_history_date (
                date_id INT NOT NULL AUTO_INCREMENT,
                date VARCHAR(200) NOT NULL,
                PRIMARY KEY (date_id));`;
              db.query(sql, (err,result)=> {
                if(result){
                  var sql = `CREATE TABLE patient_list_history (
                    patient_id INT NOT NULL AUTO_INCREMENT,
                    date_id INT,
                    patient_no VARCHAR(20) NOT NULL,
                    age VARCHAR(5) NOT NULL,
                    gender VARCHAR(15) NOT NULL,
                    barangay VARCHAR(100) NOT NULL,
                    PRIMARY KEY (patient_id),
                    FOREIGN KEY (date_id) REFERENCES patient_list_history_date(date_id));`;
                  db.query(sql, (err,result)=> {
                    if(result){
                      var sql = `CREATE TABLE announcements (
                        id INT NOT NULL AUTO_INCREMENT,
                        title VARCHAR(500) NOT NULL,
                        body TEXT NOT NULL,
                        date VARCHAR(100) NOT NULL,
                        PRIMARY KEY (id));`;
                      db.query(sql, (err,result)=> {
                        if(result){
                          console.log('create part two table complete');
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

exports.show_table=()=>{
  var sql = `SHOW TABLES;`;
  db.query(sql, (err,result)=> {
    if(result){
      console.log(result);
    } else{
      console.log(err);
    }
  });
}

exports.drop_table=()=>{
  var sql = `DROP TABLE admin;`;
  db.query(sql, (err,result)=> {
    if(result){
      var sql = `DROP TABLE covid_patient_status;`;
      db.query(sql, (err,result)=> {
        if(result){
          var sql = `DROP TABLE covid_patient_details;`;
          db.query(sql, (err,result)=> {
            if(result){
              var sql = `DROP TABLE covid_updates;`;
              db.query(sql, (err,result)=> {
                if(result){
                  var sql = `DROP TABLE patient_list_history;`;
                  db.query(sql, (err,result)=> {
                    if(result){
                      var sql = `DROP TABLE patient_list_history_date;`;
                      db.query(sql, (err,result)=> {
                        if(result){
                          var sql = `DROP TABLE announcements;`;
                          db.query(sql, (err,result)=> {
                            if(result){
                              var sql = `DROP TABLE covid_new_case;`;
                              db.query(sql, (err,result)=> {
                                if(result){
                                  var sql = `DROP TABLE barangay;`;
                                  db.query(sql, (err,result)=> {
                                    if(result){
                                      console.log('drop table complete');
                                      var sql = `TRUNCATE TABLE sessions;`;
                                      db.query(sql, (err,result)=> {
                                        if(result){
                                          console.log('truncate sessions complete');
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}