import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Task from './Task';

class Dashboard extends Component {
	onDeleteAccount = (e) => {
		this.props.deleteAccount();
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile == null || loading) {
			dashboardContent = <Spinner />;
		} else {
			//check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Task task={profile.task} />
						<div style={{ marginBottom: '60px' }}>
							<button className="btn btn-danger" onClick={this.onDeleteAccount}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				//Logged in user has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted"> Welcome {user.name}</p>
						<p>Set up your profile</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="display-4" style={{ fontSize: '16px' }}>
								{dashboardContent}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
