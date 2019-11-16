const express=require('express')
const app=express()
const validator=require('validator')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const csv = require('csv-parser');
const fs = require('fs');
let userlist=[]
let arr=[]
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
      if(validator.isEmail(row.email )&& validator.isMobilePhone(row.phone_no)){
      userlist.push(row)
    console.log(row); ///log on trminal
  }})
  .on('end', () => {
    console.log('CSV file successfully processed');
    // console.log(userlist)
  });

// var userlist=require("./csv_open/try")
// console.log(typeof(userlist))

// console.log(userlist)
app.set('view engine','hbs')
console.log(typeof(userlist))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/app',(req,res)=>{
  console.log(userlist)
    res.render('index', {
       userlist
     })
    })
app.get('/',(req,res)=>{
    res.send("please go to /app")
})
app.post("/app",(req,res)=>{

    console.log(req.body.phone_no)
    if(validator.isEmail(req.body.email )&& validator.isMobilePhone(req.body.phone_no)){
    userlist.push({
        name:req.body.name,
        email:req.body.email,
        phone_no:req.body.phone_no
      })}
    // userlist.name=req.body.name;
    // userlist.email=req.body.email;
    // userlist.phone_no=req.body.phone_no;
    // console.log(userlist)

    // userlist.forEach(element => {
    //     validator.isEmail(userlist.email)
        
    // });

    res.redirect('/app')
})


MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    dbo.collection("users").insertMany(userlist, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
// app.use('/app',routes.mongo)
app.listen(8077,()=>{
    console.log("server started")
})
// module.exports=userlist
