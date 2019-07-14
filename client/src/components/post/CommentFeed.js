import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    let feedContent = <h1>hello</h1>;
    if (comments) {
      return comments.map(comment => (
        <CommentItem key={comment._id} postId={postId} comment={comment} />
      ));
    }

    return feedContent;
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
