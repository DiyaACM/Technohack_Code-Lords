var sqlite3=require('sqlite3').verbose(); //execution mode set to verbose to get long stack traces
var express=require('express');
var http=require('http');
var path=require("path");
var helmet=require('helmet');
var rateLimit=require("express-rate-limit");

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

var db = new sqlite3.Database('info.db');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(helmet());
app.use(limiter);

db.run('CREATE TABLE IF NOT EXISTS studentinfo(Name TEXT,Dob TEXT,Address TEXT,MedInfo TEXT,Contact TEXT,Duration INTEGER, GuardianName TEXT, Relation TEXT,Occupation TEXT,GuardianContact TEXT,GuardianAddress TEXT,GuardianEmail TEXT)');

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'/Registration.html'));
});

// Insert
app.post('/add', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO studentinfo VALUES ("'+req.body.Name+'","'+req.body.Dob+'","'+req.body.Address+'","'+req.body.MedInfo+'","'+req.body.Contact+'","'+req.body.Duration+'","'+req.body.GuardianName+'","'+req.body.Relation+'","'+req.body.Occupation+'","'+req.body.GuardianContact+'","'+req.body.GuardianAddress+'","'+req.body.GuardianEmail+'")', function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New resident added");
    });
});
});

app.get('/close', function(req,res){
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});

server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
});