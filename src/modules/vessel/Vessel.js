import React, { Component } from 'react';
import VesselModel from './VesselModel';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTable } from 'react-table';
import Table from './VesselTable';

class Vessel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Vessel",
            vessels: []
        }
    }

    componentDidMount() {
        this.getList();
    }

    goDetails(id) {
        this.props.history.push('/vessel/' + id);
    }

    getList() {
        VesselModel.list().then((res) => {
            this.setState({ vessels: res.data });
        }).catch((error) => {
            toast('Fail to retireve vessels!', { type: toast.TYPE.ERROR });
            console.log(error);
        });
    }

    render() {
        
        return (
            <div className="clinic-page container">
                <header className="page-header">
                    <div className="d-flex align-items-center">
                        <div className="mr-auto">
                            <h1>{this.state.title}</h1>
                        </div>
                    </div>
                </header>
                
                <section className="page-content container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Table data={this.state.vessels}/>
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

export default Vessel;
