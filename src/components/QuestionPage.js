import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    // DEBUG
    console.info(this.props)
    return (
      <div className='page-container'>
        <Question id={this.props.id} isPollView={true} />
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