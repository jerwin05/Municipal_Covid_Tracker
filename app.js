const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const contentSecurityPolicy = require("helmet-csp")
,index = require('./routes/index')
,compression = require('compression')
,member = require('./routes/member')
,admin = require('./routes/admin')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,cors = require('cors')
,app = express();

//database configuration
const options={  
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'a09287811206',
  database : 'brgy'
};
let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, connection);
connection.connect((err)=>{
  if (!err){
    console.log("Connected");
  }
  else{
    console.log("Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
global.db = connection;

// all environments
// app.use(helmet());
// app.use(compression()); //Compress all routes
app.use(cors());
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
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    originalMaxAge: 1000*60*60*24*200
  }
}));

// app.set('Content-Security-Policy',"img-src 'self' https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org; script-src 'self'; styles-src 'self'");

// app.use(
//   contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", "default.example"],
//       scriptSrc: ["'self'", "'unsafe-inline'"],
//       imgSrc: ["'self'", "'https://c.tile.openstreetmap.org'"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//     reportOnly: false,
//   })
// );

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

app.use('/',index);
app.use('/member',member);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));