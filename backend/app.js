const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();
const {readdirSync} = require('fs');

require('dotenv').config()
const port = process.env.PORT;
app.use(express.json());
app.use(cors({}));
try{
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)));
}catch(err){
    console.log("error",err);
}

const server =  ()=>{
    db()
    app.listen(port,()=>{
        console.log(`server listening at ${port}`);
    });
};

server();