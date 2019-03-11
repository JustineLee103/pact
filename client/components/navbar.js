import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="card-content">
    <nav className="nav">
      {isLoggedIn ? (
        <div className="nav-center">
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home" >Home</Link> */}
          <Link to="/home" className="button is-success is-small is-inverted">
            Home
          </Link>
          <a
            href="#"
            className="button is-success is-small is-inverted"
            onClick={handleClick}
          >
            Logout
          </a>
        </div>
      ) : null}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

// {isLoggedIn ? (
//   <div className='nav-center'>
//     {/* The navbar will show these links after you log in */}
//     {/* <Link to="/home" >Home</Link> */}
//     <a href="/home" className='nav-item' onClick={handleClick}>
//       Home
//     </a>
//     <a href="#" className='nav-item' onClick={handleClick}>
//       Logout
//     </a>
//   </div>
// ) : (
//   <div className='nav-center'>
//     {/* The navbar will show these links before you log in */}
//     <Link to="/login">Login</Link>
//     <Link to="/signup">Sign Up</Link>
//   </div>
// )}
