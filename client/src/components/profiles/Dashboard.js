import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if (profiles == null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />);
			} else {
				profileItems = <h4>No profiles found..</h4>;
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Omdev Developer Profiles</h1>
							<p className="lead text-center">Browse and look at status of Omdev developers</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Dashboard);
