import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getSpotifyData, getSpotifyMusicData} from '../store/spotify'
import {Link, withRouter} from 'react-router-dom'
import {Button, Heading, Section} from 'react-bulma-components/full'

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
      <div className="box">
        <Heading size={4}>Welcome, {name}</Heading>
        <img src={this.props.user.proPic} />
        <p>
          <strong>Spotify ID:</strong> {this.props.user.spotifyId}
        </p>
        <p>
          <strong>Phone Number:</strong> {this.props.user.phoneNum}
        </p>
        <Link to={`/user/${this.props.user.id}`}>
          <Button color="success" size="small" outlined>
            MY PROFILE
          </Button>
        </Link>
        <p />
        <br />
        <p />
        <Link to={`/user/matches/${this.props.user.id}`}>
          <Button color="success" size="small" outlined>
            MY MATCHES
          </Button>
        </Link>
        {/* <h1>TOP GENRES</h1>
        {genres.map((genre, index) => {
          return <p key={index}>{genre}</p>
        })} */}
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
