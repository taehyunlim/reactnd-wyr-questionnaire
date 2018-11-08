import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    // console.info(this.props)
    const { question } = this.props
    if (!question) {
      return <p>[Error] This Question does not exist.</p>
    }
    const { name, id, timestamp, avatar, votesOptionOne, votesOptionTwo, textOptionOne, textOptionTwo } = question

    const preview = (
      <div className='question-info'>
        <div className='timestamp'>{timestamp}</div>
        <div>{name} asks:</div>
        <div>Would you rather</div>
        <div>{textOptionOne}: {votesOptionOne.length} </div>
        <div>{textOptionTwo}: {votesOptionTwo.length} </div>
        <Link to={`/question/${id}`}>
          View Poll
        </Link>
      </div>)

    return (
      <div className='question'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
        {preview}
      </div>
    )
  }
}

function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author
  const { votes: votesOptionOne, text: textOptionOne } = optionOne
  const { votes: votesOptionTwo, text: textOptionTwo } = optionTwo

  return {
    name,
    id,
    timestamp: formatDate(timestamp),
    avatar: avatarURL,
    votesOptionOne,
    votesOptionTwo,
    textOptionOne,
    textOptionTwo
  }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
  const { id } = props
  const question = questions[id]
  return {
    authedUser,
    question: question 
      ? formatQuestion(question, users[question.author], authedUser) 
      : null
  }
}

export default connect(mapStateToProps)(Question)