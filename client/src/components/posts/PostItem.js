import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLike(id) {
    this.props.addLike(id);
  }
  onUnlike(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, dontShowActions } = this.props;
    return (
      <div>
        <br />
        <div className="card card-body mb-3 post-style text-white">
          <div className="row">
            <div className="col">
              <div className="col-md-2 col-lg-2" />
              <Link to={`/profile/user/${auth.user.id}`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt={`${post.name}'s profile picture`}
                />
              </Link>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10 col-lg-10">
              <p className="lead mb-5">{post.text}</p>
              {dontShowActions ? null : (
                <div>
                  <button
                    className="btn btn-light mr-1"
                    type="button"
                    onClick={this.onLike.bind(this, post._id)}
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    className="btn btn-light mr-1"
                    type="button"
                    onClick={this.onUnlike.bind(this, post._id)}
                  >
                    <i className="text-dark fas fa-thumbs-down ml-1" />
                  </button>
                  <Link
                    className="btn btn-dark mr-2 ml-5"
                    to={`/post/${post._id}`}
                  >
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={this.onDeleteClick.bind(this, post._id)}
                    >
                      <i className="fas fa-times" /> Delete
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
