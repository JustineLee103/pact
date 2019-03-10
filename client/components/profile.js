import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSpotifyData, getSpotifyMusicData} from '../store/spotify'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <div>
        <h1>THIS IS A USER PROFILE!!</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

const connectedProfile = connect(mapState, mapDispatch)(Profile)

export default connectedProfile
