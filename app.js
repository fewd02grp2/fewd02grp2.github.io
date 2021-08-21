require('dotenv').config()
const PORT = 3000
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const moment = require('moment');

const Task = require('./models/task')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todoList'
mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
})
    .then(() => {
        console.log("Database Connected!")
    })
    .catch(err => {
        console.log("MONGODB CONNECTION ERROR!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));


// CRUD Routes
app.get('/', (req, res) => {
    res.render('login')
})

app.get('/tasks', async(req, res) => {
    const { status } = req.query
    const todayDate = moment().format("DD MMM YYYY")
    const weekDay = moment().format("dddd")
    if (status) {
        const tasks = await Task.find({ status })
        res.render('tasks/tasks', { tasks, todayDate, weekDay })
    } else {
        const tasks = await Task.find({})
        res.render('tasks/tasks', { tasks, todayDate, weekDay })
    }
})

app.post('/tasks', async(req, res) => {
    const newTask = new Task(req.body)
    await newTask.save()
    res.redirect(`/tasks/${newTask._id}`)
})

app.get('/tasks/new', (req, res) => {
    res.render('tasks/new')
})

app.get('/tasks/:id', async(req, res) => {
    const { id } = req.params
    const foundTask = await Task.findById(id)
    res.render('tasks/details', { foundTask })
})

app.get('/tasks/:id/edit', async(req, res) => {
    const { id } = req.params
    const foundTask = await Task.findById(id)
    res.render('tasks/edit', { foundTask })
})

app.put('/tasks/:id', async(req, res) => {
    const { id } = req.params
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/tasks/${updatedTask._id}`)
})

app.delete('/tasks/:id', async(req, res) => {
    const { id } = req.params
    const deletedTask = await Task.findByIdAndDelete(id)
    res.redirect('/tasks')
})

app.listen(PORT, () => {
    console.log("LISTENING ON PORT", PORT)
})