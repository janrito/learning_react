import React, { Component, PropTypes } from 'react'

export default class CommentForm extends Component {
  static propTypes = {
    onAddComment: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      author: '',
      text: ''
    }
  }

  handleAuthorChange (e) {
    this.setState({
      author: e.target.value
    })
  }

  handleTextChange (e) {
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();

    if (!(text && author)) {
      return;
    }
    this.props.onAddComment({
      author: author,
      text: text
    });

    this.setState({author: '', text: ''})
  }

  render() {
    const {author, text} = this.state
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          placeholder="Say something..."
          value={text}
          onChange={this.handleTextChange.bind(this)}></textarea>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={this.handleAuthorChange.bind(this)}/>
        <input
          type="submit"
          value="Post"/>
      </form>
    )
  }
}
