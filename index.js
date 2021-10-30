const express=require('express');
const { MongoClient } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;
const ObjectId=require("mongodb").ObjectId;
require('dotenv').config()

const cors=require('cors')
//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vithd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{

        await client.connect();
        const database=client.db('ThemePark')
        const packageCollection=database.collection('packages');
        const bookingsCollection=database.collection('bookings');
      //find ALL Packages
        app.get('/packages',async(req,res)=>{
             
            const cursor=packageCollection.find({});
            const packages=await cursor.toArray();
            res.send(packages)
        })

    //find one package details
    app.get("/packages/:id",async (req,res)=>{

        const id=req.params.id;
        const query={_id:ObjectId(id)}
        const result= await packageCollection.findOne(query);
        
        res.json(result)
    });
    //post
    app.post('/bookings',async (req,res)=>{

        const cursor=req.body;
        const result=await bookingsCollection.insertOne(cursor);
        res.json(result)
    })
    //get my bookings
    app.get('/bookings',async(req,res)=>{
             
        const cursor=bookingsCollection.find({});
        const mybookings=await cursor.toArray();
        res.send(mybookings)
    });

    //delete
       app.delete('/bookings/:id',async(req,res)=>{
                const id=req.params.id;
                const query={_id:ObjectId(id)}
                const deleted=await bookingsCollection.deleteOne(query);
                res.json(deleted)
       })

        //update
        app.put('/bookings/:id',async (req,res)=>{
            const id=req.params.id;
            const updateBooking=req.body;
            const filter ={_id: ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                 status:"Approved",
                
                },
              };
          
           const result=await bookingsCollection.updateOne(filter,updateDoc,options)
            res.json(result);
        
        })
        //add new
        app.post('/packages',async (req,res)=>{

            const cursor=req.body;
            const result=await packageCollection.insertOne(cursor);
            res.json(result)
        })

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