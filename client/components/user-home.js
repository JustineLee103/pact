import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getSpotifyData} from '../store/spotify'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.me()
    console.log(this.props.accessToken)
    this.props.getSpotifyData(this.props.accessToken)
    console.log('SPOTIFY DATA!!', this.props.spotifyData)
  }

  render() {
    const {name} = this.props
    console.log(
      this.props.user,
      'THIS IS THE ACCESS TOKEN',
      this.props.accessToken
    )
    return (
      <div>
        <h3>Welcome, {name}</h3>
        <img src={this.props.user.proPic} />
        <p>Spotify ID: {this.props.user.spotifyId}</p>
        <p>Phone Number: {this.props.user.phoneNum}</p>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    name: state.user.name,
    accessToken: state.user.accessToken,
    spotifyData: state.combinedSpotify.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSpotifyData: token => dispatch(getSpotifyData(token)),
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
