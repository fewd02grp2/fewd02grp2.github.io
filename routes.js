const express = require('express');

const createRoute = controller => {
    const routes = express.Router()

    // CRUD tasks
    routes.get('/', controller.testAPI)
    routes.get('/tasks', controller.getTodoList)
    routes.get('/tasks/:id', controller.getTask)
    routes.post('/tasks', controller.postTodoList)
    routes.put('/tasks', controller.putTodoList)
    routes.put('/tasks/:id', controller.putTodoList)
    routes.delete('/tasks/:id', controller.deleteTodoList)
    
    routes.get('/dayinfo', controller.getDayInfo)
    routes.get('/weatherinfo', controller.getWeatherInfo)

    return routes
}

module.exports = createRoute