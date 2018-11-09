import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Questions extends Component {
  // State to manage active tab
  state = { activeIndex: 0 }
  selectTab = index => this.setState({ activeIndex: index })

  render() {
    // console.log(this.state.activeIndex, "!")
    // console.info(this.props)
    const { answeredIds, unansweredIds, authedUser } = this.props

    const idsToLists = (ids) => (ids.map(id => (
      <li key={id}>
        <Question id={id} />
      </li>)))

    const activeIndex = this.state.activeIndex;

    const displayIds = (activeIndex === 0) 
      ? idsToLists(answeredIds)
      : idsToLists(unansweredIds)

    return (
      <div className='page-container'>
        <div className='tabList'>
          <button className={`tabBtn ${(activeIndex===0) && 'activeBtn'}`} onClick={() => this.selectTab(0)}>Answered Questions</button>
          <button className={`tabBtn ${(activeIndex===1) && 'activeBtn'}`} onClick={() => this.selectTab(1)}>Unanswered Questions</button>
        </div>
        <ul className='questions-list'>
          {displayIds}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  const answeredIds = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    .filter(id => {
      let q = questions[id]
      return ([...q.optionOne.votes, ...q.optionTwo.votes].includes(authedUser))
    })
  const unansweredIds = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
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
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Questions)