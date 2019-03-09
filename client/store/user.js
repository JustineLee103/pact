import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const GET_SPOTIFY_DATA = 'GET_SPOTIFY_DATA'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const gotSpotifyData = userData => ({type: GET_SPOTIFY_DATA, userData})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// export const getSpotifyData = () => {
//   console.log('HELLOOOOO FROM THUNK')
//   return async dispatch => {
//     try {
//       let response = await axios.get('/api/users/spotifyData')
//       let data = response.data
//       // dispatch(gotSpotifyData(data))
//       dispatch(gotSpotifyData(data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case GET_SPOTIFY_DATA:
    //   return {...state, spotifyData: action.userData}
    default:
      return state
  }
}
