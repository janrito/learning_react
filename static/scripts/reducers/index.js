import { combineReducers } from 'redux'

import {
  INVALIDATE_COMMENTS,
  REQUEST_COMMENTS, RECEIVE_COMMENTS
} from '../actions'

const commentReducer = (state = {
  isFetching: false,
  didInvalidate: false,
  comments: []
}, action) => {
  switch(action.type) {
    case INVALIDATE_COMMENTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        comments: action.comments,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default commentReducer
