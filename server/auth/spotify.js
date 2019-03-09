const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, expires_in, profile, done) => {
      const spotifyId = profile.id

      User.findOrCreate({
        where: {spotifyId, accessToken},
        defaults: {
          name: profile.displayName,
          spotifyId: profile.id,
          accessToken: accessToken,
          proPic: profile.photos[0],
          refreshToken: refreshToken
        }
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private', 'user-top-read'],
      showDialog: true
    }),
    function(req, res) {}
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
    // function(req, res){
    //     res.redirect('/home')
    // }
  )
}
