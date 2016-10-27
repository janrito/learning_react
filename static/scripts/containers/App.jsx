import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CommentActionCreators from '../actions'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'

class App extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
  }

  componentDidMount() {
    this.props.fetchCommentsIfNeeded()
  }

  render() {
    const {comments, isFetching, lastUpdated} = this.props
    const isEmpty = comments.length === 0
    return (
      <div className="commentBox">
        <h1>Comments</h1>

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <CommentList comments={comments}/>
            </div>
        }

        {lastUpdated &&
            <p className='meta'>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </p>
          }


        <CommentForm onAddComment={this.props.addComment}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
    isFetching: state.isFetching,
    lastUpdated: state.lastUpdated
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(CommentActionCreators, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
