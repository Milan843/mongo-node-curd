let express=require('express')
let app=express()
let bodyparser=require('body-parser')
let mongoose=require('mongoose')
let Book=require('./mongodb')

let mydb='mongodb://localhost/example';
mongoose.connect(mydb,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//////CREATING $ UPDATING THE DATA(WITH THE MODEL)

app.post('/book',(req,res)=>{
   var newbook=new Book();
        newbook.title=req.body.title;
        newbook.author=req.body.author;
        newbook.description=req.body.description

        newbook.save((err,data)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send(data)
                console.log(data)
            }

        })
})
///READ(find) THE DATA
app.get('/books',(req,res)=>{
    console.log('getting alll books')
  
    Book.find({})

    .exec((err,books)=>{
        if(err){
            res.send("error occured")
        }
        else{
            res.json(books)
            console.log(books);
        }

    })
})

///READ ONE ID/////
app.get("/books/:id",(req,res)=>{
    console.log("getting one id book data")
    Book.findOne({
        _id:req.params.id
    })
    .exec((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            res.json(data)
        }

    })
})
//// UPDATE AN DATA(BOOK) USING FINDONE AND UPDATE  ;;;;;THIS DOES REFLECT ON LOG OR POSTMAN BUT CAN BE VIEW ON ROBO3T DATABASE
app.put('/books/:id',(req,res)=>{
    console.log(req.params.id)
    Book.findOneAndUpdate({
        _id:req.params.id  //1st parameter
    },
    {$set:{title:req.body.title}}, //2nd parameter(what want to update)
 //3rd para(optional para,if title does not exit then update)
(err,newbook)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(newbook);
        res.status(204)
        res.send("okkk")
    }

    })
})

app.delete('/books/:id',(req,res)=>{
    Book.findOneAndRemove({
        _id:req.params.id
    },(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            res.send
        
        }
    })
  
})


app.listen(8080,()=>{
    console.log("server started")
})
