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
            isSending: false,
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
            email: data.email,
            emailVerified: data.emailVerified
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
        }).catch((error) => {
            toast('Failt to Update!', { type: toast.TYPE.ERROR })
        });
    }

    deleteUser() {
        this.setState({ showDeleteAlert: true });
    }

    sendEmailConfirm() {
        this.setState({
            isSending: true
        })
        SettingModel.requestEmail(this.state.username).then((res) => {
            this.setState({
                isSending: false
            });
            toast('Verify email has been sent!', { type: toast.TYPE.SUCCESS })
        }).catch((error) => {
            this.setState({
                isSending: false
            });
            toast('Fail to send the verify email.', { type: toast.TYPE.ERROR })
        });
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
                            {!this.state.isLoading && !this.state.emailVerified &&
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>You will not be able to reset your password and receieve any notfication via email if your email is not verified</strong>.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true" class="la la-close"></span>
                                    </button>
                                </div>
                            }
                            <div className={this.state.emailVerified ? "card m-t-50" : "card m-t-20"}>
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
                                                                        <span className="m-l-10 badge badge-pill badge-success"> Verified</span>
                                                                    }
                                                                    {!this.state.emailVerified &&
                                                                        <Fragment>
                                                                            <span className="m-l-10 badge badge-pill badge-danger">Not Verified</span>
                                                                            {this.state.isSending &&
                                                                                <button type="button" className="btn btn-light" disabled>Sending...</button>
                                                                            }
                                                                            {!this.state.isSending &&
                                                                                <button type="button" className="btn btn-primary request-verfication-btn" onClick={() => this.sendEmailConfirm()}>Send Verification</button>
                                                                            }
                                                                        </Fragment>
                                                                    }
                                                                    <input type="email" className="form-control" autoComplete="email" placeholder="Enter email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} required />
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
                        onCancel={() => this.setState({ showDeleteAlert: false })}
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
