import React, { Component } from 'react';
import LoginModel from '../authentication/LoginModel';
import NotificationModel from '../notification/NotificationModel';
import { Link } from "react-router-dom";

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			notifications: [],
		}
	}

	componentDidMount() {
		let username = LoginModel.getUserName();
		this.setState({
			username: username,
			email: LoginModel.getUserEmail()
		})
		NotificationModel.list(username).then((res) => {
			console.log(res.data);
			this.setState({ notifications: res.data });
		}).catch((error) => {
			console.log(error);
		});
	}

	signout() {
		LoginModel.destory().then(() => {
			window.location.replace('/login');
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
											<li className="nav-item dropdown dropdown-notifications dropdown-menu-lg">
												<a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i className="icon dripicons-bell"></i>
												</a>
												<div className="dropdown-menu dropdown-menu-right">
													<div className="card card-notification">
														<div className="card-header">
															<h5 className="card-title">Notifications</h5>
														</div>
														<div className="card-body">
															<div className="card-container-wrapper">
																<div className="card-container">
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
