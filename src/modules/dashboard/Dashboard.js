import React, { Component } from 'react';
// import DashboardModel from './Model/DashboardModel.js';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Dashboard"
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="dashboard-page container">
        <header className="page-header">
					<div className="d-flex align-items-center">
						<div className="mr-auto">
							<h1>{this.state.title}</h1>
						</div>
					</div>
				</header>
        <section className="page-content">
        <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="row m-0 col-border-xl">
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card-body">
                  <div className="icon-rounded icon-rounded-primary float-left m-r-20">
                    <i className="icon dripicons-graph-bar"></i>
                  </div>
                  <h5 className="card-title m-b-5 counter" data-count="5627">5,627</h5>
                  <h6 className="text-muted m-t-10">
                    Active Sessions
											</h6>
                  <div className="progress progress-active-sessions mt-4">
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small className="text-muted float-right m-t-5 mb-3 counter append-percent" data-count="72">72</small>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card-body">
                  <div className="icon-rounded icon-rounded-accent float-left m-r-20">
                    <i className="la la-calendar"></i>
                  </div>
                  <h5 className="card-title m-b-5 counter" data-count="123">123</h5>
                  <h6 className="text-muted m-t-10">Appointment Bookings</h6>
                  <div className="progress progress-add-to-cart mt-4">
                    <div className="progress-bar bg-accent" role="progressbar" style={{width: "67%"}} aria-valuenow="123" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small className="text-muted float-right m-t-5 mb-3 counter" data-count="123">123</small>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card-body">
                  <div className="icon-rounded icon-rounded-info float-left m-r-20">
                    <i className="icon dripicons-mail"></i>
                  </div>
                  <h5 className="card-title m-b-5 counter" data-count="337">337</h5>
                  <h6 className="text-muted m-t-10">
                    Newsletter Sign Ups
											</h6>
                  <div className="progress progress-new-account mt-4">
                    <div className="progress-bar bg-info" role="progressbar" style={{width: "83%"}} aria-valuenow="83" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small className="text-muted float-right m-t-5 mb-3 counter append-percent" data-count="83">83</small>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-3">
                <div className="card-body">
                  <div className="icon-rounded icon-rounded-success float-left m-r-20">
                    <i className="la la-dollar f-w-600"></i>
                  </div>
                  <h5 className="card-title m-b-5 prepend-currency counter" data-count="37873">37,873</h5>
                  <h6 className="text-muted m-t-10">
                    Total Revenue
											</h6>
                  <div className="progress progress-total-revenue mt-4" >
                    <div className="progress-bar bg-success" role="progressbar" style={{width: "77%"}} aria-valuenow="77" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small className="text-muted float-right m-t-5 mb-3 counter append-percent" data-count="77">77</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="row">
						<div class="col-xl-7 col-xxl-9">
							<div class="card">
								<h5 class="card-header">
									Monthly budget
								</h5>
								<div class="card-body">
									<div id="monthly-budget">
										</div>
								</div>
							</div>
						</div>
						<div class="col-xl-5 col-xxl-3">
							<div class="card">
								<h5 class="card-header">Audit Log
									<div class="actions top-right">
										<div class="dropdown">
											<a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<i class="la la-ellipsis-h"></i>
											</a>
											<div class="dropdown-menu dropdown-menu-right animation" aria-labelledby="dropdownMenuLink">
												<a class="dropdown-item" href="#">Action</a>
												<a class="dropdown-item" href="#">Another action</a>
												<a class="dropdown-item" href="#">Something else here</a>
											</div>
										</div>
									</div>
								</h5>
								<div class="card-body">
									<div class="timeline timeline-border">
										<div class="timeline-list">
											<div class="timeline-info">
												<div class="d-inline-block">Server pending</div>
												<small class="float-right text-muted">Now</small>
											</div>
										</div>
										<div class="timeline-list timeline-border timeline-primary">
											<div class="timeline-info">
												<div class="d-inline-block">Delivery complete</div>
												<small class="float-right text-muted">10min.</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-accent">
											<div class="timeline-info">
												<div class="d-inline-block">Delivery processing</div>
												<small class="float-right text-muted">1hr.</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-success">
											<div class="timeline-info">
												<div class="d-inline-block">Payment recorded</div>
												<small class="float-right text-muted">11:22am</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-warning">
											<div class="timeline-info">
												<div class="d-inline-block">Order complete</div>
												<small class="float-right text-muted">9:30AM</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-info">
											<div class="timeline-info">
												<div class="d-inline-block">Product quantities updated</div>
												<small class="float-right text-muted">9:27am</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-info">
											<div class="timeline-info">
												<div class="d-inline-block">Ticket #627 Closed</div>
												<small class="float-right text-muted">8:02am</small>
											</div>
										</div>
										<div class="timeline-list  timeline-border timeline-info">
											<div class="timeline-info">
												<div class="d-inline-block">Cache cleared</div>
												<small class="float-right text-muted">6:00am</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
