const express = require('express');
require('./db/connect')
const routes = require('./routes')
let port = process.env.PORT || 5000;
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const app = express()
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})