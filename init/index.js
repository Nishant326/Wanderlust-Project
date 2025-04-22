const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData =require("./data.js");

const MONGOURL = 'mongodb://127.0.0.1:27017/wonderlust'



async function main(){
    await mongoose.connect(MONGOURL);
};

main().then((res)=>{
    console.log("init connection successful");
}).catch((err)=>{
    console.log(err);
});


const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"67fbdf36882f93143bc4ae52" }));
    await Listing.insertMany(initData.data);


};

initDB();


