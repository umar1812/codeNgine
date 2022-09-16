const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeDetail: [{
        name: String,
        employeeId: String
    }]
})

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;