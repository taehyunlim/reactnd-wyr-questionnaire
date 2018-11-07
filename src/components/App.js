import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import LoadingBar from 'react-redux-loading'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className="App">
          <header className="App-header">
            <p>Hello React</p>
          </header>
        </div>
      </Fragment>
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
