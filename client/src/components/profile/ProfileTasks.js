import React, { Component } from 'react';
import MOment from 'react-moment';
import Moment from 'react-moment';

class ProfileTasks extends Component {
	render() {
		const { tasks } = this.props;

		const taskItems = tasks.map((task) => (
			<li key={task._id} className="list-group-item">
				<h4>{task.name}</h4>
				<p>
					<Moment format="YYYY/MM/DD">{task.from}</Moment> -
					{task.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{task.to}</Moment>}
				</p>
				<p>
					{task.details === '' ? null : (
						<span>
							<strong>Details:</strong>
							{task.details}
						</span>
					)}
				</p>
				<p>
					{task.application === '' ? null : (
						<span>
							<strong>Application:</strong>
							{task.application}
						</span>
					)}
				</p>
				<p>
					{task.dependencies === '' ? null : (
						<span>
							<strong>Dependencies:</strong>
							{task.dependencies}
						</span>
					)}
				</p>
			</li>
		));
		return (
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-center text-info">Tasks</h3>
					{taskItems.length > 0 ? (
						<ul className="list-group">{taskItems}</ul>
					) : (
						<p className="text-center">No tasks listed</p>
					)}
				</div>
			</div>
		);
	}
}

export default ProfileTasks;
