import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate, formatQuestion } from '../utils/helper'
import { handleAnswerQuestion } from '../actions'

class Question extends Component {
  state = {
    selectedOption: ''
  }

  handleChange = (e) => {
    const selectedOption = e.target.value
    this.setState(() => (
      { selectedOption }
    ))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { question, dispatch } = this.props
    const data = {
      id: question.id,
      authedUser: this.props.authedUser,
      answer: this.state.selectedOption
    }
    dispatch(handleAnswerQuestion(data))
  }

  render() {
    // console.info(this.props)
    const { question } = this.props
    if (!question) {
      return <p>[Error] This Question does not exist.</p>
    }
    const { name, id, timestamp, avatar, votesOptionOne, votesOptionTwo, textOptionOne, textOptionTwo } = question

    // Return preview in the main page: '/'
    const preview = (
      <div className='question-card'>
        <div className='card-top'>
          <div>{name} asks:</div>
          <div className='timestamp'>{timestamp}</div>
        </div>
        <div className='card-main'>
          <div className='card-content-left'>
            <img src={avatar} alt={`${name}`} className='avatar' />
          </div>
          <div className='card-content-right'>
            <div style={{fontStyle: 'italic', padding: '7px 0'}}>Would you rather...</div>
            <div className='poll-text'>{textOptionOne}: {votesOptionOne.length} </div>
            <div className='poll-text'>{textOptionTwo}: {votesOptionTwo.length} </div>
            <Link to={`/question/${id}`}>
              View Poll
            </Link>
          </div>
        </div>
      </div>)

    // Return poll view in the poll page: '/quesiton/:id'
    const pollView = (
      <div className='question-card'>
        <div className='card-top'>
          <div>{name} asks:</div>
          <div className='timestamp'>{timestamp}</div>
        </div>
        <div className='card-main'>
          <div className='card-content-left'>
            <img src={avatar} alt={`${name}`} className='avatar' />
          </div>
          <div className='card-content-right'>
            <div style={{fontStyle: 'italic', padding: '7px 0'}}>Would you rather...</div>
            <form onSubmit={this.handleSubmit}>
              <label className='poll-text'>
                <input 
                  type='radio' 
                  value="optionOne" 
                  checked={this.state.selectedOption === 'optionOne'}
                  onChange={this.handleChange} />
                {textOptionOne}
              </label>
              <label className='poll-text'>
                <input 
                  type='radio' 
                  value="optionTwo" 
                  checked={this.state.selectedOption === 'optionTwo'}
                  onChange={this.handleChange} />
                {textOptionTwo}
              </label>
              <button className='btn' type='submit' disabled={!this.state.selectedOption}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )

    const currentView = this.props.isPollView ? pollView : preview

    return (
      <Fragment>
        {currentView}
      </Fragment>
    )
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