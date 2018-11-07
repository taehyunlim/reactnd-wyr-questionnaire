// Redux dependencies
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

// Action types
import { SET_AUTHED_USER, RECEIVE_USERS, RECEIVE_QUESTIONS, } from '../actions/actionTypes'

function authedUser (state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    default:
      return state
  }
}

function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}

function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    default:
      return state
  }
}

// Export reducer (to be imported in src/index.js)
export default combineReducers(
  {
    authedUser: authedUser,
    users: users,
    questions: questions,
    loadingBar: loadingBarReducer,
  }
)
