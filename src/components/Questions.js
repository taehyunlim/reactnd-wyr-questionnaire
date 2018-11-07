import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Questions extends Component {
  render() {
    console.info(this.props)
    return (
      <div className='container'>
        <h3 className='center'>Questions</h3>
        <ul className='questions=list'>
          {this.props.questionIds.map(id => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    testProp: "Just a string as a test prop",
    authedUser: authedUser,
    users: users,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Questions)