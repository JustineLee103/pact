import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getSpotifyData, getSpotifyMusicData} from '../store/spotify'
import {Link, withRouter} from 'react-router-dom'

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
    this.props.getSpotifyData()
    this.props.getSpotifyMusicData()
    console.log('componentDidMount SPOTIFY DATA!!', this.props.spotifyData)
    console.log('componentDidMount MUSIC DATA:', this.props.musicData)
  }

  render() {
    const {name} = this.props
    console.log(
      'RENDER: USER DATA!!!',
      this.props.user,
      'RENDER: MUSIC DATA',
      this.props.musicData
    )
    const genres = this.props.musicData
    console.log('ISIT AN ARRAY??', Array.isArray(genres))
    return (
      <div>
        <h3>Welcome, {name}</h3>
        <img src={this.props.user.proPic} />
        <p>Spotify ID: {this.props.user.spotifyId}</p>
        <p>Phone Number: {this.props.user.phoneNum}</p>
        <Link to={`/user/${this.props.user.id}`}>
          <button>MY PROFILE</button>
        </Link>
        <h1>TOP GENRES</h1>
        {genres.map((genre, index) => {
          return <p key={index}>{genre}</p>
        })}
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
    spotifyData: state.combinedSpotify.userData,
    musicData: state.combinedSpotify.musicData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSpotifyData: () => dispatch(getSpotifyData()),
    getSpotifyMusicData: () => dispatch(getSpotifyMusicData()),
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
