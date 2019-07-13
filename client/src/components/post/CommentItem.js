import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { Link } from "react-router-dom";

class CommentItem extends Component {
  onDeleteClick(commentId, postId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-1 post-style text-white">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/user/${comment.user}`}>
              <img
                src={comment.avatar}
                alt=""
                className="rounded-circle d-none d-md-block"
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            <hr
              style={{
                display: "block",
                borderWidth: "10px",
                borderStyle: "inset"
              }}
            />
            {comment.user === auth.user.id ? (
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={this.onDeleteClick.bind(this, comment._id, postId)}
              >
                <i className="fas fa-times" /> Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
