//個々ではデータスキーマを定義している。

const mongoose = require("mongoose"); //monogooseライブラリを引いて変数に代入

const ThreadSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true, //必ず書込まれるように定義してる。
        maxlength:20, //最大文字数
    },
    content:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Thread" , ThreadSchema);
//エクスポートすることで,定義したスキーマを(server.js)でも使用できるようにしている。