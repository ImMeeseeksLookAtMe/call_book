const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String
    },
    called: {
        type: Boolean
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;