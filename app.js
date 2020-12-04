const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const table = require('./create_table')
,compression = require('compression')
,admin = require('./routes/admin')
,index = require('./routes/index')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,app = express();

//database configuration
const options={  
  // host     : 'localhost',
  // port     : 3306,
  // user     : 'root',
  // password : 'a09287811206',
  // database : 'brgy'
  host     : 'sql12.freemysqlhosting.net',
  port     : 3306,
  user     : 'sql12380309',
  password : 'dAdhjVcnd8',
  database : 'sql12380309'
};
let connection = mysql.createConnection(options);
connection.connect((err)=>{
  if (!err){
    console.log("Database Connected");
  }
  else{
    console.log("Database Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
let sessionStore = new MySQLStore({}, connection);
global.db = connection;
table.create(db);

// var sql = `SELECT id FROM admin;`;
//   db.query(sql, (err,result)=> {
//     if(err){
//       console.log(err);
//       var sql = `CREATE TABLE admin (
//         id INT NOT NULL AUTO_INCREMENT,
//         first_name VARCHAR(30) NOT NULL,
//         last_name VARCHAR(30) NOT NULL,
//         middle_name VARCHAR(30) NOT NULL,
//         mob_no VARCHAR(11) NOT NULL,
//         user_name VARCHAR(50) NOT NULL,
//         password VARCHAR(50) NOT NULL,
//         PRIMARY KEY (id));`;
//       db.query(sql, (err,result)=> {
//         if(result){
//           console.log('created admin');
//           var sql = `CREATE TABLE covid_updates (
//             id INT NOT NULL AUTO_INCREMENT,
//             probable VARCHAR(12) NOT NULL,
//             death VARCHAR(12) NOT NULL,
//             new_cases VARCHAR(12) NOT NULL,
//             active_cases VARCHAR(12) NOT NULL,
//             suspected VARCHAR(12) NOT NULL,
//             tested_negative VARCHAR(12) NOT NULL,
//             confirmed_cases VARCHAR(12) NOT NULL,
//             recovered VARCHAR(12) NOT NULL,
//             date_updated VARCHAR(100) NOT NULL,
//             notes VARCHAR(2000) NULL,
//             PRIMARY KEY (id));`;
//           db.query(sql, (err,result)=> {
//             if(result){
//               console.log('created covid_updates');
//               let currentDate=new Date().toString().substring(4, 16);
//               sql = `INSERT INTO covid_updates (probable,death,new_cases,active_cases,suspected,tested_negative,confirmed_cases,recovered,date_updated) VALUES (0,0,0,0,0,0,0,0,'${currentDate}');`;
//               db.query(sql, (err,result)=> {
//                 if(result){
//                   console.log('inserted covid_updates row');            
//                   var sql = `CREATE TABLE covid_patient_list (
//                     patient_id INT NOT NULL AUTO_INCREMENT,
//                     patient_no VARCHAR(50) NOT NULL,
//                     age VARCHAR(5) NOT NULL,
//                     gender VARCHAR(20) NOT NULL,
//                     barangay VARCHAR(100) NOT NULL,
//                     status VARCHAR(100) NOT NULL,
//                     PRIMARY KEY (patient_id));`;
//                   db.query(sql, (err,result)=> {
//                     if(result){
//                       console.log('created covid_patient_list');
//                       var sql = `CREATE TABLE patient_list_history_date (
//                         date_id INT NOT NULL AUTO_INCREMENT,
//                         date VARCHAR(200) NOT NULL,
//                         PRIMARY KEY (date_id));`;
//                       db.query(sql, (err,result)=> {
//                         if(result){
//                           console.log('created patient_list_history_date');
//                           var sql = `CREATE TABLE patient_list_history (
//                             patient_id INT NOT NULL AUTO_INCREMENT,
//                             date_id INT,
//                             patient_details TEXT NOT NULL,
//                             PRIMARY KEY (patient_id),
//                             FOREIGN KEY (date_id) REFERENCES patient_list_history_date(date_id));`;
//                           db.query(sql, (err,result)=> {
//                             if(result){
//                               console.log('created patient_list_history');
//                               var sql = `CREATE TABLE announcements (
//                                 id INT NOT NULL AUTO_INCREMENT,
//                                 title VARCHAR(500) NOT NULL,
//                                 body VARCHAR(2000) NOT NULL,
//                                 date VARCHAR(100) NOT NULL,
//                                 PRIMARY KEY (id));`;
//                               db.query(sql, (err,result)=> {
//                                 if(result){
//                                   console.log('created announcements');
//                                 } 
//                               });
//                             }
//                           });
//                         }
//                       });
//                     }
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });

// all environments
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "https:"],
      "script-src-attr": ["'self'","'unsafe-inline'"]
    }
  })
);
app.use(compression()); //Compress all routes
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  key: 'Barangay_Covid_Map',
  secret: 'brgy_covid_map',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
    originalMaxAge: 1000*60*60*24*200 //200 days
  }
}));

app.use('/',index);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));