import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    const nameArray = profile.user.name.trim().split(" ");
    const firstname =
      nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center ">{firstname}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.Twitter) ? null : (
                  <a className="text-white p-2" href={profile.social.Twitter}>
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.Facebook) ? null : (
                  <a className="text-white p-2" href={profile.social.Facebook}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.LinkedIn) ? null : (
                  <a className="text-white p-2" href={profile.social.LinkedIn}>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.Instagram) ? null : (
                  <a className="text-white p-2" href={profile.social.Instagram}>
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.Youtube) ? null : (
                  <a className="text-white p-2" href={profile.social.Youtube}>
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
