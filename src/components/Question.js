import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion } from "../utils/helper";
import { handleAnswerQuestion } from "../actions";
import { HorizontalBar } from "react-chartjs-2";

class Question extends Component {
  state = {
    selectedOption: null,
    isEditMode: false
  };

  componentDidMount() {
    // prevAnswer: ['optionOne', 'optionTwo', null]
    this.setState({
      selectedOption: this.props.prevAnswer,
      isEditMode: this.props.prevAnswer ? false : true
    });
  }

  handleChange = e => {
    const selectedOption = e.target.value;
    this.setState(() => ({ selectedOption }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { question, dispatch } = this.props;
    const data = {
      id: question.id,
      authedUser: this.props.authedUser,
      answer: this.state.selectedOption
    };
    // Async API call
    dispatch(handleAnswerQuestion(data))
      // Exit out of edit mode and switch to result view
      .then(() => {
        this.setState(() => ({ isEditMode: false }));
      });
  };

  handleEditMode = e => {
    e.preventDefault();
    this.setState({ isEditMode: true });
  };

  render() {
    // console.info(this.props)
    const { question, votesCountOptionOne, votesCountOptionTwo } = this.props;
    // Total votes count
    const votesCountTotal = votesCountOptionOne + votesCountOptionTwo;

    if (!question) {
      return <p>[404] Question does not exist.</p>;
    }
    const {
      name,
      id,
      timestamp,
      avatar,
      votesOptionOne,
      votesOptionTwo,
      textOptionOne,
      textOptionTwo
    } = question;

    // Preview string
    const previewStringArray = textOptionOne
      .concat(" or ")
      .concat(textOptionTwo)
      .substring(0, 30)
      .split(" ");
    previewStringArray.pop(); // Take out the last partial word-string

    // Result data
    const chartData = {
      labels: ["① ", "② "],
      datasets: [
        {
          backgroundColor: [
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)"
          ],
          data: [votesOptionOne.length, votesOptionTwo.length]
        }
      ]
    };
    const chartOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            // gridLines: false,
            scaleLabel: {
              display: true
            },
            ticks: {
              min: 0,
              max: votesOptionOne.length + votesOptionTwo.length,
              stepSize: 1
            }
          }
        ],
        yAxes: [
          {
            gridLines: false,
            scaleLabel: {
              display: true
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 30,
          top: 0,
          bottom: 0
        }
      }
    };

    const checkPrevAnser = (
      <span role="img" aria-label="checked">
        {" "}
        ✔️
      </span>
    );
    // Return preview in the main page: '/'
    const preview = (
      <div className="card-container">
        <div className="card-top">
          <div>{name} asks:</div>
          <div className="timestamp">{timestamp}</div>
        </div>
        <div className="card-main">
          <div className="card-content-left">
            <img src={avatar} alt={`${name}`} className="avatar" />
          </div>
          <div className="card-content-right">
            <div style={{ fontStyle: "italic", padding: "7px 0" }}>
              Would you rather...
            </div>
            <div className="poll-text">
              {previewStringArray.join(" ").concat("...")}
            </div>
            <Link to={`/question/${id}`} className="btn">
              View
            </Link>
          </div>
        </div>
      </div>
    );

    // Return poll view in the poll page: '/quesiton/:id'
    const pollView = (
      <div className="card-container">
        <div className="card-top">
          <div>{name} asks:</div>
          <div className="timestamp">{timestamp}</div>
        </div>
        <div className="card-main">
          <div className="card-content-left">
            <img src={avatar} alt={`${name}`} className="avatar" />
          </div>
          <div className="card-content-right">
            <div style={{ fontStyle: "italic", padding: "7px 0" }}>
              Would you rather...
            </div>
            <form onSubmit={this.handleSubmit}>
              <label className="option-text">
                <input
                  type="radio"
                  className="form-radio"
                  value="optionOne"
                  checked={this.state.selectedOption === "optionOne"}
                  onChange={this.handleChange}
                />
                {textOptionOne}
              </label>
              <label className="option-text">
                <input
                  type="radio"
                  className="form-radio"
                  value="optionTwo"
                  checked={this.state.selectedOption === "optionTwo"}
                  onChange={this.handleChange}
                />
                {textOptionTwo}
              </label>
              <button
                className="btn"
                type="submit"
                disabled={!this.state.selectedOption}
              >
                Submit
              </button>
              {this.props.prevAnswer && (
                <button
                  className="btn"
                  onClick={() => this.setState({ isEditMode: false })}
                >
                  Cancel
                </button>
              )}
              {!this.props.prevAnswer && (
                <Link to={`/`} className="btn">
                  Back
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    );

    const resultView = (
      <div className="card-container">
        <div className="card-top">
          <div>{name} asks:</div>
          <div className="timestamp">{timestamp}</div>
        </div>
        <div className="card-main">
          <div className="card-content-left">
            <img src={avatar} alt={`${name}`} className="avatar" />
          </div>
          <div className="card-content-right">
            <div style={{ fontStyle: "italic", padding: "7px 0" }}>
              You would rather...
            </div>
            <div className="option-text option-text-one">
              {`① ` + textOptionOne[0].toUpperCase() + textOptionOne.slice(1)}
              {votesCountTotal > 0 && (
                <span>{` [${(
                  (votesCountOptionOne / votesCountTotal) *
                  100
                ).toFixed(0)}%]`}</span>
              )}
              {this.props.prevAnswer === "optionOne" && checkPrevAnser}
            </div>
            <div className="option-text option-text-two">
              {`② ` + textOptionTwo[0].toUpperCase() + textOptionTwo.slice(1)}
              {votesCountTotal > 0 && (
                <span>{` [${(
                  (votesCountOptionTwo / votesCountTotal) *
                  100
                ).toFixed(0)}%]`}</span>
              )}
              {this.props.prevAnswer === "optionTwo" && checkPrevAnser}
            </div>
            <HorizontalBar data={chartData} options={chartOptions} />
            <button className="btn" onClick={this.handleEditMode}>
              Edit
            </button>
            <Link to={`/`} className="btn">
              Back
            </Link>
          </div>
        </div>
      </div>
    );

    const currentView = !this.props.isPollView
      ? preview
      : this.state.isEditMode
      ? pollView
      : resultView;

    return <Fragment>{currentView}</Fragment>;
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props;
  const question = questions[id];
  // Return previous answer, if exists
  const prevAnswer = !question
    ? null
    : question.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : question.optionTwo.votes.includes(authedUser)
    ? "optionTwo"
    : null;
  // Vote counts
  const votesCountOptionOne = question.optionOne.votes.length;
  const votesCountOptionTwo = question.optionTwo.votes.length;

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    prevAnswer,
    votesCountOptionOne,
    votesCountOptionTwo
  };
}

export default connect(mapStateToProps)(Question);
