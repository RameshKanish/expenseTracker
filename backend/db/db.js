const mongoose = require('mongoose');

const db = async () => {

    try {
        await mongoose.connect(process.env.MANGO_URL, {
            useUnifiedTopology: false, 
            useNewUrlParser: true,
        });
        console.log("db connected");
    } catch (error) {
        console.error(error);
        console.error("Error in dbConfig.js");
    }

}
module.exports={db};