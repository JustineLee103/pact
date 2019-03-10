const router = require('express').Router()
const {User, MusicPreference} = require('../db/models')
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
    let data = response.data
    let genreArr = data.items
      .map(artist => {
        return artist.genres
      })
      .flat(1)
    console.log(genreArr)
    let singleMusicPref = await MusicPreference.create({
      genres: Object.values(genreArr)
    })
    let user = await User.findById(req.user.id)
    await user.update({musicpreferenceId: singleMusicPref.id})
    res.json(genreArr)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let userId = req.params.id
    let response = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: MusicPreference
        }
      ]
    })
    res.json(response)
  } catch (err) {
    console.log(err)
  }
})

// router.get('/musicpreference/:id', async(req, res, next) => {
//   try {
//     let musicId = req.params.id
//     let response = await MusicPreference.findById(musicId)
//     res.json(response)
//   } catch (err) {
//     console.log(err)
//   }
// })
