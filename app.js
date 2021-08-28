require('dotenv').config()
const PORT = process.env.PORT || 3000 
const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')
const corsOptions = { origin: '*', credentials: true, optionSuccessStatus: 200 }

const Service = require('./service')
const Controller = require('./controller')
const createRoute = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))

const service = new Service
const controller = new Controller(service)
const routes = createRoute(controller)

app.use(routes)

app.listen(PORT, () => {
    console.log("LISTENING ON PORT", PORT)
})