const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
const config = require('config');
mongoose.connect(config.get("MONGODB_URI"))
//mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Success: cloud database is live");
    dbgr("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB:", err);
}); 
module.exports = mongoose.connection;
