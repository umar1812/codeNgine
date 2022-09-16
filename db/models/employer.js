const mongoose = require('mongoose')

const employerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: String,
    token: String
})

const employer = mongoose.model("employer", employerSchema);
module.exports = employer