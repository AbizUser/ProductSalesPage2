// NodeJS でのWebAPI作成
/*
【仕様技術】
Express
Node.JS
mongoose
*/ 

const express = require("express"); //Expressをインスタンス化
const cors = require("cors"); //Expressをインスタンス化
const app = express(); 
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread")


app.use(express.json()); //Json形式でデータを追加するという記述
app.use(express.static("public"));
app.use(cors("public"));

// console.log("monogoseDB接続前")
mongoose.connect(
    //〇〇〇〇〇ここにDB情報を記述〇〇〇〇〇
    
    ).then(()=>console.log("DB Connected")) //DB接続に成功した場合のログ
    .catch((err)=>console.log(err)); //DB接続が失敗した場合のエラー処理

/**
 * 以下のAPIはJS側がaxiosライブラリを使って叩くもので、NodeJSを使用して定義されている。
 */

    //getメソッド…掲示板へ表示する情報をすべて取得している 。
    app.get("/api/v1/threads",async(req,res)=>{ //express
        try{
            //
            const allTreads = await Thread.find({}); //全てのデータをとってくることができる。 //Thread.findはmongoose
            res.status(200).json(allTreads); 
        }catch(err){
            console.log(err);
        }
    })

    //Postメソッド…掲示板に投稿する処理
    app.post("/api/v1/thread",async(req,res)=>{
        try{
            const createTread = await Thread.create(req.body); 
            res.status(200).json(createTread);
        }catch(err){
            console.log(err);
        }
    })
    

//Deleteメソッド
    
// 特定のデータを削除するエンドポイント
app.delete("/api/v1/thread/:threadId", async (req, res) => {
  try {
      const threadId = req.params.threadId;
      // MongoDBから特定のデータを削除
      const deletedThread = await Thread.deleteOne({ _id: threadId });
      if (deletedThread.deletedCount === 1) {
      res.status(200).json({ message: 'Thread deleted successfully.' });
      }else {
      res.status(404).json({ message: 'Thread not found.' });
      }
      }catch (err){
      console.error(err);
      res.status(500).json({ error: 'Internal server error.' });
      }
    });
    


        // スレッドの編集
app.put('/api/v1/thread/:id', async (req, res) => {
  const threadId = req.params.id;
  const { title, content } = req.body;

  try {
    // データベースからスレッドを取得
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    // 値を更新
    thread.title = title;
    thread.content = content;

    // データベースに保存
    await thread.save();

    res.status(200).json({ message: 'Thread updated successfully' });
  } catch (error) {
    console.error('Error updating thread:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT,console.log("server running"));
/*【Package.jsonへの実際の記述】  "dev":"nodemon server.js"
 サーバーの立ち上げコマンド　(npm run dev) ポート番号が3000で指定しているので
 ブラウザへ「http://localhost:3000/」を入力することで立ち上がる
*/ 


