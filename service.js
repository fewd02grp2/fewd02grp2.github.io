require('dotenv').config()
// const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')
const moment = require('moment');
const fetch = require('node-fetch');

const Task = require('./models/task')
const owKey = process.env.OW_KEY

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todoList'
const dbUrl = 'mongodb://localhost:27017/todoList'
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

class Service {
    constructor() {
    }

    async readTask(id) {
        const task = await Task.findById(id)
        return task
    }

    async readTodoList(status) {
        if (!status) {
            const tasks = await Task.find({})
            return tasks
        }
        else {
            const tasks = await Task.find({status})
            return tasks
        }
    }

    async addTodoList(task) {
        const newTask = new Task(task)
        await newTask.save()
    }

    async updateTodoList(id, data) {
        await Task.findByIdAndUpdate(id, data)
        const updatedTask = await Task.findById(id)
        return updatedTask
    }

    async deleteTodoList(id) {
        const deletedTask = await Task.findByIdAndDelete(id)
    }

    getDayInfo() {
        const weekDay = moment().format('dddd')
        const date = moment().format('DD MMM YYYY')
        const dayInfo = []
        dayInfo.push(weekDay)
        dayInfo.push(date)
        return dayInfo
    }

    async getWeatherInfo() {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=hongkong&appid=${owKey}`)
        const data = await res.json()
        return data
    }
}

module.exports = Service

const test = new Service
test.getWeatherInfo()
// test.readTodoList()
// .then(() => {
//     mongoose.connection.close()
//     console.log("Database Connection Closed")
// })