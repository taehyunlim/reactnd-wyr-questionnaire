import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    console.info(this.props)
    return (
      <Question id={this.props.id} isPollView={true} />
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