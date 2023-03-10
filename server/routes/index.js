const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const Task = require('../models/Task')
const auth = require('../middleware/auth')

const router = express.Router()
//  /api

router.get('/', auth, (req, res, next) => {
    res.status(200).json({ message: "/api works" })
})

// User endpoints
router
    .route('/user')
    .get(async (req, res, next) => {
        const { email } = req.body
        const user = await User.findOne({ email: email }).populate('tasks')
        return res.status(200).send(user)
    })
    .post(async (req, res, next) => {
        const { name, email, password } = req.body
        const newUser = new User({ name, email, password, tasks: [] })
        const user = await newUser.save()
        res.status(200).send(user)
    })
    .put(async (req, res, next) => {
        const { name, email, currentPassword, newPassword, _id } = req.body
        const userConfirm = await User.findById({ _id })
        let encryptedPassword = await bcrypt.hash(newPassword, 10)
        if (userConfirm && (await bcrypt.compare(currentPassword, userConfirm.password))) {
            const token = jwt.sign(
                { user_id: _id, email: email },
                keys.jwt.secret,
                {
                    expiresIn: "12h"
                }
            )
            const user = await User.findByIdAndUpdate(_id, {
                name: name ? name : userConfirm.name,
                email: email ? email : userConfirm.email,
                password: newPassword ? encryptedPassword : userConfirm.password,
            })
            user.token = token
            user.save()
            console.log(user.token)
            res.status(200).send({ user: user, token: user.token })
        } else {
            res.status(401).send({ error: "Incorrect Password" })
        }
    })
    .delete(async (req, res, next) => {
        const { _id, password } = req.body
        const user = await User.findById({ _id })
        if (user && (await bcrypt.compare(password, user.password))) {
            const userToDelete = await User.findOneAndDelete({ _id })
            return res.status(200).send({ message: `Successfully deleted ${userToDelete.email}` })
        } else {
            return res.status(401).send({ error: "Incorrect password" })
        }
    })


// Task endpoints 
router
    .route('/task')
    .get(async (req, res, next) => {
        const { email } = req.query
        const user = await User.findOne({ email: email })
        const task = await Task.find({ author: user._id })
        res.status(200).send(task)
    })
    .post(async (req, res, next) => {
        const { taskName, category, reminderTime, email } = req.body
        const author = await User.findOne({ email: email })
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
        const deletedTask = await Task.findOneAndDelete({ _id })
        try {
            const userUpdate = await User.updateOne(
                { email: 'leo' },
                { $pull: { tasks: '640018736bcde81eb348ba94' } }
            )
            res.status(200).send(deletedTask, userUpdate)
        } catch (error) {
            console.log(error.errors)
        }
    })

// Register endpoints
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, securityQuestion, securityAnswer } = req.body
        if (!(email && password && name && securityQuestion && securityAnswer)) {
            res.status(400).send("All input fields required")
        }
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(409).send("User already exists.")
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: encryptedPassword, securityQuestion, securityAnswer, tasks: [] })

        // Create JWT Token
        const token = jwt.sign(
            { user_id: user._id, email: email },
            keys.jwt.secret,
            {
                expiresIn: "12h"
            }
        )
        // save user token
        user.token = token
        user.save()
        res.status(201).json({ user: user, token: user.token })
    } catch (error) {
        res.status(400).json({ error: error })
    }

})

// Login endpoints
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.query
        if (!(email && password)) {
            return res.status(400).json({ error: "Please fill out all fields"})
        }
        const user = await User.findOne({ email }).populate('tasks')

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                keys.jwt.secret,
                {
                    expiresIn: '12h'
                }
            )

            user.token = token
            return res.status(200).json({ user: user, token: user.token })
        }
        return res.status(400).send("Invalid Credentials")
    } catch (error) {
        res.status(400).json({ error: error })
    }

})

module.exports = router