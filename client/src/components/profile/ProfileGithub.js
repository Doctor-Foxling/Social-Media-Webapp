import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "f8dc4b88b9479e979b25",
      clientSecret: "ca002c5bd65f17a2c6ac3689b2502ecf9d0198b3",
      count: 5,
      sort: "created: asc",
      repos: [],
      message: ""
    };
  }

  async componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    var { message } = this.state;

    const api_call = await fetch(
      `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
    );

    const usernameCheck = await api_call.json();

    this.setState({ message: usernameCheck.message });

    console.log(usernameCheck);

    if (message !== "Not Found") {
      fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=
    ${sort}$client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json())
        .then(data => {
          if (this.refs.myRef) {
            this.setState({ repos: data });
          }
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const { repos } = this.state;
    var repoItems = <hr />;
    const { message } = this.state;

    if (message === "Not Found") {
      console.log("from inside the block");
      repoItems = <h4>Github username not found</h4>;
    } else {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
