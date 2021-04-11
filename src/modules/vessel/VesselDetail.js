import React, { Component } from 'react';
import { toast } from 'react-toastify';
import VesselModel from './VesselModel';
import VesselHistory from './VesselHistory';
import LoginModel from './../authentication/LoginModel';
import FavrouiteModel from './../favourite/FavouriteModel';

class VesselDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      vessel: {},
      loading: false,

      favouriteId: null,
      isFavourite: false,
    }
  }

  componentDidMount() {
    let tokens = window.location.href.split('/');;
    let id = tokens[4];
    let username = LoginModel.getUserName();
    if (id && username) {
      VesselModel.get(username, id).then((res) => {
        this.setState({
          vessel: res.data
        })

        if(res.data.favouriteId){
          this.setState({
            favouriteId: res.data.favouriteId,
            isFavourite: true
          })
        }
      }).catch((error) => {
        toast('Fail to retrieve vessel.', { type: toast.TYPE.ERROR });
      })
    }
  }

  addFavourite() {
    let username = LoginModel.getUserName();
    let data = {
      username: username,
      vsId: this.state.vessel.id
    }

    FavrouiteModel.add(data).then((res) => {
      this.setState({
        favouriteId: res.data,
        isFavourite: true
      })
    }).catch((error) => {
      toast('Fail to favourite vessel.', { type: toast.TYPE.ERROR });
    })
  }

  removeFavourite() {
    FavrouiteModel.remove(this.state.favouriteId).then((res) => {
      this.setState({
        favouriteId: null,
        isFavourite: false
      })
    }).catch((error) => {
      toast('Fail to remove favourite.', { type: toast.TYPE.ERROR });
    })
  }

  render() {
    return (
      <div className="p-20 vessel-info-page">
        <div className="row content">
          <div className="col-md-12">
            <div className="card">
              <h5 className="card-header">
                <div className="form-actions">
                  <div className="row">
                    <div className="col-6 my-auto">Vessel Details</div>
                    <div className="col-6">
                      <div class="nav nav-pills nav-pills-primary float-right">
                        {!this.state.isFavourite &&
                          <button class="btn btn-light" onClick={() => this.addFavourite()}>
                            <i class="la la-star-o"></i>
                            <span>Favourite</span>
                          </button>
                        }
                        {this.state.isFavourite &&
                          <button class="btn btn-danger favourited" onClick={() => this.removeFavourite()}>
                            <i class="la la-star"></i>
                            <span>Favourited</span>
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </h5>
              <div className="card-body vessel-info-section">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="m-b-10 row">
                      <div className="col-5"> Full Name: </div>
                      <div className="col-7"> {this.state.vessel.fullVslM}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Short Name: </div>
                      <div className="col-7"> {this.state.vessel.abbrVslM}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Incoming Voyage: </div>
                      <div className="col-7"> {this.state.vessel.inVoyN}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Outgoing Voyage: </div>
                      <div className="col-7"> {this.state.vessel.outVoyN}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="m-b-10 row">
                      <div className="col-5"> Berth Time Required: </div>
                      <div className="col-7"> {this.state.vessel.bthgDt}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Expected Departure Time: </div>
                      <div className="col-7"> {this.state.vessel.unbthgDt}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Berth Number: </div>
                      <div className="col-7"> {this.state.vessel.berthN == null ? '-' : this.state.vessel.berthN}</div>
                    </div>
                    <div className="m-b-10 row">
                      <div className="col-5"> Status: </div>
                      <div className="col-7"> {this.state.vessel.status}</div>
                    </div>
                  </div>
                </div>
                <hr />
                {this.state.vessel.vesselInfo != null && 
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="m-b-10 row">
                        <div className="col-12">
                          <small>Last Updated at: {this.state.vessel.vesselInfo.update_at}</small>
                        </div>
                      </div>
                      <div className="m-b-10 row">
                        <div className="col-5"> Average Speed: </div>
                        <div className="col-7"> {this.state.vessel.vesselInfo.avg_speed + ' km/h'}</div>
                      </div>
                      <div className="m-b-10 row">
                        <div className="col-5"> Distance to go: </div>
                        <div className="col-7"> {this.state.vessel.vesselInfo.distance_to_go + ' km'}</div>
                      </div>
                      <div className="m-b-10 row">
                        <div className="col-5"> Maximum Speed: </div>
                        <div className="col-7"> {this.state.vessel.vesselInfo.max_speed + ' km/h'}</div>
                      </div>
                      <div className="m-b-10 row">
                        <div className="col-5"> Predicted berthing time: </div>
                        <div className="col-7"> 
                          {this.state.vessel.vesselInfo.is_patching_activated == 1 ? this.state.vessel.vesselInfo.patching_Predicted_Btr : this.state.vessel.vesselInfo.predicted_btr}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <VesselHistory data={this.state.vessel.speedHistory}/>
                    </div>
                  </div>
                }
                {this.state.vessel.vesselInfo == null && 
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="m-b-10 row">
                        <div className="col-12">
                          <p>No record at the moment, try again later.</p>
                        </div>
                      </div>
                    </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VesselDetail;
