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

  // async (accessToken, refreshToken, expires_in, profile, done) => {
  //   const spotifyId = profile.id
  //   try {
  //   let user = await User.findOne({
  //     where: {spotifyId}
  //   })
  //   console.log(profile)
  //   if (!user){
  //     await User.create({
  //       name: profile.displayName,
  //       spotifyId: profile.id,
  //       accessToken: accessToken,
  //       proPic: profile.photos[0],
  //       refreshToken: refreshToken
  //     })
  //   } else {
  //       await user.update({
  //         name: profile.displayName,
  //         spotifyId: profile.id,
  //         accessToken: accessToken,
  //         proPic: profile.photos[0],
  //         refreshToken: refreshToken
  //       })
  //   }
  // }
  //   catch (err){
  //     console.log(err)
  //   }
  // }
  // const strategy = new SpotifyStrategy(
  //   spotifyConfig,
  //   (accessToken, refreshToken, expires_in, profile, done) => {
  //     const spotifyId = profile.id

  //     User.findOrCreate({
  //       where: {spotifyId, accessToken},
  //       defaults: {
  //         name: profile.displayName,
  //         spotifyId: profile.id,
  //         accessToken: accessToken,
  //         proPic: profile.photos[0],
  //         refreshToken: refreshToken
  //       }
  //     })
  //       .then(([user]) => done(null, user))
  //       .catch(done)
  //   }
  // )

  // const strategy = new SpotifyStrategy(
  //   spotifyConfig,
  //   (accessToken, refreshToken, expires_in, profile, done) => {
  //         const spotifyId = profile.id

  //         User.findOrCreate({
  //           where: {spotifyId},
  //           defaults: {
  //             name: profile.displayName,
  //             spotifyId: profile.id,
  //             accessToken: accessToken,
  //             proPic: profile.photos[0],
  //             refreshToken: refreshToken
  //           }
  //         })
  //         // .spread((user, created) => {
  //         //   console.log('USERIN SPREAD:', created)
  //         //   if(created) {
  //         //     return [user,created]
  //         //   } else {
  //         //     user.update({
  //         //       name: profile.displayName,
  //         //       spotifyId: profile.id,
  //         //       accessToken: accessToken,
  //         //       proPic: profile.photos[0],
  //         //       refreshToken: refreshToken
  //         //     })
  //         //     .then(updated => {
  //         //       console.log(updated.data);
  //         //       return [updated, created]} )
  //         //   }
  //         // })
  //         .then(([user]) => done(null, user))
  //         .catch(done)
  //       }

  // )

  const strategy = new SpotifyStrategy(
    spotifyConfig,

    async (accessToken, refreshToken, expires_in, profile, done) => {
      const spotifyId = profile.id
      try {
        let user = await User.findOne({
          where: {spotifyId}
        })

        if (!user) {
          console.log('does not exist!')
          await User.create({
            name: profile.displayName,
            spotifyId: profile.id,
            accessToken: accessToken,
            proPic: profile.photos[0],
            refreshToken: refreshToken
          })
        } else if (user) {
          console.log('here!!!')
          await user.update({
            name: profile.displayName,
            spotifyId: profile.id,
            accessToken: accessToken,
            proPic: profile.photos[0],
            refreshToken: refreshToken
          })
        }
        done(null, user)
      } catch (err) {
        done(err)
      }
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

//BQAT2mXFPoqeGDZSHo40q9QJvRByVVTVIxf0fomDliKqH_QS9U__B65R4Z7wPtpau-onbThVIbpJdFd0K-w3kQJIbLag9SZuVqdFOV3qJ4te5VOME_E1SP3M5nTe0bcKRQ744GujsfHuplSd520bQZBf7t4N-GGRjDkT-gA
