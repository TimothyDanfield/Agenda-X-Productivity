const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const Task = require('../models/Task')
const Note = require('../models/Notes')
const GoogleUser = require('../models/GoogleUser')
const auth = require('../middleware/auth')

const router = express.Router()
//  /api

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "/api works" })
})

// User endpoints
router
    .route('/user')
    .get(async (req, res, next) => {
        const { _id, email } = req.query
        if (_id) {
            const user = await User.findById(_id).populate('tasks').populate('notes') || await GoogleUser.findById(_id).populate('tasks').populate('notes')
            return res.status(200).send(user)
        } else {
            const user = await User.findOne({ email: email })
            return res.status(200).send(user)
        }

    })
    .post(auth, async (req, res, next) => {
        const { name, email, password } = req.body
        const newUser = new User({ name, email, password, tasks: [] })
        const user = await newUser.save()
        res.status(200).send(user)
    })
    .put(auth, async (req, res, next) => {
        const { name, email, currentPassword, newPassword, _id } = req.query
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
            }).populate('tasks').populate('notes')
            user.token = token
            user.save()
            console.log(user.token)
            res.status(200).send({ user: user, token: user.token })
        } else {
            res.status(401).send({ error: "Incorrect Password" })
        }
    })
    .delete(auth, async (req, res, next) => {
        const { _id, password } = req.body
        const user = await User.findById({ _id })
        if (user && (await bcrypt.compare(password, user.password))) {
            const userToDelete = await User.findOneAndDelete({ _id })
            return res.status(200).send({ message: `Successfully deleted ${userToDelete.email}` })
        } else {
            return res.status(401).send({ error: "Incorrect password" })
        }
    })

//Forgot password route
router.put('/user/forgotPassword', async (req, res, next) => {
    const { email, newPassword, securityAnswer } = req.query
    if (!(newPassword || securityAnswer)) {
        return res.status(400).send({ Error: "Please fill out all fields" })
    }
    const userConfirm = await User.findOne({ email: email })
    let encryptedPassword = await bcrypt.hash(newPassword, 10)
    if (userConfirm && (userConfirm.securityAnswer.toLowerCase() === securityAnswer.toLowerCase())) {
        const user = await User.findByIdAndUpdate(userConfirm._id, {
            password: encryptedPassword
        })
        user.save()
        res.status(200).send(user)
    } else {
        res.status(401).send({ Error: "Incorrect Security Answer" })
    }
})


// Task endpoints 
router
    .route('/task')
    .get(auth, async (req, res, next) => {
        const { _id } = req.query

        const user = await User.findOne({ _id }) || await GoogleUser.findById(_id)
        const task = await Task.find({ author: user._id })
        res.status(200).send(task)
    })
    .post(auth, async (req, res, next) => {
        const { title, start, end, category, _id, location, description } = req.body
        const author = await User.findById(_id) || await GoogleUser.findById(_id)
        const newTask = new Task({
            title,
            author: author._id,
            start,
            end,
            category,
            location,
            description
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
    .put(auth, async (req, res, next) => {
        const { title, start, end, category, _id, location, description } = req.body
        const updateTask = await Task.findByIdAndUpdate(_id, {
            title: title,
            start: start,
            end: end,
            category: category,
            location: location,
            description: description
        }) || await GoogleUser.findByIdAndUpdate(_id, {
            title: title,
            start: start,
            end: end,
            category: category,
            location: location,
            description: description
        })
        res.status(200).send(updateTask)
    })
    .delete(auth, async (req, res, next) => {
        const { _id, taskid } = req.query
        const author = await User.findById({ _id }) || await GoogleUser.findById({ _id })
        const deletedTask = await Task.findOneAndDelete({ _id: taskid })
        try {
            const userUpdate = await User.findByIdAndUpdate(
                { _id: author._id },
                { $pull: { tasks: taskid } }
            ) || await GoogleUser.findByIdAndUpdate(
                { _id: author._id },
                { $pull: { tasks: taskid } }
            )
            res.status(200).send(userUpdate)
        } catch (error) {
            console.log(error)
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

router.post('/google', async (req, res, next) => {
    const { name, email } = req.body
    try {
        const oldUser = await GoogleUser.findOne({ email })
        if (oldUser) {
            const user = await GoogleUser.findOne({ email }).populate('tasks').populate('notes')
            if (user) {
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
        } else {
            const user = new GoogleUser({ name, email })
            const token = jwt.sign(
                { user_id: user._id, email: email },
                keys.jwt.secret,
                {
                    expiresIn: "12h"
                }
            )
            user.token = token
            user.save()
            res.status(201).json({ user: user, token: user.token })
        }


    } catch (error) {
        console.log(error)
    }
})

// Login endpoints
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.query
        if (!(email && password)) {
            return res.status(400).json({ error: "Please fill out all fields" })
        }
        const user = await User.findOne({ email }).populate('tasks').populate('notes')

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

router
    .route('/note')
    .get(auth, async (req, res, next) => {
        const { _id } = req.body
        const user = await User.findById({ _id }) || await GoogleUser.findById({ _id })
        const note = await Note.find({ author: user._id })
        res.status(200).send(note)
    })
    .post(auth, async (req, res, next) => {
        const { title, content, _id } = req.query
        const author = await User.findById({ _id }) || await GoogleUser.findById({ _id })
        const newNote = new Note({
            title,
            author: author._id,
            content
        })
        try {
            const note = await newNote.save()
            author.notes = author.notes.concat(note._id)
            await author.save()
            res.status(200).send(author)
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: "No author" })
        }
    })
    .put(auth, async (req, res, next) => {
        const { _id, title, content } = req.query
        try {
            const updateNote = await Note.findByIdAndUpdate(_id, {
                title: title,
                content: content
            })
            res.status(200).send(updateNote)
        } catch (error) {
            res.status(400).send(error)
        }

    })
    .delete(auth, async (req, res, next) => {
        const { noteid, _id } = req.query
        const author = await User.findById({ _id })
        const googleAuthor = await GoogleUser.findById({ _id })
        const deletedNote = await Note.findOneAndDelete({ _id: noteid })
        try {
            if (author) {
                const userUpdate = await User.findByIdAndUpdate(
                    { _id: author._id },
                    { $pull: { notes: noteid } }
                )
                res.status(200).send(author)
            }
            if (googleAuthor) {
                const userUpdate = await GoogleUser.findByIdAndUpdate(
                    { _id: googleAuthor._id },
                    { $pull: { notes: noteid } }
                )
                res.status(200).send(googleAuthor)
            }
        }
        catch (error) {
            console.log(error)
            res.status(404).send('Error')
        }
    })



module.exports = router