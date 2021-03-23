const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const table = require('./database_table')
,compression = require('compression')
,admin = require('./routes/admin')
,index = require('./routes/index')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,app = express();

//database configuration
const options={  
  port     : 3306,

  //----local----
  // host     : 'localhost',
  // user     : 'root',
  // password : 'a09287811206',
  // database : 'brgy'

  //----remote----
  host     : 'sql6.freemysqlhosting.net',
  user     : 'sql6400793',
  password : 'gdDx2l3ADJ',
  database : 'sql6400793'
};
let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, connection);
connection.connect((err)=>{
  if (!err){
    console.log(`Database Connected on: \t${options.host}`);
  }
  else{
    console.log("Database Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
global.db = connection;
// table.create_table_one();
// table.create_table_two();
// table.drop_table();
// table.show_table();

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
    originalMaxAge: 1000*60*60*24*200 //200 days
  }
}));

db.query('SELECT id,user_name FROM admin;',(err,res)=>{
  console.log(res);
});
// db.query('SELECT * FROM covid_updates;',(err,res)=>{
//   console.log(res);
// });

console.log('production:\t\t',process.env.NODE_ENV === 'production');

app.use('/',index);
app.use('/admin',admin);

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port: \t${port}`));