const Sequelize = require('sequelize')
const db = require('../db')

const MusicPreference = db.define('musicpreference', {
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  artists: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = MusicPreference
