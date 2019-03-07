const Sequelize = require('sequelize')
const db = require('../db')

const Habits = db.define('habits', {
  habit: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'incomplete'
  }
})

module.exports = Habits
