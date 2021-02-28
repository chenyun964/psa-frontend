import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';

class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Switch>
          <Route exact path="/" component={} />
      </Switch>
    );
  }
}

export default AllRoutes;