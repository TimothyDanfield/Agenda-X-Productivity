const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const Task = require('../models/Task')

const router = express.Router()
//  /api

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "/api works" })
})

// User endpoints
router
    .route('/user')
    .get(async (req, res, next) => {
        const { username } = req.query
        console.log(username)
        const user = await User.findOne({ username: username })
        console.log(user)
        return res.status(200).send(user)
    })
    .post(async (req, res, next) => {
        const { username, password } = req.body
        const newUser = new User({ username, password, tasks: [] })
        const user = await newUser.save()
        res.status(200).send(user)
    })
    .put(async (req, res, next) => {

    })
    .delete(async (req, res, next) => {
        const user = await User.findOneAndDelete({ username: 'nathan' })

        res.status(200).send({ message: `Successfully deleted ${user}` })

    })


// Task endpoints 
router
    .route('/task')
    .get(async (req, res, next) => {
        const { username } = req.query
        const user = await User.findOne({ username: username })
        const task = await Task.find({ author: user._id })
        res.status(200).send(task)
    })
    .post(async (req, res, next) => {
        const { taskName, category, reminderTime, username } = req.body
        const author = await User.findOne({ username: username })
        const newTask = new Task({
            taskName,
            author: author._id,
            reminderTime,
            category
        })
        try {
            const task = await newTask.save()
            author.tasks = author.tasks.concat(task._id)
            await author.save()
            res.status(200).send(author)
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: "No author" })
        }
    })
    .delete(async (req, res, next) => {
        const _id = req.params
        const deletedTask = await Task.findOneAndDelete({ _id: '640018736bcde81eb348ba94' })
        try {
            const userUpdate = await User.updateOne(
                { username: 'leo' },
                { $pull: { tasks: '640018736bcde81eb348ba94' } }
            )
            res.status(200).send(deletedTask)
        } catch (error) {
            console.log(error.errors)
        }
    })

// Register endpoints
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!(username && password)) {
            res.status(400).send("All input fields required")
        }
        const oldUser = await User.findOne({ username })
        if (oldUser) {
            return res.status(409).send("User already exists.")
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: encryptedPassword, tasks: [] })

        // Create JWT Token
        const token = jwt.sign(
            { user_id: user._id, username },
            keys.jwt.secret,
            {
                expiresIn: "24h"
            }
        )
        // save user token
        user.token = token
        user.save()
        res.status(201).json({ user: user, token: user.token })
    } catch (error) {

    }

})

// Login endpoints
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
    } catch (error) {

    }

})

module.exports = router