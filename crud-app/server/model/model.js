const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    tipo : {
        type : String,
        required: true
    },
    marca : {
        type: String,
        required: true,
    },
    preço : {
        type: String,
        required: true,
    },
})
const Userdb = mongoose.model('userdb', schema);
module.exports = Userdb;