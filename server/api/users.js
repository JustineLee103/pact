const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/spotifyData', async (req, res, next) => {
  try {
    let response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + req.user.accessToken
      }
    })
    res.json(response.data)
  } catch (err) {
    next(err)
  }
})

router.get('/musicData', async (req, res, next) => {
  try {
    let response = await axios.get(
      'https://api.spotify.com/v1/me/top/artists',
      {
        headers: {
          Authorization: 'Bearer ' + req.user.accessToken
        }
      }
    )
    res.json(response.data)
  } catch (err) {
    next(err)
  }
})

// let data = response.data
// // dispatch(gotSpotifyData(data))
// dispatch(gotSpotifyData(data))
