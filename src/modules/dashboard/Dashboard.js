import React, { Component } from 'react';
// import DashboardModel from './Model/DashboardModel.js';
import LoginModel from '../authentication/LoginModel';
import NotificationModel from '../notification/NotificationModel';
import VesselModel from '../vessel/VesselModel';
import Table from '../vessel/VesselTable';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "Dashboard",
			notifications: [],
			favourites: [],

			vessels: []
		}
	}

	componentDidMount() {
		this.getFavourite();
	}

	getFavourite() {
		let username = LoginModel.getUserName();
		VesselModel.getToday(username).then((res) => {
			this.setState({vessels: res.data})
		}).catch((error) => {
			console.log(error);
		});
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
						<header className="page-header p-t-10">
							<div className="d-flex align-items-center">
								<div className="mr-auto">
									<h1>{this.state.title}</h1>
								</div>
							</div>
						</header>
						<section className="page-content">
							<div className="row">
								<div className="col-xl-8 col-xxl-9">
									<div className="card">
										<h5 className="card-header">Vessel For the day</h5>
										<div className="card-body">
											<div id="monthly-budget">
												{this.state.favourites.length == 0 &&
													<div>  </div>
												}
												<Table data={this.state.vessels} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-xxl-3">
									<div className="card">
										<h5 className="card-header">Favourites</h5>
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
													<div> You have yet to favourite any vessel </div>
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
