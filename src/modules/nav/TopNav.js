import React, { Component } from 'react';
import LoginModel from '../authentication/LoginModel';

class TopNavBar extends Component {

	signout() {
		LoginModel.destory().then(() => {
			window.location.replace('/login');
		});
	}

	render() {
		return (
			<div className="topbar-wrapper">
				<nav className="top-toolbar navbar navbar-mobile navbar-tablet">
					<ul className="navbar-nav nav-left">
						<li className="nav-item">
							<a data-toggle-state="aside-left-open">
								<i className="icon dripicons-align-left"></i>
							</a>
						</li>
					</ul>
					<ul className="navbar-nav nav-center site-logo">
						<li>
							<a href="/">
								<span className="brand-text brand-text-center-mobile">Eyeviser</span>
							</a>
						</li>
					</ul>
					<ul className="navbar-nav nav-right">
						<li className="nav-item">
							<a href="javascript:void(0)" data-toggle-state="mobile-topbar-toggle">
								<i className="icon dripicons-dots-3 rotate-90"></i>
							</a>
						</li>
					</ul>
				</nav>
				<nav className="top-toolbar navbar navbar-desktop flex-nowrap">
					<ul className="navbar-nav nav-right">
						<li className="nav-item dropdown dropdown-notifications dropdown-menu-lg">
							<a href="javascript:void(0)" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
												<div className="timeline timeline-border">
													<div className="timeline-list">
														<div className="timeline-info">
															<div>Prep for bi-weekly meeting with <a href="javascript:void(0)"><strong>Steven Weinberg</strong></a> </div>
															<small className="text-muted">07/05/18, 2:00 PM</small>
														</div>
													</div>
													<div className="timeline-list timeline-border timeline-primary">
														<div className="timeline-info">
															<div>Skype call with development team</div>
															<small className="text-muted">07/07/18, 1:00 PM</small>
														</div>
													</div>
													<div className="timeline-list  timeline-border timeline-accent">
														<div className="timeline-info">
															<div>Programming control system</div>
															<small className="text-muted">07/09/18, 10:00 AM - 6:00 PM</small>
														</div>
													</div>
													<div className="timeline-list  timeline-border timeline-success">
														<div className="timeline-info">
															<div>Lunch with Peter Higgs</div>
															<small className="text-muted">07/10/18, 12:00 PM</small>
														</div>
													</div>
													<div className="timeline-list  timeline-border timeline-warning">
														<div className="timeline-info">
															<div><a href="javascript:void(0)"><strong>Approve Request</strong></a> for new training material by</div>
															<small className="text-muted">07/11/18, 9:00 AM</small>
														</div>
													</div>
													<div className="timeline-list  timeline-border timeline-info">
														<div className="timeline-info">
															<div><a href="javascript:void(0)"><strong>RSVP</strong></a> for this year's hackathon.</div>
															<small className="text-muted">07/11/18, 1:30 PM</small>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a href="javascript:void(0)" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								<i className="icon dripicons-user"></i>
							</a>
							<div className="dropdown-menu dropdown-menu-right dropdown-menu-accout">
								<div className="dropdown-header pb-3">
									<div className="media d-user">
										<div className="media-body">
											<h5 className="mt-0 mb-0">Chen Yun</h5>
											<span>chenyun964@gmail.com</span>
										</div>
									</div>
								</div>
								<button className="dropdown-item btn" onClick={() => this.signout()}><i className="icon dripicons-lock-open"></i>Sign Out</button>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

export default TopNavBar;
