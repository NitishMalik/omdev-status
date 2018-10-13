import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteTask } from "../../actions/profileActions";

class Task extends Component {
  onDeleteTask = id => {
    this.props.deleteTask(id);
  };

  render() {
    let taskRows;
    if (this.props.task) {
      taskRows = this.props.task.map(item => (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.application}</td>
          <td>
            <Moment format="YYYY/MM/DD">{item.from}</Moment>-
            {item.to == null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{item.to}</Moment>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.onDeleteTask(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      taskRows = <p>Add tasks</p>;
    }

    return (
      <div>
        <h4 className="mb-4">Task details</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Application</th>
              <th>Duration</th>
              <th />
            </tr>
            {taskRows}
          </thead>
        </table>
      </div>
    );
  }
}
Task.propTypes = {
  deleteTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTask }
)(Task);
