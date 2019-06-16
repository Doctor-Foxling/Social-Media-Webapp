import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import image1 from "../../img/script1.png";
import ReactImageMagnify from "react-image-magnify";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Welcome to the furnace
                  <div className="awesomeness">where awesomeness is forged</div>
                </h1>
                <p className="lead">
                  {" "}
                  Create an AweSmith profile/portfolio, share posts and get help
                  from other AweSmiths
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    width: 100,
                    height: 150,
                    isFluidWidth: true,
                    src: image1
                  },
                  largeImage: {
                    src: image1,
                    width: 200,
                    height: 300
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
