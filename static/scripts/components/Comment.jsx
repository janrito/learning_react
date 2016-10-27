import React, { Component, PropTypes } from 'react'
import Remarkable from 'remarkable'

export default class Comment extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }
  rawMarkup(markdown) {
    let md = new Remarkable();
    let rawMarkup = md.render(markdown.toString())
    return {__html: rawMarkup}
  }

  render() {
    const {author, text} = this.props
    return (
      <blockquote className="comment">
        <div dangerouslySetInnerHTML={ this.rawMarkup(text) }/>
        <cite className="commentAuthor">
          - {author}
        </cite>
      </blockquote>
    )
  }
}
