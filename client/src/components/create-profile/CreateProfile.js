import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './../common/TextFieldGroup';
import SelectListGroup from './../common/SelectListGroup';
import InputGroup from './../common/InputGroup';
import { createProfile } from '../../actions/profileActions';
import { getTeams } from '../../actions/teamActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			firstName: '',
			lastName: '',
			location: '',
			jobRole: '',
			teamId: '',
			skills: '',
			youtube: '',
			linkedin: '',
			errors: {}
		};
	}
	//TODO:change to willMount
	componentDidMount() {
		this.props.getTeams();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const profileData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			location: this.state.location,
			teamId: this.state.teamId,
			jobRole: this.state.jobRole,
			skills: this.state.skills,
			youtube: this.state.youtube,
			linkedin: this.state.linkedin
		};

		this.props.createProfile(profileData, this.props.history);
	};

	changeDisplaySocialInputsFlag = () => {
		this.setState((prevState) => ({
			displaySocialInputs: !prevState.displaySocialInputs
		}));
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors, displaySocialInputs } = this.state;
		//Creating options for status
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="LinkedIn URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedIn}
					/>
					<InputGroup
						placeholder="YouTube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
				</div>
			);
		}

		const options = [
			{
				name: '*Select Job Role',
				value: 0
			},
			{
				name: 'UI developer',
				value: '1'
			},
			{
				name: 'Backend developer',
				value: '2'
			},
			{
				name: 'QA',
				value: '3'
			}
		];
		let teamControl;
		let { teams } = this.props.teams;
		if (teams === null) {
			teamControl =
				<TextFieldGroup
					placeholder="Team Name"
					name="teamId"
					value={this.state.teamId}
					onChange={this.onChange}
					error={errors.location}
					info="Team Id"
				/>
		} else {
			if (teams.length > 0) {
				teamControl = <SelectListGroup
					placeholder="Team"
					name="teamId"
					value={this.state.teamId}
					onChange={this.onChange}
					options={teams}
					error={errors.status}
					info="Team Name"
				/>
			}
		}
		// if (this.props.teams) {
		// 	teams = this.props.teams;
		// }
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your profile</h1>
							<p className="lead text-center">Let's get some information to create your profile</p>
							{/* <small className="d-block pb-3">* required fields</small> */}
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="First Name"
									name="firstName"
									value={this.state.firstName}
									onChange={this.onChange}
									error={errors.location}
									info="First Name"
								/>
								<TextFieldGroup
									placeholder="Last Name"
									name="lastName"
									value={this.state.lastName}
									onChange={this.onChange}
									error={errors.location}
									info="Last Name"
								/>
								<SelectListGroup
									placeholder="Role"
									name="jobRole"
									value={this.state.jobRole}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Job Role"
								/>
								{teamControl}
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="Current location"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Comma separated values(eg HTML, CSS, JS)"
								/>
								<div className="mb-3">
									<button
										className="btn btn-light"
										onClick={this.changeDisplaySocialInputsFlag}
										type="button"
									>
										Add Social Network links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	teams: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
	teams: state.team
});

export default connect(mapStateToProps, { createProfile, getTeams })(withRouter(CreateProfile));
