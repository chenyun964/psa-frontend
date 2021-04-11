import React, { Component } from 'react';
import VesselModel from './VesselModel';
import LoginModel from './../authentication/LoginModel';
import { toast } from 'react-toastify';
import Table from './VesselTable';
import Preloader from '../../libs/Preloader';

class Vessel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Vessel",
            vessels: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getList();
    }

    goDetails(id) {
        this.props.history.push('/vessel/' + id);
    }

    getList() {
        let username = LoginModel.getUserName();
        VesselModel.list(username).then((res) => {
            this.setState({
                isLoading: false,
                vessels: res.data
            });
        }).catch((error) => {
            toast('Fail to retireve vessels!', { type: toast.TYPE.ERROR });
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <div className="clinic-page container">
                <div className="row">
                    <div className="col-12 content">
                        <header className="page-header p-t-10">
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
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {this.state.isLoading &&
                                                        <Preloader />
                                                    }
                                                    {!this.state.isLoading &&
                                                        <Table data={this.state.vessels} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vessel;
