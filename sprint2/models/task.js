const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    due: String,
    description: String,
    assignment: String,
    status: String,
    priority: String
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task