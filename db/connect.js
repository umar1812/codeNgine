const mongoose = require('mongoose');
const db = process.env.DATABASE;
mongoose.connect(db)
    .then(console.log("Connected to user database"), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .catch((err) => { console.log(err) })