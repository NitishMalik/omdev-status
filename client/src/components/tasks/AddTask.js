import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addTask, getCurrentProfile } from "../../actions/profileActions";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      project: "",
      app: "",
      details: "",
      from: "",
      to: "",
      current: "",
      dependencies: "",
      disabled: false,
      pid: "",
      errors: {}
    };
  }
  //   componentDidMount() {
  //     this.props.getCurrentProfile();
  //   }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("Inside will receive");
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const taskData = {
      taskName: this.state.taskName,
      project: this.state.project,
      app: this.state.app,
      details: this.state.details,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      dependencies: this.state.dependencies,
      pid: this.state.pid
    };
    console.log(this.props);
    console.log(this.state);
    this.props.addTask(taskData, this.props.history);
  };

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const { errors } = this.state;
    console.log(this.props);
    return (
      <div className="add-tasks">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {/* <Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link> */}
              <h1 className="display-4 text-center">Add Tasks</h1>
              <p className="lead text-center">Task details</p>
              {/* <small className="d-block pb-3">* required fields</small> */}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Task Name"
                  name="taskName"
                  value={this.state.taskName}
                  onChange={this.onChange}
                  error={errors.taskName}
                  info="Name your task"
                />
                <TextFieldGroup
                  placeholder="Project"
                  name="project"
                  value={this.state.project}
                  onChange={this.onChange}
                  error={errors.project}
                  info="Project Name"
                />

                <TextFieldGroup
                  placeholder="Application"
                  name="app"
                  value={this.state.app}
                  onChange={this.onChange}
                  error={errors.app}
                  info="Application name"
                />
                <TextAreaFieldGroup
                  placeholder="Details"
                  name="details"
                  value={this.state.details}
                  onChange={this.onChange}
                  error={errors.details}
                  info="Details of the task"
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="From"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  info="Start date of the task"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  info="End of the task"
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Task
                  </label>
                </div>
                <TextFieldGroup
                  placeholder="Dependencies"
                  name="dependencies"
                  value={this.state.dependencies}
                  onChange={this.onChange}
                  error={errors.dependencies}
                  info="Dependencies if any"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTask, getCurrentProfile }
)(withRouter(AddTask));
