const mongoose = require('mongoose');
const DBconnect = async ()=>{
        await mongoose.connect(
            process.env.DBconnect
        );
    }

module.exports = DBconnect;