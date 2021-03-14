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
        </section>
      </div>
    );
  }
}

export default Dashboard;
