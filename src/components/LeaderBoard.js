import React, { Component } from "react";
import { connect } from "react-redux";
import { ScoreCard } from "./ScoreCard";

class LeaderBoard extends Component {
  render() {
    const { users, authedUser, activeTabSort, selectTabSort } = this.props;

    // Sort userIds by sort type
    let userIdsBySortType = {};
    const sortTypes = ["totalScore", "questions", "answers"];

    sortTypes.forEach(type => {
      switch (type) {
        case "questions":
          userIdsBySortType[type] = Object.keys(users).sort(
            (a, b) => users[b][type].length - users[a][type].length
          );
          break;
        case "answers":
          userIdsBySortType[type] = Object.keys(users).sort(
            (a, b) =>
              Object.keys(users[b][type]).length -
              Object.keys(users[a][type]).length
          );
          break;
        case "totalScore":
          userIdsBySortType[type] = Object.keys(users).sort(
            (a, b) => getTotalScore(b, users) - getTotalScore(a, users)
          );
          break;
        default:
          break;
      }
    });

    function getTotalScore(id, users = {}) {
      let countQuesitons = 0,
        countAnswers = 0;
      if (users[id]) {
        countQuesitons = users[id]["questions"].length;
        countAnswers = Object.keys(users[id]["answers"]).length;
      }
      return countQuesitons * 3 + countAnswers;
    }

    // console.log(userIdsBySortType)
    const activeSortBy = sortTypes[activeTabSort];

    // Only return page if authedUser is set
    if (!authedUser) return null;
    return (
      <div className="page-container">
        <div className="tabList">
          <button
            className={`tabBtn ${activeTabSort === 0 && "activeBtn"}`}
            onClick={() => {
              selectTabSort(0);
            }}
          >
            Sort By Total Score
          </button>
          <button
            className={`tabBtn ${activeTabSort === 1 && "activeBtn"}`}
            onClick={() => {
              selectTabSort(1);
            }}
          >
            Sort By Questions
          </button>
          <button
            className={`tabBtn ${activeTabSort === 2 && "activeBtn"}`}
            onClick={() => {
              selectTabSort(2);
            }}
          >
            Sort By Answers
          </button>
        </div>
        <ul className={"questions-list"}>
          {userIdsBySortType[activeSortBy].map(userId => (
            <li key={userId}>
              <ScoreCard key={userId} user={users[userId]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(LeaderBoard);
