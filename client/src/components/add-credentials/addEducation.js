import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"; // To redirect from the actions, we need to wrap the component (that calls the addEducation prop-func) with withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
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

    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.currnet,
      description: this.state.description
    };

    this.props.addEducation(newEdu, this.props.history);
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
    console.log(this.state.disabled);
    console.log(this.state.current);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="text-center lead">Lets add your qualifications</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h6>* School</h6>
                <TextFieldGroup
                  placeholder="* School / College / University"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  errors={errors.school}
                />
                <h6>* Degree</h6>
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  errors={errors.degree}
                />
                <h6>Field of study</h6>
                <TextFieldGroup
                  placeholder="Field Of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  errors={errors.fieldOfStudy}
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
                  disabled={this.state.disabled ? "" : "disabled"}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="from-check-input"
                    name="current"
                    value={!this.state.current}
                    checked={!this.state.current}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
