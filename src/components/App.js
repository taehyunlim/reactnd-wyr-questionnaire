import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import LoadingBar from 'react-redux-loading'
import './App.css';
import { Nav } from './Nav'
import Test from './Test'
import Questions from './Questions'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'

class App extends Component {
  // App level state for UI
  state = { activeTab: 0 }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  selectTab = index => this.setState({ activeTab: index })

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {!(this.props.loading) &&
              <div>
                <Route path='/' exact render={() => <Questions activeTab={this.state.activeTab} selectTab={this.selectTab} />} />
                <Route path='/question/:id' component={QuestionPage} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/leader-board' component={Test} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

// Using the connect() function upgrades a component to a container. Containers can read state from the store and dispatch actions.
export default connect(mapStateToProps)(App)
