import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScoreCard } from './ScoreCard' 

class LeaderBoard extends Component {
  state = {
    activeTabSort: 0
  }
  
  render() {
    const { activeTabSort } = this.state
    const { questions, users, authedUser } = this.props
    const userIds = Object.keys(users)

    // Only return page if authedUser is set
    if (!authedUser) return null
    return (
      <div className='page-container'>
        <div className='tabList'>
          <button className={`tabBtn ${(activeTabSort===0) && 'activeBtn'}`} onClick={() => this.setState(() => ({ activeTabSort: 0}))}>Sort By Total Score</button>
          <button className={`tabBtn ${(activeTabSort===1) && 'activeBtn'}`} onClick={() => this.setState(() => ({ activeTabSort: 1}))}>Sort By Questions</button>
          <button className={`tabBtn ${(activeTabSort===2) && 'activeBtn'}`} onClick={() => this.setState(() => ({ activeTabSort: 2}))}>Sort By Answers</button>
        </div>
        <ul className={'questions-list'}>
        {userIds.map((userId) => (
          <li key={userId}>
            <ScoreCard key={userId} user={users[userId]} />
          </li>
        ))}
        </ul>
      </div>
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