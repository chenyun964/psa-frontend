import React, { Component } from 'react';
// import DashboardModel from './Model/DashboardModel.js';
import LoginModel from '../authentication/LoginModel';
import NotificationModel from '../notification/NotificationModel';
import VesselModel from '../vessel/VesselModel';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "Dashboard",
			notifications: [],
			favourites: []
		}
	}

	componentDidMount() {
		this.getNotification()
	}

	getFavourite() {
		console.log(1);
	}

	getNotification() {
		let username = LoginModel.getUserName();
		NotificationModel.list(username).then((res) => {
			console.log(res.data);
			this.setState({ notifications: res.data });
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="dashboard-page container">
				<div className="row">
					<div className="col-12 content">
						<header className="page-header">
							<div className="d-flex align-items-center">
								<div className="mr-auto">
									<h1>{this.state.title}</h1>
								</div>
							</div>
						</header>
						<section className="page-content">
							<div className="row">
								<div className="col-xl-7 col-xxl-9">
									<div className="card">
										<h5 className="card-header">Favourited Vessel</h5>
										<div className="card-body">
											<div id="monthly-budget">
												{this.state.favourites.length == 0 &&
													<div> You have yet to favourite any vessel </div>
												}
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3">
									<div className="card">
										<h5 className="card-header">Notifications</h5>
										<div className="card-body">
											<div className="timeline">
												{this.state.notifications.length > 0 && this.state.notifications.map((notifi, index) => {
													return (
														<div className={"timeline-list" + (notifi.checked ? "" : " timeline-accent")} key={index}>
															<div className="timeline-info">
																<div>{notifi.content}</div>
																<small className="text-muted">{notifi.create_at}</small>
															</div>
														</div>
													)
												})}
												{this.state.notifications.length == 0 &&
													<div> No Notification at the moment </div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
