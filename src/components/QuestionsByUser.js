import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionsByUser extends Component {
  render() {
    const { answeredIds, unansweredIds, authedUser, activeTab } = this.props

    const idsToLists = (ids) => (ids.map(id => (
      <li key={id}>
        <Question id={id} />
      </li>)))

    const displayIds = (activeTab === 0) 
      ? idsToLists(answeredIds)
      : idsToLists(unansweredIds)
    
    // Only return page if authedUser is set
    if (!authedUser) return null
    return (
      <div className='page-container'>
        <div className='tabList'>
          <button className={`tabBtn ${(activeTab===0) && 'activeBtn'}`} onClick={() => this.props.selectTab(0)}>Answered Questions</button>
          <button className={`tabBtn ${(activeTab===1) && 'activeBtn'}`} onClick={() => this.props.selectTab(1)}>Unanswered Questions</button>
        </div>
        <ul className='questions-list'>
          {displayIds}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const answeredIds = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    .filter(id => questions[id].author === props.user)
    .filter(id => {
      let q = questions[id]
      return ([...q.optionOne.votes, ...q.optionTwo.votes].includes(authedUser))
    })
  const unansweredIds = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    .filter(id => questions[id].author === props.user)
    .filter(id => {
      let q = questions[id]
      return (![...q.optionOne.votes, ...q.optionTwo.votes].includes(authedUser))
    })
  return {
    testProp: "Just a string as a test prop",
    authedUser: authedUser,
    users: users,
    answeredIds,
    unansweredIds,
    user: props.user,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionsByUser)