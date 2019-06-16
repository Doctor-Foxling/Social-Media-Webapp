import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/textFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // Runs when the component receives new properties
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // console.log(newUser.name);

    this.props.registerUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  type="text"
                  placeholder="User Name"
                  errors={errors.name}
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  errors={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <small className="form-text text-muted mt-0 mb-3 pt-0">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="User Password"
                  errors={errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  errors={errors.password2}
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // state.'auth' comes from rootreducer 'auth: authReducer'
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
