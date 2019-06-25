import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"; // this is needed for the history argument in createProfile prop func to work

import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUserName: "",
      bio: "",
      Twitter: "",
      Facebook: "",
      LinkedIn: "",
      Instagram: "",
      Youtube: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const existingProfile = nextProps.profile.profile;

      // Bring skills array back into CSV string
      const skillsCSV = existingProfile.skills.join(",");

      // If profile field doesn't exist, make empty string
      existingProfile.company = !isEmpty(existingProfile.company)
        ? existingProfile.company
        : "";
      existingProfile.website = !isEmpty(existingProfile.website)
        ? existingProfile.website
        : "";
      existingProfile.location = !isEmpty(existingProfile.location)
        ? existingProfile.location
        : "";
      existingProfile.githubUserName = !isEmpty(existingProfile.githubUserName)
        ? existingProfile.githubUserName
        : "";
      existingProfile.bio = !isEmpty(existingProfile.bio)
        ? existingProfile.bio
        : "";

      existingProfile.social = !isEmpty(existingProfile.social)
        ? existingProfile.social
        : {};
      existingProfile.Twitter = !isEmpty(existingProfile.social.Twitter)
        ? existingProfile.social.Twitter
        : "";
      existingProfile.Facebook = !isEmpty(existingProfile.social.Facebook)
        ? existingProfile.social.Facebook
        : "";
      existingProfile.Instagram = !isEmpty(existingProfile.social.Instagram)
        ? existingProfile.social.Instagram
        : "";
      existingProfile.Youtube = !isEmpty(existingProfile.social.Youtube)
        ? existingProfile.social.Youtube
        : "";
      existingProfile.LinkedIn = !isEmpty(existingProfile.social.LinkedIn)
        ? existingProfile.social.LinkedIn
        : "";

      // Set components field state
      this.setState({
        handle: existingProfile.handle,
        company: existingProfile.company,
        website: existingProfile.website,
        location: existingProfile.location,
        status: existingProfile.status,
        skills: skillsCSV,
        githubUserName: existingProfile.githubUserName,
        bio: existingProfile.bio,
        Twitter: existingProfile.Twitter,
        Facebook: existingProfile.Facebook,
        LinkedIn: existingProfile.LinkedIn,
        Instagram: existingProfile.Instagram,
        Youtube: existingProfile.Youtube
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      Twitter: this.state.Twitter,
      Facebook: this.state.Facebook,
      LinkedIn: this.state.LinkedIn,
      Instagram: this.state.Instagram,
      Youtube: this.state.Youtube,
      errors: this.state.errors
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twiter profile URL"
            name="Twitter"
            icon="fab fa-twitter"
            value={this.state.Twitter}
            onChange={this.onChange}
            errors={errors.Twitter}
          />
          <InputGroup
            placeholder="facebook profile URL"
            name="Facebook"
            icon="fab fa-facebook"
            value={this.state.Facebook}
            onChange={this.onChange}
            errors={errors.Facebook}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="Instagram"
            icon="fab fa-instagram"
            value={this.state.Instagram}
            onChange={this.onChange}
            errors={errors.Instagram}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="Youtube"
            icon="fab fa-youtube"
            value={this.state.Youtube}
            onChange={this.onChange}
            errors={errors.Youtube}
          />
          <InputGroup
            placeholder="LinkedIn profile URL"
            name="LinkedIn"
            icon="fab fa-linkedin"
            value={this.state.LinkedIn}
            onChange={this.onChange}
            errors={errors.LinkedIn}
          />
        </div>
      );
    }
    // Select options for status
    const options = [
      { label: "*Select Professional Status", value: 0 },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="text-center display-4">Edit Profile</h1>
              <small className="d-block pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  errors={errors.handle}
                  info="A unique handle for your profile URL. Your fullname, company name, nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  errors={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={errors.website}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={errors.skills}
                  info="Please use comma separated values (e.g. HTML,JavaScript,CSS,Python,C++)"
                />
                <TextFieldGroup
                  placeholder="Github username"
                  name="githubUserName"
                  value={this.state.githubUserName}
                  onChange={this.onChange}
                  errors={errors.githubUserName}
                  info="If you want your latest repos and a Github Link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  errors={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
