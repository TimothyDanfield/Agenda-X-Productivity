const express = require('express')
const User = require('../models/User')
const Task = require('../models/Task')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "/api works" })
})

router
    .route('/user')
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

router
    .route('/task')
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

module.exports = router