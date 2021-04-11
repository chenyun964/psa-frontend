import React, { Component } from 'react';
// import DashboardModel from './Model/DashboardModel.js';
import LoginModel from '../authentication/LoginModel';
import VesselModel from '../vessel/VesselModel';
import Table from '../vessel/VesselTable';
import Preloader from '../../libs/Preloader';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "Dashboard",
			vessels: [],
			berthingNum: 0,
			alongSideNum: 0,
			unberthNum: 0,
			isLoading: false
		}
	}

	componentDidMount() {
		this.getVessel();
	}

	getVessel() {
		this.setState({
			isLoading: true
		})
		let username = LoginModel.getUserName();
		VesselModel.getToday(username).then((res) => {
			let a = 0;
			let b = 0;
			let c = 0;
			res.data.forEach(async function (v) {
				if (v.status == "BERTHING") {
					a++;
				} else if (v.status == "ALONGSIDE") {
					b++;
				} else if (v.status == "UNBERTH") {
					c++;
				}
			})
			this.setState({
				vessels: res.data,
				berthingNum: a,
				alongSideNum: b,
				unberthNum: c,
				isLoading: false
			})
		}).catch((error) => {
			this.setState({
				isLoading: false
			})
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
						{this.state.isLoading &&
							<Preloader />
						}
						{!this.state.isLoading &&

							<section className="page-content">
								<div className="row">
									<div className="col-xl-8 col-xxl-9">
										<div className="card">
											<h5 className="card-header">Vessel For the day</h5>
											<div className="card-body">
												<div id="monthly-budget">
													{this.state.vessels.length == 0 &&
														<div className="m-t-10 text-center m-b-10" > No Vessel For Today </div>
													}
													<Table data={this.state.vessels} />
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-xxl-3">
										<div className="card">
											<h5 className="card-header">Overall Status</h5>
											<div className="card-body">
												<div className="row">
													<div class="col-md-12">
														<div class="card-body">
															<div class="icon-rounded icon-rounded-info float-left m-r-20">
																<i class="icon dripicons-graph-bar"></i>
															</div>
															<h5 class="card-title m-b-5 counter">{this.state.berthingNum}</h5>
															<h6 class="text-muted m-t-10">Berthing</h6>
														</div>
													</div>
													<div class="col-md-12">
														<div class="card-body">
															<div class="icon-rounded icon-rounded-warning float-left m-r-20">
																<i class="icon dripicons-graph-bar"></i>
															</div>
															<h5 class="card-title m-b-5 counter">{this.state.alongSideNum}</h5>
															<h6 class="text-muted m-t-10">Alongside</h6>
														</div>
													</div>
													<div class="col-md-12">
														<div class="card-body">
															<div class="icon-rounded icon-rounded-success float-left m-r-20">
																<i class="icon dripicons-graph-bar"></i>
															</div>
															<h5 class="card-title m-b-5 counter">{this.state.unberthNum}</h5>
															<h6 class="text-muted m-t-10">Unberthing</h6>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
