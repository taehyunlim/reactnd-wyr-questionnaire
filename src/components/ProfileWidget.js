import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholder from '../assets/avatar_placeholder.png'

class ProfileWidget extends Component {
  
  render() {
    const { authedUser, users } = this.props
    const user = users[authedUser]
    const avatar = user ? user.avatarURL : placeholder
    const userId = user ? user.id : 'Login'
    return (
      // Only return page if authedUser is set
      <div className='widget-container'>
        <img className='avatar-widget' src={avatar} alt={`Avatar of ${userId}`} />
        <span className='avatar-widget-text'>{userId}</span>
      </div>
      
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(ProfileWidget)