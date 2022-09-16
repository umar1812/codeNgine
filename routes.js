const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const employer = require('./db/models/employer');
const employee = require('./db/models/employee')
const auth = require("./middleware/auth")


router.post("/login", async (req, res) => {
    try {
        const login = await employer.findOne({ name: req.body.name })
        if (login) {
            const match = bcrypt.compareSync(req.body.password, login.password)
            if (match) {
                const token = jwt.sign({ name: login.name }, process.env.SECRET_KEY);
                console.log(token)
                res.status(200).send(token)
                console.log("logged in")
            } else {
                res.status(401).send("Invalid user")

            }
        } else {
            res.status(400).send("Invalid credentials")
        }

    } catch (err) {
        console.log("Invalid login details")
        res.status(401).send("Invalid login details")
    }
})

router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        let encpass = await bcrypt.hash(req.body.password, 6)
        let addtoken = jwt.sign(req.body.name, process.env.SECRET_KEY)
        const addemployer = new employer({
            name: req.body.name,
            password: encpass,
            token: addtoken
        })
        const newemployer = await addemployer.save();
        console.log(newemployer, "employer added successfully");
        res.status(201).send(newemployer)

    } catch (err) {
        res.status(500).send()
        console.log(err.message + "Status code 500")
    }
})

router.post('/employees', auth, async (req, res) => {
    try {
        const lastadded = await employee.find().sort({ _id: -1 }).limit(1)
        let lastid = lastadded.employeeId;
        lastid = lastid.split("-")
        let newid = parseInt(lastid[1]) + 1;
        const addemployee = new employee({
            employeeDetail: [{
                name: req.body.name,
                employeeId: `EM-${newid}`
            }]
        })
        const newemployee = await addemployee.save();
        console.log(newemployee, "employee added successfully");
        res.status(201).send(newemployee)

    } catch (error) {
        res.status(400).send(error)
    }
})