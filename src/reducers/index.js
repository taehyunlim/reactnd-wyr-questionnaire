// Redux dependencies
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

// Action types
import { SET_AUTHED_USER, RECEIVE_USERS, RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/actionTypes'

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
    case ANSWER_QUESTION:
      const answerOption = action.answer // `optionOne` or `optionTwo`
      const otherOption = (answerOption === 'optionOne') ? 'optionTwo' : 'optionOne'
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          [answerOption]: {
            ...state[action.id][answerOption],
            // Dedup votes by checking if votes already include authedUser
            votes : state[action.id][answerOption].votes.includes(action.authedUser)
              ? state[action.id][answerOption].votes
              : state[action.id][answerOption].votes.concat([action.authedUser])
          },
          [otherOption]: {
            ...state[action.id][otherOption],
            // Filter out if authedUser voted for the other option in the previous state
            votes: state[action.id][otherOption].votes.filter((uid) => uid !== action.authedUser)
          }
        }
      }
    case ADD_QUESTION:
      const { question } = action
      return {
        ...state,
        [question.id]: {
          ...question
        }
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
