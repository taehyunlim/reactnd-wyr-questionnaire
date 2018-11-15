import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  
  render() {
    const { questions, users, authedUser } = this.props
    const userIds = Object.keys(users)
    return (
      // Only return page if authedUser is set
      (authedUser &&
        <div className='page-container'>
          {userIds.map((userId) => (
            <li key={userId}>{userId}</li>
          ))}
        </div>
      )
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)