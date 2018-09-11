import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextAreaFieldGroup';
import SelectListGroup from './../common/SelectListGroup';
import InputGroup from './../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			project: '',
			location: '',
			status: '',
			skills: '',
			youtube: '',
			linkedin: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			project: this.state.project,
			location: this.state.location,
			status: this.state.status,
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
				label: '*Select Profession Status',
				value: 0
			},
			{
				label: 'UI developer',
				value: 'UI developer'
			},
			{
				label: 'Backend developer',
				value: 'Backend developer'
			},
			{
				label: 'Tester',
				value: 'Tester'
			}
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your profile</h1>
							<p className="lead text-center">Let's get some information to create your profile</p>
							<small className="d-block pb-3">* required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="Unique handle for your profile"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Select your profile status"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="Your current location"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values(eg HTML, CSS, JS"
								/>
								<TextAreaFieldGroup
									placeholder="Project"
									name="project"
									value={this.state.project}
									onChange={this.onChange}
									error={errors.project}
									info="Your current project"
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
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
