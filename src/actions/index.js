// External API & Redux dependencies
import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

// Action types
import { SET_AUTHED_USER, RECEIVE_USERS, RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION, UPDATE_USER } from './actionTypes'

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
function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
function updateUser ({ authedUser, qid, answer }) {
  // var answer = { id: "", option: "optionOne" || "optionTwo" }
  // Either add question or update an answer
  return {
    type: UPDATE_USER,
    qid: qid,
    answer: answer,
    authedUser: authedUser
  }
}

// TODO: user authentication & sign-in flow
// const AUTHED_ID = 'taehyunlim'
export function handleSetAuthedUser (id) {
  return (dispatch) => {
    return dispatch(setAuthedUser(id))
  }
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        // dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch) => {
    // Show loading bar
    dispatch(showLoading())
    // Create paylaod for the API call
    const payload = {
      authedUser: info.authedUser,
      qid: info.id,
      answer: info.answer
    }
    return saveQuestionAnswer(payload)
      // .then((res) => {
      //   console.log(res)
      // })
      // Dispatch as a callback to API
      .then(() => {
        // Update both questions and users store
        dispatch(answerQuestion(payload))
        dispatch(updateUser(payload))
      })
      // Hide loading bar
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAddQuestion(info, cb) {
  return (dispatch) => {
    // Show loading bar
    dispatch(showLoading())
    // Create paylaod for the API call
    const payload = {
      optionOneText: info.optionOneText,
      optionTwoText: info.optionTwoText,
      author: info.authedUser
    }
    return saveQuestion(payload)
      // Grab the response (Question object) from API and dispatch 
      .then((res) => {
        // Add question to the store
        dispatch(addQuestion(res))
        // Update user by appending question id to the user's questions properity
        dispatch(updateUser({ 
          authedUser: info.authedUser, 
          qid: res.id
        }))
        // Invoke callback with the question id for redirect routing in the app
        cb(res.id)
      })
      // Hide loading bar
      .then(() => dispatch(hideLoading()))
  }
}