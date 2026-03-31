require('dotenv').config();
const app = require('./app');
const db = require('./config/mongoose-connection');

app.listen(process.env.PORT || 3000, () =>{
 console.log("server is running");
});
