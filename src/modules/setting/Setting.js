import React, { Component, Fragment } from 'react';
import LoginModel from "../authentication/LoginModel";
import SettingModel from "./SettingModel";
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import Preloader from '../../libs/Preloader';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showDeleteAlert: false,
            title: "Settings",
            username: "",
            name: "",
            email: "",
            emailVerified: false,
            emailPref: null
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        let username = LoginModel.getUserName();
        SettingModel.get(username).then((res) => {
            this.setUser(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    setUser(data) {
        this.setState({
            isLoading: false,
            username: data.username,
            name: data.name,
            email: data.email
        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        let data = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email
        }
        SettingModel.update(data).then((res) => {
            this.setState({ isLoading: false });
            toast('Profile Updated!', { type: toast.TYPE.SUCCESS })
            console.log("done");
        }).catch((error) => {
            console.log(error);
            toast('Failt to Update!', { type: toast.TYPE.ERROR })
        });
    }

    deleteUser(){
        this.setState({ showDeleteAlert: true });
    }

    confirmDelete() {
        this.setState({ isLoading: true });
        SettingModel.delete(this.state.username).then((res) => {
            console.log("done");
            LoginModel.destory().then(() => {
                window.location.replace('/login');
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <section className="page-content">
                    <div className="row content">
                        <div className="col">
                            <div className="card m-t-50">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.state.isLoading &&
                                                <Preloader />
                                            }
                                            {!this.state.isLoading &&
                                                <div className="tab-content">
                                                    <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                        <h2 className="card-heading p-b-20">Profile<button className="btn btn-danger float-right" onClick={() => this.deleteUser()}>Delete</button></h2>
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="form-group">
                                                                <div className="form-group">
                                                                    <label>Username</label>
                                                                    <h5>{this.state.username}</h5>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Your name</label>
                                                                    <input type="text" className="form-control" autoComplete="name" placeholder="Enter your display name" value={this.state.name} onChange={(e) => this.handleNameChange(e)} required />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Email </label>
                                                                    {this.state.emailVerified &&
                                                                        <span className="badge badge-pill badge-success"> Verified</span>
                                                                    }
                                                                    {!this.state.emailVerified &&
                                                                        <Fragment>
                                                                            <span className="badge badge-pill badge-danger">Not Verified</span>
                                                                            <button className="btn btn-primary">Send Verification</button>
                                                                        </Fragment>
                                                                    }
                                                                    <input type="email" className="form-control" autoComplete="email" placeholder="Enter email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} required />
                                                                    {!this.state.emailVerified &&
                                                                        <small> You will not receieve any notfication via email if your email is not verified</small>
                                                                    }
                                                                </div>
                                                                <button type="submit" className="btn btn-primary">Update Profile</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SweetAlert
                        show={this.state.showDeleteAlert}
                        title="Are you sure?"
                        type="warning"
                        showCancel
                        confirmBtnText="Confirmed"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="light"
                        onCancel={() => this.setState({showDeleteAlert : false})}
                        onConfirm={() => this.confirmDelete()}
                    >
                    This action cannot be reversed!
                    </SweetAlert>
                    </section>
            </div>
        );
    }
}

export default Setting;
