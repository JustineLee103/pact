import axios from 'axios'

const GET_SPOTIFY_DATA = 'GET_SPOTIFY_DATA'

const initialState = {
  userData: {}
}
const gotSpotifyData = userData => ({type: GET_SPOTIFY_DATA, userData})

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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPOTIFY_DATA:
      return {...state, spotifyData: action.userData}
    default:
      return state
  }
}
