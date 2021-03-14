import React, { Component } from 'react';
import { toast } from 'react-toastify';
import VesselModel from './VesselModel';
import config from '../../config/config';
import { Link } from 'react-router-dom';

class VesselDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      vessel: {},
      loading: false,
    }
  }

  componentDidMount() {
    let tokens = window.location.href.split('/');;
    let id = tokens[4];
    if (id) {
        VesselModel.get(id).then((res) => {
        this.setState({
            vessel: res.data
        })
      }).catch((error) => {
        toast('Fail to retrieve vessel.', { type: toast.TYPE.ERROR });
      })
    }
  }

  render() {
    return (
      <div className="p-20 product-edit-page">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h5 className="card-header">
                <div className="form-actions">
                  <div className="row">
                    <div className="col-6 my-auto">Vessel Details</div>
                  </div>
                </div>
              </h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="m-b-10 row">
                      <div className="col-4"> Full Name: </div>
                      <div className="col-8"> {this.state.vessel.fullVslM}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Short Name: </div>
                      <div className="col-8"> {this.state.vessel.abbrVslM}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Incoming Voyage: </div>
                      <div className="col-8"> {this.state.vessel.inVoyN}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Outgoing Voyage: </div>
                      <div className="col-8"> {this.state.vessel.outVoyN}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="m-b-10 row">
                      <div className="col-4"> Berth Time Required: </div>
                      <div className="col-8"> {this.state.vessel.btrDt}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Expected Departure Time: </div>
                      <div className="col-8"> {this.state.vessel.unbthgDt}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Berth Number: </div>
                      <div className="col-8"> {this.state.vessel.berthN}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-4"> Status: </div>
                      <div className="col-8"> {this.state.vessel.status}</div>
                    </div>
                  </div>
                </div>
                <hr/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VesselDetail;
