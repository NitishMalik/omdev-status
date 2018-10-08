import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Task from './Task';
import DateRangePicker from '../dateRangeSelector/DateRangeSelector';

class MyTasks extends Component {
	onDeleteAccount = (e) => {
		this.props.deleteAccount();
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let mytasksContent;
		if (profile == null || loading) {
			mytasksContent = <Spinner />;
		} else {
			//check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				mytasksContent = (
					<div>
						<p className="lead text-muted">
							Welcome{' '}
							<Link to={`/profile/${profile._id}`}>{`${profile.firstName} ${profile.lastName}`}</Link>
                            <DateRangePicker />
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
				mytasksContent = (
					<div>
						<p className="lead text-muted"> Welcome {user.email}</p>
						<p>Set up your profile</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="myTasks">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="display-4" style={{ fontSize: '16px' }}>
								{mytasksContent}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

MyTasks.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(MyTasks);
