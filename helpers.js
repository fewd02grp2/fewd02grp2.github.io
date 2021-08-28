const moment = require('moment')

class Helpers {
    getWeekDay() {
        const weekDay = moment().format('dddd')
        // console.log(weekDay)
        return weekDay
    }
}

module.exports = Helpers
const test = new Helpers
test.getWeekDay()