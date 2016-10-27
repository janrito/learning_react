export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const INVALIDATE_COMMENTS = 'INVALIDATE_COMMENTS'


export const addComment = ({text, author}) => dispatch => {
  dispatch(invalidateComments())

  let payload = {text, author}
  return fetch(`./api/comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: Object
            .keys(payload)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(payload[k])}`)
            .join('&')

  }).then(response => response.json())
    .then(json => dispatch(fetchCommentsIfNeeded()))
}

export const receiveComments = json => ({
  type: RECEIVE_COMMENTS,
  comments: json,
  receivedAt: Date.now()
})

export const invalidateComments = () => ({
  type: INVALIDATE_COMMENTS
})

export const requestComments = () => ({
  type: REQUEST_COMMENTS
})

const fetchComments = () => dispatch => {
  dispatch(requestComments())
  return fetch(`./api/comments`)
    .then(response => response.json())
    .then(json => dispatch(receiveComments(json)))
}

const shouldFetchComments = state => {
  if (!state.comments.length) {
    return true
  }

  if (state.isFetching) {
    return false
  }

  return state.didInvalidate
}

export const fetchCommentsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchComments(getState())) {
    return dispatch(fetchComments())
  }
}
