const mongoose = require('mongoose')
const Task = require('../models/task')

mongoose.connect('mongodb://localhost:27017/todoList', {
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

const seedTasks = [
    {
        title: 'Call Peter',
        due: '2021-08-15',
        description: '2380 0000',
        assignment: 'Mary',
        status: 'done',
        priority: 'Low'
    },
    {
        title: 'Grocery shopping',
        due: '2021-08-12',
        description: 'milk, eggs, bread, ice cream',
        assignment: 'John Doe',
        status: 'review',
        priority: 'High'
    },
    {
        title: 'Project Sprint 2',
        due: '2021-08-20',
        description: 'CRUD operations for todoList App',
        assignment: 'Group 2',
        status: 'inProgress',
        priority: 'High'
    }
]

const seedDB = async() => {
    await Task.deleteMany({})
    await Task.insertMany(seedTasks)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
seedDB()