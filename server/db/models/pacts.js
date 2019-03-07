const Sequelize = require('sequelize')
const db = require('../db')

const Pacts = db.define('pacts', {
  frequency: {
    type: Sequelize.STRING
  }
})

module.exports = Pacts
