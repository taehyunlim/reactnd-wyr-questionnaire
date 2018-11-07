// Redux dependencies
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

// Logger middleware for debugging
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('ACTION: ', action)
    const returnValue = next(action)
    console.log('NEW_STATE: ', store.getState())
  console.groupEnd()
  return returnValue
}

export default applyMiddleware(
  // The middleware is called in the order it is listed in this function. 
  thunk,
  logger,
)
