const mongoose = require('mongoose');

const db = async ()=>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MANGO_URL);
        console.log("Db connected");
    }catch(error){
        console.log('db connecton error');
    }
}
module.exports={db};