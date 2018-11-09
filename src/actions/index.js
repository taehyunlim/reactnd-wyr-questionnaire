// External API & Redux dependencies
import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

// Action types
import { SET_AUTHED_USER, RECEIVE_USERS, RECEIVE_QUESTIONS, ANSWER_QUESTION } from './actionTypes'

// Action creators
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
function answerQuestion ({ authedUser, qid, answer}) {
  // Map payload to action object
  return {
    type: ANSWER_QUESTION,
    id: qid,
    authedUser: authedUser,
    answer: answer
  }
}

// TODO: user authentication & sign-in flow
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

export function handleAnswerQuestion (data) {
  return (dispatch) => {
    // Show loading bar
    dispatch(showLoading())
    // Create paylaod for the API call
    const payload = {
      authedUser: data.authedUser,
      qid: data.id,
      answer: data.answer
    }
    return saveQuestionAnswer(payload)
      // .then((res) => {
      //   console.log(res)
      // })
      // Dispatch as a callback to API
      .then(() => dispatch(answerQuestion(payload)))
      // Hide loading bar
      .then(() => dispatch(hideLoading()))
  }
}