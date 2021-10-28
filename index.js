const express=require('express');
const { MongoClient } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;

require('dotenv').config()

const cors=require('cors')
//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vithd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{

    }
    finally{
        // await client.connect()
    }
}
run().catch(console.dir)

app.get("/",async(req,res)=>{
    res.send("Running Dream world")
})
app.listen(port,()=>{
    console.log("Server running at port",port)
})