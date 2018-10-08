import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileTasks from './ProfileTasks';
import Spinner from '../common/Spinner';
import { getProfileById } from '../../actions/profileActions';
import ProfileCarousel from '../profileCarousel/ProfileCarousel';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.getProfileById(this.props.match.params.id);
		}
	}

    componentWillReceiveProps(nextprops) {
        if ( nextprops.match.params.id !== this.props.match.params.id) {
            this.props.getProfileById(nextprops.match.params.id);
        }
    }

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;
		if (profile == null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileTasks tasks={profile.task} />
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>

				<div className="profiles-footer">
					<ProfileCarousel/>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
