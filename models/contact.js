const mongoose = require('mongoose');

//schema
const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true

    },
    phone : {
        type: String,
        required : true
    }

});

//name of collection in database
//colection name should be capitalized
const Contact= mongoose.model('Contact',contactSchema);

module.exports = Contact;
