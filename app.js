const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const debug = require('debug')('dev');
const index = require('./routes/index')
,cookieParser = require('cookie-parser')
,compression = require('compression')
,member = require('./routes/member')
,admin = require('./routes/admin')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,cors = require('cors')
,path = require('path')
,app = express();

const options={  
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'a09287811206',
  database : 'brgy'
};

let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({
  connectionLimit: 2
}, connection);

// all environments
// app.use(helmet());
// app.use(compression()); //Compress all routes
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: true,
//   credentials: true 
// }));
app.use(session({
  key: 'Barangay_Covid_Map',
  secret: 'brgy_covid_map',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // sameSite: 'none',
    // secure: true,
    secure: process.env.NODE_ENV === 'production',
    originalMaxAge: 1000*60*60*24*200
  }
}));
// app.use(cookieParser());

connection.connect((err)=>{
  if (!err){
    console.log("Connected");
  }
  else{
    console.log("Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
 
global.db = connection;

app.use('/',index);
app.use('/member',member);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));