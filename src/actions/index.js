// External API & Redux dependencies
import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

// Action types
import { SET_AUTHED_USER, RECEIVE_USERS, RECEIVE_QUESTIONS, } from './actionTypes'

function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}
function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}
function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

const AUTHED_ID = 'taehyunlim'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}