import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';

class ProfileCarouselItem extends Component{
    render() {
        const { profile } = this.props;

        return (
			<div data-profileid={profile._id} className="profile-carousel-item">
				<label>{profile.user.name}</label>
			</div>
        );
    }
};

class ProfileCarousel extends Component {
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
				profileItems = profiles.map((profile) => <ProfileCarouselItem key={profile._id} profile={profile} />);
			} else {
				profileItems = <h4>No profiles found..</h4>;
			}
		}
		return (
			<div className="profile-carousel">
                {profiles && profiles.length > 1 &&
                	<div className="profile-prev profile-nav-icons">
                    	<span className="carousel-control-prev-icon"></span>
                    </div>
                }
				<div className="row">
					{profileItems}
				</div>
                {profiles && profiles.length > 1 &&
					<div className="profile-prev profile-nav-icons">
						<span className="carousel-control-next-icon"></span>
					</div>
                }
			</div>
		);
	}
}

ProfileCarousel.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(ProfileCarousel);
