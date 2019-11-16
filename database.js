const mongodb=require('mongodb');
const MOngoClient=mongodb.MongoClient;

MongoClient.connect('mongodb+srv://milan997:8439179082@cluster0-pd0zv.mongodb.net/test?retryWrites=true&w=majority')
.then(result=>{
    console.log('connected')
})
.catch(err=>{
    console.log(err)

})