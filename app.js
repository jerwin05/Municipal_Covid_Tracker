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
  user     : 'sql12378014',
  password : 'JWbYsgac5d',
  database : 'sql12378014'
};
let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, connection);
connection.connect((err)=>{
  if (!err){
    console.log("Database Connected");
  }
  else{
    console.log("Database Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
global.db = connection;


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

// var counter = (function () {
//   var count = 0;
//   return {
//     add:function(){count += 1;},
//     get_count:function(){return count}
//   }
// })();

// var sql = `SELECT * FROM patient_list_history_date;`;
//    db.query(sql, (err,results)=> {
//     const history_list={}
//      results.forEach(element => {
//        counter.add();
//        let counter1=0;
//        history_list[`history${counter}`]={
//         date:{
//           date_id:element.date_id,
//           date:element.date
//         }
//        }

     
//        sql = `SELECT patient_no,age,gender,barangay,status FROM patient_list_history WHERE date_id=${element.date_id};`;
//        db.query(sql, function(err,result) {     
    
//          result.forEach((element,index,array)=>{
//           console.log(counter.get_count());
//            console.log(counter);
//            console.log(counter1++);
//             history_list[`history${counter}`][`patient${++counter1}`]=element;
//             console.log(history_list);
//          })
//          console.log(history_list);
//        });
//      });
//      console.log(history_list);
//      console.log(counter);
//    });

app.use('/',index);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));