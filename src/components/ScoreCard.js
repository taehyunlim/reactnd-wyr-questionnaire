import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const ScoreCard = (props) => {
  const { user } = props
  if (!user) return <p>[404] User does not exist.</p>
  const { id, name, avatarURL, questions, answers } = user
  const countQ = questions.length
  const countA = Object.keys(answers).length
  return (
    <div className='card-container'>
      <div className='card-top'>
        <Link to={`/profile/${id}`}>{name}</Link>
      </div>
      <div className='card-main'>
        <div className='scorecard-content-left'>
          <img src={avatarURL} alt={`${name}`} className='avatar' />
        </div>
        <div className='scorecard-content-center'>
          <div style={{fontStyle: 'italic', padding: '7px 0'}}>Points</div>
          <div className='poll-text'># of Questions: {countQ}</div>
          <div className='poll-text'># of Answers: {countA}</div>
        </div>
        <div className='scorecard-content-right'>
          Test
        </div>
        
      </div>
    </div>
  )
}