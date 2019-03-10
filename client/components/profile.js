import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleUserData} from '../store/user'

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
    const id = this.props.match.params.id

    this.props.getSingleUserData(id)
    //   this.setState(this.props.user)
  }

  render() {
    console.log(this.props.user.musicpreferenceId)
    const genres = this.props.musicData
    return (
      <div>
        <h1>THIS IS A USER PROFILE!!</h1>
        <p>{this.props.user.spotifyId}</p>
        {genres &&
          genres.map((genre, index) => {
            return <p key={index}>{genre}</p>
          })}
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
    getSingleUserData: id => dispatch(getSingleUserData(id))
  }
}

const connectedProfile = connect(mapState, mapDispatch)(Profile)

export default connectedProfile
