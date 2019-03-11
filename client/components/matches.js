import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/allusers'
import {me} from '../store/user'
import {getSpotifyMusicData, getMusicDataOtherUser} from '../store/spotify'
import {Link, withRouter} from 'react-router-dom'
import {Button, Heading, Section} from 'react-bulma-components/full'

export class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedInUser: {},
      allUsers: [],
      signedInUserMusic: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.props.getAllUsers()
    this.props.me()
    this.props.getSpotifyMusicData()
    this.setState({
      signedInUser: this.props.user,
      allUsers: this.props.allUsers,
      signedInUserMusic: this.props.signedinUserMusic
    })
  }

  render() {
    const allUsers = this.props.allUsers
    const filtered = allUsers.filter(match => {
      return match.name !== this.props.user.name
    })
    const signedInUsermusic = this.props.musicData
    const calculater = (player1, player2) => {
      let matches = player1.filter(letter => {
        return player2.includes(letter)
      })
      const percent = matches.length / player1.length * 100
      let result = Math.round(percent)
      return result + '%'
    }

    return (
      <div>
        <Heading size={4}>Say Hello To Your Matches!</Heading>

        {filtered.map((user, index) => {
          return (
            <div className="block" key={index}>
              <div className="box">
                <h1>
                  <strong>{user.name}</strong>
                </h1>
                <Link to={`/user/${user.id}`}>
                  <img src={user.proPic} />
                </Link>
                <p>
                  <strong>Top Genre:</strong> {user.musicpreference.genres[0]}
                </p>
                <p>
                  <strong>
                    {calculater(signedInUsermusic, user.musicpreference.genres)}{' '}
                    match!
                  </strong>
                </p>
                <p />
                <p />
                <p />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.combinedAllUsers.users,
    user: state.user,
    // userMusic: state.combinedSpotify.userData,
    musicData: state.combinedSpotify.musicData
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    me: () => dispatch(me()),
    getSpotifyMusicData: () => dispatch(getSpotifyMusicData()),
    getMusicDataOtherUser: id => dispatch(getMusicDataOtherUser(id))
  }
}

const connectedMatches = connect(mapState, mapDispatch)(Matches)

export default connectedMatches
