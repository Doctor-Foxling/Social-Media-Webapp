import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"; // To redirect from the actions, we need to wrap the component (that calls the addExperience prop-func) with withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.currnet,
      description: this.state.description
    };

    this.props.addExperience(newExp, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="text-center lead">
                Lets add some work experience, past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h6>* Job Title</h6>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  errors={errors.title}
                  info="Title of position you were/are at"
                />
                <h6>* Company</h6>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                  info="It could be your own or the one you were/are working at"
                />
                <h6>Location</h6>
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                />
                <h6>* From:</h6>
                <TextFieldGroup
                  placeholder="Workig from"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={errors.from}
                />
                <h6>To:</h6>
                <TextFieldGroup
                  placeholder="Worked till"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  errors={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="from-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                  info="What was your main role and activities"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
