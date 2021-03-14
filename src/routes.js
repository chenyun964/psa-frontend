import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';

import CheckLogin from './modules/authentication/CheckLogin';
import Nav from './modules/nav/Nav';

import Login from './modules/authentication/Login';
import Dashboard from './modules/dashboard/Dashboard';

import Vessel from './modules/vessel/Vessel';

class GuestRoutes extends Component {

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </Fragment>
    );
  }
}

class LoginRoutes extends Component {

  componentDidMount() {
    CheckLogin.isLogin();
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <div className="content-wrapper">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/vessel' component={Vessel} />
            </Switch>
          </div>
      </Fragment >
    );
  }
}


class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    }
  }

  componentDidMount() {
    var checkLogin = CheckLogin.isLoginWithReturn();
    if (checkLogin) {
      this.setState({ loginStatus: true });
    }
  }

  render() {
    return (
      <Switch>
        {!this.state.loginStatus &&
          <Route exact path="/" component={Login} />
        }
        <Route exact path="/(login)" component={GuestRoutes} />
        <Route component={LoginRoutes} />
      </Switch>
    );
  }
}

export default AllRoutes;