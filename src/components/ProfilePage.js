import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { ScoreCard } from "./ScoreCard";

class ProfilePage extends Component {
  render() {
    const {
      authedUser,
      user,
      questions,
      users,
      activeTab,
      selectTab
    } = this.props;

    const authoredQuestions = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
      .filter(id => questions[id].author === user);

    const answeredQuestions = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
      .filter(id => {
        let q = questions[id];
        return [...q.optionOne.votes, ...q.optionTwo.votes].includes(user);
      });

    const idsToLists = ids =>
      ids.map(id => (
        <li key={id}>
          <Question id={id} />
        </li>
      ));

    const displayIds =
      activeTab === 0
        ? idsToLists(authoredQuestions)
        : idsToLists(answeredQuestions);

    // Only return page if authedUser is set
    if (!authedUser) return null;
    return (
      <div className="page-container">
        {authedUser === user && (
          <div className="tabList">
            <button
              className="tabBtn logout"
              onClick={() => console.log("TEST")}
            >
              Log Out
            </button>
          </div>
        )}
        <div className="questions-list">
          <ScoreCard user={users[user]} />
        </div>
        <div className="tabList">
          <button
            className={`tabBtn ${activeTab === 0 && "activeBtn"}`}
            onClick={() => selectTab(0)}
          >
            Authored Questions
          </button>
          <button
            className={`tabBtn ${activeTab === 1 && "activeBtn"}`}
            onClick={() => selectTab(1)}
          >
            Answered Questions
          </button>
        </div>
        <ul className="questions-list">{displayIds}</ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  // User ID from router params
  const { user } = props.match.params;
  return {
    authedUser,
    user,
    users,
    questions
  };
}

export default connect(mapStateToProps)(ProfilePage);
