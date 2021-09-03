const Service = require('./service')

class Controller {
    constructor(service) {
        this.service = new Service
    }

    testAPI = async (req, res) => {
        try {
            res.status(200).json({
                result:true,
                msg: 'API test successful!!'
            })
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    getTask = async (req, res) => {
        try {
            const { id } = req.params
            const returnedTask = await this.service.readTask(id)
            res.status(200).json(returnedTask)
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    getTodoList = async (req, res) => {
        try {
            const { status } = req.query
            if (status) {
                const returnedTodoList = await this.service.readTodoList(status)
                res.status(200).json(returnedTodoList)
            } else {
                const returnedTodoList = await this.service.readTodoList()
                res.status(200).json(returnedTodoList)
            }
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    postTodoList = async (req, res) => {
        try {
            await this.service.addTodoList(req.body)
            res.redirect('/tasks.html')
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    putTodoList = async (req, res) => {
        try {
            const { id } = req.params
            const updatedTask = await this.service.updateTodoList(id, req.body)
            res.status(200).json(updatedTask)
            // res.redirect('/tasks.html')
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    deleteTodoList = async (req, res) => {
        try {
            const { id } = req.params
            await this.service.deleteTodoList(id)
            res.status(200).json('Task deleted')
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    getDayInfo = (req, res) => {
        try {
            const returnedDayInfo = this.service.getDayInfo()
            res.status(200).json(returnedDayInfo)
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }

    getWeatherInfo = async (req, res) => {
        try {
            const returnedWeatherInfo = await this.service.getWeatherInfo()
            res.status(200).json(returnedWeatherInfo)
        } catch (e) {
            res.status(500).json({
                result: false,
                msg: e.toString()
            })
        }
    }
}

module.exports = Controller
// const test = new Controller
// test.getTodoList()