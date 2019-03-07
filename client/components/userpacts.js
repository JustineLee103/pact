import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class UserPacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // state
    }
  }

  render() {
    console.log('hello does this work?')
    return (
      <div>
        <p>this is where the habits list! </p>
      </div>
    )
  }
}

export default UserPacts
