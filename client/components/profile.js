import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleUserData} from '../store/user'
import {getMusicDataOtherUser} from '../store/spotify'
import {Button, Heading, Section} from 'react-bulma-components/full'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user)
    const userId = this.props.match.params.id
    this.props.getSingleUserData(userId)
    const userMusicId = this.props.user.musicpreferenceId
    this.props.getMusicDataOtherUser(userMusicId)
    // this.setState(this.props.user)
  }

  render() {
    console.log('HELLO!!!', this.props.user.musicpreferenceId)
    const musicData = this.props.musicData
    console.log('GENRES inside render', musicData)
    console.log('without .genres', this.props.musicData)
    console.log('PROFILE PAGE, ISIT AN ARRAY??', Array.isArray(musicData))
    return (
      <div className="box">
        <Heading size={4}>Welcome to {this.props.user.name}'s Profile!</Heading>
        <Button color="success" size="small" outlined>
          SEND A TEXT
        </Button>
        <p />
        <br />
        <p />
        <img src={this.props.user.proPic} />
        <div className="box">
          <Heading size={6}>Here are my top genres!</Heading>
          <p>{this.props.musicData.genres}</p>
          {musicData.map((genre, index) => {
            return <p key={index}>{genre}</p>
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    musicData: state.combinedSpotify.musicData
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleUserData: id => dispatch(getSingleUserData(id)),
    getMusicDataOtherUser: id => dispatch(getMusicDataOtherUser(id))
  }
}

const connectedProfile = connect(mapState, mapDispatch)(Profile)

export default connectedProfile
