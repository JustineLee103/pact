import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const initialState = {
  users: []
}

const gotUsers = users => ({type: GET_ALL_USERS, users})

export const getAllUsers = () => async dispatch => {
  try {
    let users = await axios.get('/api/users')
    dispatch(gotUsers(users.data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
