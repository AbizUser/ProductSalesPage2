



const express = require("express"); //Expressをインスタンス化
const cors = require("cors");
const app = express(); 
const mongoose = require("mongoose");
const bookMark = require("./models/Bookmark")
require('dotenv').config();

app.use(express.json()); //Json形式でデータを追加するという記述
app.use(express.static("public"));
app.use(cors("public")); 

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTERNAME
const dbInfo = process.env.DB_INFO
const dbConnectionUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}${dbName}?${dbInfo}`;

mongoose.connect(
    dbConnectionUri
    ).then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));


//getメソッド(商品データをすべて取得している。)
app.get("/api/products",async(req,res)=>{
    try{
        const allProduct = await bookMark.find({});
        res.status(200).json(allProduct); 
    }catch(err){
        console.log(err);
    }
})

app.patch("/api/product/:id",async(req,res)=>{
    
    try{
        const patchItem = await bookMark.findByIdAndUpdate(req.params.id , req.body); 
        res.status(200).json(patchItem);
    }catch(err){
        console.log(err);
    }
})




app.listen(dbPort,console.log("server running"));