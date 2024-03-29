import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileItems from "./ProfileItems";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  // async componentDidMount() {
  //   const response = await Axios.get("/api/profile/all");
  //   const toDoItems = response.data;
  //   // this.setState({toDoItems: toDoItems}) // or this.setState({toDoItems})
  //   console.log(toDoItems);
  //   console.log("this is cool but...");
  // }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
      console.log("Profile null error");
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItems key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found.....</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profile</h1>
              <p className="lead text-center">
                Browser and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
