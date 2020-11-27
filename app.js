const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const contentSecurityPolicy = require("helmet-csp")
,index = require('./routes/index')
,compression = require('compression')
,member = require('./routes/member')
,table = require('./create_table')
,admin = require('./routes/admin')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,app = express();

//database configuration
const options={  
  host     : 'sql12.freemysqlhosting.net',
  port     : 3306,
  user     : 'sql12378014',
  password : 'JWbYsgac5d',
  database : 'sql12378014'
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
table.create();

// all environments
// app.use(helmet());
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
    // secure: app.get('env') === 'production',
    originalMaxAge: 1000*60*60*24*200// 200 days
  }
}));

app.use('/',index);
app.use('/member',member);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));