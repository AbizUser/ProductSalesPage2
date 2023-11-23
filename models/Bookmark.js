
const mongoose = require("mongoose"); //monogooseライブラリを引いて変数に代入

const ProductSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true, 
    },
    bookmarkflg:{
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("bookmark" , ProductSchema);
