import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { formatDate, formatQuestion } from '../utils/helper'
import { handleAnswerQuestion } from '../actions'
import {Bar, HorizontalBar} from 'react-chartjs-2';

class Question extends Component {
  state = {
    selectedOption: null,
    isEditMode: false
  }

  componentDidMount() {
    // prevAnswer: ['optionOne', 'optionTwo', null]
    this.setState({ 
      selectedOption: this.props.prevAnswer,
      isEditMode: this.props.prevAnswer ? false : true
    });
  }

  handleChange = (e) => {
    const selectedOption = e.target.value
    this.setState(() => ({ selectedOption }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { question, dispatch } = this.props
    const data = {
      id: question.id,
      authedUser: this.props.authedUser,
      answer: this.state.selectedOption
    }
    // Async API call
    dispatch(handleAnswerQuestion(data))
      // Exit out of edit mode and switch to result view
      .then(() => {
        this.setState(() => ({ isEditMode: false }))
      })
  }

  handleEditMode = (e) => {
    e.preventDefault()
    this.setState({ isEditMode: true })
  }

  render() {
    // console.info(this.props)
    const { question } = this.props
    if (!question) {
      return <p>[404] Question does not exist.</p>
    }
    const { name, id, timestamp, avatar, votesOptionOne, votesOptionTwo, textOptionOne, textOptionTwo } = question
    const iconOptionOne = '1⃣'
    const iconOptionTwo = '2️⃣' 

    // Preview string
    const previewStringArray = textOptionOne.concat(' or ').concat(textOptionTwo).substring(0,30).split(' ')
    previewStringArray.pop() // Take out the last partial word-string

    // Result data
    const chartData = {
      labels: [iconOptionOne, iconOptionTwo],
      datasets: [{
      backgroundColor: ['rgba(255, 99, 132, 0.3)', 'rgba(54, 162, 235, 0.3)'],
      data: [votesOptionOne.length, votesOptionTwo.length],
      }]
    }
    const chartOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          // gridLines: false,
          scaleLabel: {
            display: true
          },
          ticks: {
              min: 0,
              max: votesOptionOne.length + votesOptionTwo.length,
              stepSize: 1
          }
        }],
        yAxes: [{
          gridLines: false,
          scaleLabel: {
            display: true
          }
        }]
      },
      layout: {
        padding: {
            left: 0,
            right: 30,
            top: 0,
            bottom: 0
        }
      }
    }

    const checkPrevAnser = (
      <span role="img" aria-label="checked">  ✔️</span>
    )
    // Return preview in the main page: '/'
    const preview = (
      <div className='card-container'>
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
            <div className='poll-text'>{previewStringArray.join(' ').concat("...")}</div>
            <Link 
              to={`/question/${id}`}
              className='btn'>
              View
            </Link>
          </div>
        </div>
      </div>)

    // Return poll view in the poll page: '/quesiton/:id'
    const pollView = (
      <div className='card-container'>
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
              <label className='option-text'>
                <input 
                  type='radio' 
                  className='form-radio'
                  value="optionOne" 
                  checked={this.state.selectedOption === 'optionOne'}
                  onChange={this.handleChange} />
                {textOptionOne}
              </label>
              <label className='option-text'>
                <input 
                  type='radio' 
                  className='form-radio'
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

    const resultView = (
      <div className='card-container'>
        <div className='card-top'>
          <div>{name} asks:</div>
          <div className='timestamp'>{timestamp}</div>
        </div>
        <div className='card-main'>
          <div className='card-content-left'>
            <img src={avatar} alt={`${name}`} className='avatar' />
          </div>
          <div className='card-content-right'>
            <div className='option-text option-text-one'>
              {`${iconOptionOne}  Would you rather ${textOptionOne}?`}
              {(this.props.prevAnswer === 'optionOne') && checkPrevAnser}
            </div>
            <div className='option-text option-text-two'>
              {`${iconOptionTwo}  Would you rather ${textOptionTwo}?`}
              {(this.props.prevAnswer === 'optionTwo') && checkPrevAnser}
            </div>
            <HorizontalBar data={chartData} options={chartOptions} /> 
            <button className='btn' onClick={this.handleEditMode}>Edit</button>
          </div>
        </div>
      </div>
    )

    // const currentView = this.props.isPollView ? pollView : preview
    // TESTING:
    const currentView = !this.props.isPollView 
      ? preview 
      : this.state.isEditMode
        ? pollView
        : resultView

    // Re-route to Login page if authedUser not set
    if (!this.props.authedUser) {
      return <Redirect to={'/login'} />
    }
  
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
  // Return previous answer, if exists
  let prevAnswer = !question 
    ? null 
    : question.optionOne.votes.includes(authedUser) 
      ? 'optionOne'
      : (question.optionTwo.votes.includes(authedUser) 
          ? 'optionTwo'
          : null)

  return {
    authedUser,
    question: question 
      ? formatQuestion(question, users[question.author], authedUser) 
      : null,
    prevAnswer
  }
}

export default connect(mapStateToProps)(Question)