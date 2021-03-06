import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validations/is-empty";
import imgBackup from "../../img/profile_image_bckup.jpg";

class ProfileItem extends Component {
  onLoadImage = e => {
    //e.target.src = imgBackup;
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={imgBackup}
              alt=" "
              className="rounded-circle"
              onError={this.onLoadImage}
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{`${profile.firstName}  ${profile.lastName}`}</h3>
            <p>
              {profile.jobRole}
              {isEmpty(profile.teamId) ? null : (
                <span> Team - {profile.teamId}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile._id}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
