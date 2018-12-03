import React from "react";
import { Link } from "react-router-dom";

export const ScoreCard = props => {
  const { user } = props;
  if (!user) return <p>[404] User does not exist.</p>;
  const { id, name, avatarURL, questions, answers } = user;
  const countQ = questions.length;
  const countA = Object.keys(answers).length;
  return (
    <div className="card-container">
      <Link to={`/profile/${id}`}>
        <div className="card-top">{name}</div>
      </Link>
      <div className="card-main">
        <div className="scorecard-content-left">
          <img src={avatarURL} alt={`${name}`} className="avatar" />
        </div>
        <div className="scorecard-content-center">
          <div className="text"># of Questions: {countQ}</div>
          <div className="text"># of Answers: {countA}</div>
        </div>
        <div className="scorecard-content-right">
          <span>Total Score</span>
          <div className={"score"}>{countA + countQ}</div>
        </div>
      </div>
    </div>
  );
};
