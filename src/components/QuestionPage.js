import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  
  render() {
    const { authedUser, id } = this.props
    
    // Only return page if authedUser is set
    if (!authedUser) return null
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