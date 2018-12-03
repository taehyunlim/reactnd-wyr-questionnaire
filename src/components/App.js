import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import LoadingBar from "react-redux-loading";
import "./App.css";
import { Nav } from "./Nav";
import Questions from "./Questions";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import LeaderBoard from "./LeaderBoard";
import ProfilePage from "./ProfilePage";

class App extends Component {
  // App level state for UI
  state = {
    activeTab: 1,
    activeTabSort: 0
  };
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  // Passing down as a prop using render method: https://tylermcginnis.com/react-router-pass-props-to-components/
  selectTab = index => this.setState({ activeTab: index });
  selectTabSort = index => this.setState({ activeTabSort: index });

  render() {
    const { authedUser, loading } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav authedUser={authedUser} />
            {!authedUser && <Login />}
            {!loading && (
              <div>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Questions
                      activeTab={this.state.activeTab}
                      selectTab={this.selectTab}
                    />
                  )}
                />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/add" component={NewQuestion} />
                <Route
                  path="/leaderboard"
                  exact
                  render={() => (
                    <LeaderBoard
                      activeTabSort={this.state.activeTabSort}
                      selectTabSort={this.selectTabSort}
                    />
                  )}
                />
                <Route
                  path="/profile/:user"
                  exact
                  render={props => (
                    <ProfilePage
                      activeTab={this.state.activeTab}
                      selectTab={this.selectTab}
                      {...props}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: users === null,
    authedUser
  };
}

// Using the connect() function upgrades a component to a container. Containers can read state from the store and dispatch actions.
export default connect(mapStateToProps)(App);
