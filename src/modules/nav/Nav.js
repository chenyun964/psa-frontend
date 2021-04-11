import React, { Component } from 'react';
import LoginModel from '../authentication/LoginModel';
import FavouriteModel from '../favourite/FavouriteModel';
import NotificationModel from '../notification/NotificationModel';
import { Link } from "react-router-dom";

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			notifications: [],
			uncheckNum: 0,
			favourites: []
		}
	}

	componentDidMount() {
		let username = LoginModel.getUserName();
		this.setState({
			username: username,
			email: LoginModel.getUserEmail()
		})
		this.listNotification();
		this.listFavourite();
	}

	listNotification() {
		let username = LoginModel.getUserName();
		NotificationModel.list(username).then((res) => {
			let count = 0;
			res.data.forEach(async function (notfi) {
				if (!notfi.checked) {
					count++;
				}
			})
			this.setState({
				notifications: res.data,
				uncheckNum: count
			});
		}).catch((error) => {

		});
	}

	listFavourite() {
		let username = LoginModel.getUserName();
		FavouriteModel.list(username).then((res) => {
			this.setState({
				favourites: res.data,
			});
		}).catch((error) => {

		});
	}

	signout() {
		LoginModel.destory().then(() => {
			window.location.replace('/login');
		});
	}

	handleUncheck() {
		let username = LoginModel.getUserName();
		NotificationModel.checkAll(username).then((res) => {
			this.listNotification();
		}).catch((error) => {

		});
	}

	handleClear() {
		let username = LoginModel.getUserName();
		FavouriteModel.removeAll(username).then((res) => {
			this.listFavourite();
		}).catch((error) => {

		});
	}

	handleClearNotifi() {
		let username = LoginModel.getUserName();
		NotificationModel.clear(username).then((res) => {
			this.listNotification();
		}).catch((error) => {

		});
	}

	render() {
		return (
			<div className="header-wrapper">
				<div className="header-top">
					<ul className="mobile-only navbar-nav nav-left">
						<li className="nav-item">
							<a data-toggle-state="aside-left-open">
								<i className="icon dripicons-align-left"></i>
							</a>
						</li>
					</ul>
					<div className="container">
						<div className="row">
							<div className="col-sm-12 col-lg-6">
								<ul className="site-logo">
									<li>
										<Link to="/">
											<img src="../assets/img/PSA_Logo_White.png" width="160px" alt="PSA Logo" />
										</Link>
									</li>
								</ul>
							</div>
							<div className="col-lg-6">
								<div className="top-toolbar-wrapper">
									<nav className="top-toolbar navbar flex-nowrap">
										<ul className="navbar-nav nav-right">
											<li className="nav-item dropdown dropdown-notifications dropdown-menu-lg" onClick={() => this.listFavourite()}>
												<a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i className="icon dripicons-heart"></i>
												</a>
												<div className="dropdown-menu dropdown-menu-right">
													<div className="card card-notification">
														<div className="card-header">
															<h5 className="card-title">My Favourite</h5>
															<ul className="actions top-right">
																<li>
																	<button className="btn list-clear-btn" onClick={() => this.handleClear()}>clear</button>
																</li>
															</ul>
														</div>
														<div className="p-t-0 card-body">
															<div className="card-container-wrapper">
																<div className="p-t-0 card-container">
																	<div className="timeline">
																		{this.state.favourites.length > 0 && this.state.favourites.map((fav, index) => {
																			return (
																				<div className="m-t-15 m-b-15" key={index} onClick={() => window.location.replace('/vessel/' + fav.vesselSch.id)}>
																					<div className="timeline-info">
																						<div className="row">
																							<div className="col-8 p-r-5 p-l-10">
																								<span><strong>Vessel:</strong>{fav.vesselSch.fullVslM}</span>
																								<br/>
																								<span><strong>Voyage:</strong> {fav.vesselSch.fullInvoyN}</span>
																							</div>
																							<div className="col-3 p-l-5 p-r-5">
																								{fav.vesselSch.status == "BERTHING" &&
																									<span className="badge badge-pill badge-info">BERTHING</span>
																								}
																								{fav.vesselSch.status == "ALONGSIDE" &&
																									<span className="badge badge-pill badge-warning">ALONGSIDE</span>
																								}
																								{fav.vesselSch.status == "UNBERTHED" &&
																									<span className="badge badge-pill badge-success">UNBERTHED</span>
																								}
																							</div>
																						</div>
																					</div>
																				</div>
																			)
																		})}
																		{this.state.favourites.length == 0 &&
																			<div className="m-t-15 m-b-15"> You have yet to favourite any vessel </div>
																		}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</li>
											<li className="nav-item dropdown dropdown-notifications dropdown-menu-lg" onClick={() => this.handleUncheck()}>
												<a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i className="icon dripicons-bell">
														{this.state.uncheckNum > 0 &&
															<span class="badge badge-danger badge-circle notification-uncheck-num">{this.state.uncheckNum}</span>
														}
													</i>

												</a>
												<div className="dropdown-menu dropdown-menu-right">
													<div className="card card-notification">
														<div className="card-header">
															<h5 className="card-title">Notifications</h5>
															<ul className="actions top-right">
																<li>
																	<button className="btn list-clear-btn" onClick={() => this.handleClearNotifi()}>clear</button>
																</li>
															</ul>
														</div>
														<div className="p-t-0 card-body">
															<div className="card-container-wrapper">
																<div className="p-t-0 card-container">
																	<div className="timeline">
																		{this.state.notifications.length > 0 && this.state.notifications.map((notifi, index) => {
																			return (
																				<div className={"timeline-list" + (notifi.checked ? "" : " timeline-accent")} key={index} onClick={() => window.location.replace('/vessel/' + notifi.vesselSchedule_id)}>
																					<div className="timeline-info">
																						<div>{notifi.content}</div>
																						<small className="text-muted">{notifi.create_at}</small>
																					</div>
																				</div>
																			)
																		})}
																		{this.state.notifications.length == 0 &&
																			<div className="m-t-15 m-b-15"> No Notification at the moment </div>
																		}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</li>
											<li className="nav-item dropdown dropdown-menu-lg">
												<a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i className="icon dripicons-user"></i>
												</a>
												<div className="dropdown-menu dropdown-menu-right dropdown-menu-accout">
													<div className="dropdown-header pb-3">
														<div className="media d-user">
															<div className="media-body">
																<h5 className="mt-0 mb-0">{this.state.username}</h5>
																<span>{this.state.email}</span>
															</div>
														</div>
													</div>
													<a className="dropdown-item" href="/setting"><i className="icon dripicons-gear"></i> Account Settings </a>
													<button className="dropdown-item" onClick={() => this.signout()}><i className="icon dripicons-lock-open"></i> Sign Out</button>
												</div>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
					<ul className="mobile-only navbar-nav nav-right">
						<li className="nav-item">
							<a data-toggle-state="mobile-topbar-toggle">
								<i className="icon dripicons-dots-3 rotate-90"></i>
							</a>
						</li>
					</ul>
				</div>
				<div className="header-bottom">
					<div className="container">
						<nav className="main-menu">
							<ul className="nav metismenu">
								<li className="sidebar-header mobile-only"><Link to="/dashboard"><span>NAVIGATION</span></Link></li>
								<li>
									<Link to="/dashboard"><i className="icon dripicons-meter"></i><span className="hide-menu">Dashboard</span></Link>
								</li>
								<li>
									<Link to="/vessel"><i className="la la-ship"></i><span className="hide-menu">Vessel</span></Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
