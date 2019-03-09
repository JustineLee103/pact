import axios from 'axios'

const GET_SPOTIFY_DATA = 'GET_SPOTIFY_DATA'
const GET_SPOTIFY_MUSIC_DATA = 'GET_SPOTIFY_MUSIC_DATA'

const initialState = {
  userData: {},
  musicData: {}
}
const gotSpotifyData = userData => ({type: GET_SPOTIFY_DATA, userData})
const gotSpotifyMusicData = musicData => ({
  type: GET_SPOTIFY_MUSIC_DATA,
  musicData
})

export const getSpotifyData = () => {
  console.log('HELLOOOOO FROM THUNK')
  return async dispatch => {
    try {
      let response = await axios.get('/api/users/spotifyData')
      let data = response.data
      // dispatch(gotSpotifyData(data))
      dispatch(gotSpotifyData(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getSpotifyMusicData = () => {
  return async dispatch => {
    try {
      let response = await axios.get('/api/users/musicData')
      let data = response.data
      dispatch(gotSpotifyMusicData(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPOTIFY_DATA:
      return {...state, userData: action.userData}
    case GET_SPOTIFY_MUSIC_DATA:
      return {...state, musicData: action.musicData}
    default:
      return state
  }
}
