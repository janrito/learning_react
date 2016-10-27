import React, { Component, PropTypes } from 'react';

import Comment from './Comment'


export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="commentList">
        {this.props.comments.map((comment) =>
          <Comment
            key={comment.id}
            {...comment}
            />
        )}
      </div>
    )
  }
}
