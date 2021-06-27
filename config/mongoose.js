//require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;//db is used to access the database or to check database connection

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the msg
db.once('open',function(){
    console.log('Successfully connected to database');
});