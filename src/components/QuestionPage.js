import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class QuestionPage extends Component {
  
  render() {
    const { authedUser, id } = this.props
    
    // Re-route to Login page if authedUser not set
    if (!authedUser) {
      return <Redirect to={'/login'}  />
    }

    return (
      <div className='page-container'>
        <Question id={id} isPollView={true} />
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
  const { id } = props.match.params
  return {
    id,
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionPage)